import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();
    const IP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    // const IP = "127.0.0.1";

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    // const sort = 'desc'; // Default to ascending
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    // Fetch poll with options, total votes, and user/IP vote status
    const { data: polls, error } = await supabase
        .from('polls')
        .select(`
            id,
            question,
            duration,
            active,
            created_at,
            creator:users!creator (
              id,
              dp,
              username,
              email,
              verified
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
        .gt('expires_at', new Date().toISOString()) // Filter non-expired polls
        .range(offset, offset + limit - 1) // Paginate results
        .order('created_at', { ascending: false }); // Sort by most recent


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
            const user_voted = option.votes.some(
            (vote) => vote.voter === user?.id || vote.IP === IP
            );
            return {
            ...option,
            total_votes,
            user_voted,
            };
        });

      const total_votes = optionsWithVotes.reduce((sum, option) => sum + option.total_votes, 0);

      // Check if the user has voted on this poll
      const userVote = optionsWithVotes.find((option) => option.user_voted);
      const selected_option_id = userVote ? userVote.id : null;

      return {
        ...poll,
        creator: poll.creator,
        options: optionsWithVotes,
        total_votes,
        user_has_voted: !!userVote,
        selected_option_id,
      };
    })
  );

  // console.log(transformedPolls);
  
  return NextResponse.json(transformedPolls);
}