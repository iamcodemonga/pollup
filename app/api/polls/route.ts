import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

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