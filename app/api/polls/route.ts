import { taskCompletionReward } from "@/lib/queries/server";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
      message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
      message = String(error.message)
  } else if (typeof error === "string") {
      message = error;
  } else {
      message = "something went wrong";
  }

  return message;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();
    const IP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    // Fetch poll with options, total votes, and user/IP vote status
    const { data: polls, error } = await supabase
        .from('polls')
        .select(`
            id,
            question,
            description,
            duration,
            active,
            private,
            show_result,
            permission,
            created_at,
            budget,
            media,
            media_url,
            credit_per_vote,
            action,
            action_goal,
            action_title,
            action_description,
            waitlist_purpose,
            checkout,
            creator:users!creator (
              id,
              dp,
              fullname,
              username,
              email,
              verified,
              achievement
            ),
            options:options!poll (
              id,
              image,
              text,
              trigger,
              created_at,
              votes:votes!option (
                id,
                voter,
                IP
              )
            )
          `)
        .eq("private", false)
        .neq("id", process.env.SPECIAL_POLL)
        .not("creator", "is", null) // Ensure creator is not null
        .gt('expires_at', new Date().toISOString()) // Filter non-expired polls
        .range(offset, offset + limit - 1) // Paginate results
        .order('created_at', { ascending: false }) // Sort by most recent
        .order("position", { referencedTable: "options", ascending: true });


    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

      // Transform the data
    const transformedPolls = await Promise.all(
      polls.map(async (poll) => {
        // Sort options in descending order by created_at
        const sortedOptions = poll.options.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        // Calculate total votes for each option and overall
        const optionsWithVotes = sortedOptions.map((option) => {
            const total_votes = option.votes.length;
            const registered_votes = option.votes.filter(vote => vote.voter !== null).length;
            const anonymous_votes = option.votes.length - registered_votes;
            const user_voted = option.votes.some(
            (vote) => vote.voter === user?.id || vote.IP === IP
            );
            return {
            ...option,
            total_votes,
            registered_votes,
            anonymous_votes,
            user_voted,
            };
        });

        const total_votes = optionsWithVotes.reduce((sum, option) => sum + option.total_votes, 0);
        const total_registered_votes = optionsWithVotes.reduce((sum, option) => sum + option.registered_votes, 0);
        const total_anonymous_votes = total_votes - total_registered_votes;

        // Check if the user has voted on this poll
        const userVote = optionsWithVotes.find((option) => option.user_voted);
        const selected_option_id = userVote ? userVote.id : null;

        return {
          ...poll,
          creator: poll.creator,
          options: optionsWithVotes,
          total_votes,
          total_registered_votes,
          total_anonymous_votes,
          user_has_voted: !!userVote,
          selected_option_id,
        };
      })
    );
  
  return NextResponse.json(transformedPolls);
}

export async function POST(request: NextRequest) {
  let id: string | undefined;
  const { question, description, duration, options, permission, show_result, privacy, eligible, reward, budget, credit_per_vote, media, media_url, action, action_title, action_description, action_goal, waitlist_purpose, checkout }:{ question: string, description: string, duration: number, options: Array<{ image: null, text: string, trigger: boolean }>, permission: string, show_result: string, privacy: boolean, eligible: boolean, reward: number, budget: number, credit_per_vote: number, media: string | null, media_url: string | null, action: boolean, action_goal: string | null, action_title: string | null, action_description: string | null, waitlist_purpose: string | null, checkout: { platform: string, url: string } | null } = await request.json();
  

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + duration);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  try {
      const { data: pollData, error: pollError } = await supabase
          .from('polls')
          .insert([
              { question, description, private: privacy, duration, permission, show_result, expires_at: expiresAt, creator: (user ? user.id : null), budget, credit_per_vote, media, media_url, action, action_goal, action_title, action_description, waitlist_purpose, checkout }
          ])
          .select()

      if (pollError) {
          console.log(pollError);
          throw new Error("Network error!");
      }

      id = pollData[0].id;
      if(pollData[0].id){
          const { error: OptionError  } = await supabase
              .from('options')
              .insert(options.map((option, index) => {
                  return { poll: pollData[0].id, image: option.image, text: option.text, position: index+1, trigger: option.trigger }
              }))

          if (OptionError) {
              console.log(OptionError);
              throw new Error("Network error!");
          }
      }

      if (user?.id && budget > 0 && credit_per_vote > 0) {
          const { data: newBalance, error: rpcError } = await supabase.rpc('balance_decrement', { amount: budget, user_id: user.id });
      
          if (rpcError) {
              throw new Error(rpcError.message);
          }
          console.log(newBalance);
      }

      if (user?.id && eligible) {
          await taskCompletionReward(user.id, "poll", reward)
      }

      return NextResponse.json({ status: "success", id, message: "Poll created successfully!" })
      
  } catch (error) {
    const message = getErrorMessage(error)
    return NextResponse.json({ status: "failed", id, message })
  }
}