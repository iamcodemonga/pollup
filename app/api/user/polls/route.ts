import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "9");
    const active: string = searchParams.get("filter") || "none";
    const offset = (page - 1) * limit;

    let query;

    // Fetch poll with options, total votes, and user/IP vote status
    if (active == "active") {
      query = await supabase
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
          `) // Filter non-expired polls
        .eq("creator", user?.id)
        .gt('expires_at', new Date().toISOString()) // Filter non-expired polls
        .range(offset, offset + limit - 1) // Paginate results
        .order('created_at', { ascending: false }); // Sort by most recent
    } else {
      query = await supabase
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
          `) // Filter non-expired polls
        .eq("creator", user?.id)
        .range(offset, offset + limit - 1) // Paginate results
        .order('created_at', { ascending: false }); // Sort by most recent
    }


    if (query.error) {
        return NextResponse.json({ error: query.error.message }, { status: 500 });
    }

    const currentTime = new Date();

    // Transform the data
    const transformedPolls = await Promise.all(
        query.data.map(async (poll) => {
        // Sort options in descending order by created_at
        const sortedOptions = poll.options.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        // Calculate total votes for each option and overall
        const optionsWithVotes = sortedOptions.map((option) => {
            const total_votes = option.votes.length;
            return {
            ...option,
            total_votes,
            };
        });

        // Check if the poll has expired
        const createdAt = new Date(poll.created_at);
        const expiryDate = new Date(createdAt);
        expiryDate.setDate(expiryDate.getDate() + poll.duration); // Add duration to created_at
        const isExpired = currentTime > expiryDate;

      const total_votes = optionsWithVotes.reduce((sum, option) => sum + option.total_votes, 0);

      return {
        ...poll,
        creator: poll.creator,
        total_votes,
        isExpired
      };
    })
  );
  
  return NextResponse.json(transformedPolls);
}