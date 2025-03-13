import { createClient } from "@/utils/supabase/server";
// import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    // const { searchParams } = new URL(request.url);
    // console.log(await request.json());
    const supabase = await createClient();
    const { id } = await params;
    // const ip = getIpAddress(request);
    // const IP = request.headers.get('x-forwarded-for')?.split(',')[0] || request.ip
    const IP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    // const IP = "127.0.0.1";

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    // const user = { id: null };
    const sort = 'desc'; // Default to ascending

    // Fetch poll with options, total votes, and user/IP vote status
    const { data: poll, error } = await supabase
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
                votes:votes!option (
                    id
                )
            ),
            total_votes:votes!poll (
                id
            )
        `)
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate if the poll has expired
    const createdAt = new Date(poll.created_at);
    const expiryDate = new Date(createdAt);
    expiryDate.setDate(expiryDate.getDate() + poll.duration); // Add duration to created_at
    const isExpired = new Date() > expiryDate;

    let votequery = supabase
        .from('votes')
        .select('option')
        .eq('poll', id);

    if (user?.id) {
        // If user is authenticated, filter by both voter and IP
        votequery = votequery.or(`voter.eq.${user.id}, IP.eq.${IP}`);
    } else {
        // If user is not authenticated, filter only by IP
        votequery = votequery.eq('IP', IP);
    }

    const { data: userVote, error: voteError } = await votequery.maybeSingle();;

    if (voteError) {
        return NextResponse.json({ error: voteError?.message }, { status: 500 });
    }

    // console.log("votes: " + userVote);
        
    // Sort options
    const sortedOptions = poll.options.sort((a, b) => {
        if (sort === 'desc') {
            return b.text.localeCompare(a.text); // Sort by text descending
        } else if (sort === 'asc') {
            return a.text.localeCompare(b.text); // Sort by text ascending
        } else if (sort === 'votes_asc') {
        return a.votes.length - b.votes.length; // Sort by votes ascending
        } else if (sort === 'votes_desc') {
        return b.votes.length - a.votes.length; // Sort by votes descending
        }
        return 0; // Default: no sorting
    });

    console.log("expired: "+isExpired);
    // DROP VIEW IF EXISTS user_votes;
    
    
    const transformedPoll = {
        ...poll,
        creator: poll.creator,
        options: sortedOptions.map(option => ({
            ...option,
            total_votes: option.votes ? option.votes.length : 0,
            user_voted: userVote?.option === option.id,
        })),
        total_votes: poll.options ? poll.options.reduce((sum, option) => sum + (option.votes ? option.votes.length : 0), 0) : 0,
        expired: isExpired,
        user_has_voted: !!userVote,
        selected_option_id: userVote?.option || null,
    };

    // console.log(transformedPoll);
    

    return NextResponse.json(transformedPoll)
}