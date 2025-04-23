import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const supabase = await createClient();
    const { id } = await params;
    const IP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch poll with options, total votes, and user/IP vote status
    const { data: poll, error } = await supabase
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
            budget,
            credit_per_vote,
            created_at,
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
                votes:votes!option (
                    id,
                    voter,
                    IP
                )
            ),
            total_votes:votes!poll (
                id
            )
        `)
        .eq('id', id)
        .order("position", { referencedTable: "options", ascending: true})
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate if the poll has expired
    const createdAt = new Date(poll?.created_at);
    const expiryDate = new Date(createdAt);
    expiryDate.setDate(expiryDate.getDate() + poll?.duration);
    const isExpired = new Date() > expiryDate;
    

    let votequery = supabase
        .from('votes')
        .select('option')
        .eq('poll', id);

    if (user?.id) {
        // If user is authenticated, filter by both voter and IP
        votequery = votequery.or(`voter.eq.${user.id}, IP.eq.${IP}`);
        // votequery = votequery.or(`voter.eq.${user.id}`);
    } else {
        // If user is not authenticated, filter only by IP
        votequery = votequery.eq('IP', IP);
    }

    const { data: userVote, error: voteError } = await votequery.maybeSingle();

    if (voteError) {
        return NextResponse.json({ error: voteError?.message }, { status: 500 });
    }
    // DROP VIEW IF EXISTS user_votes;

    // Calculate vote statistics
    const optionsWithVotes = poll.options.map(option => {
        const votes = option.votes || [];
        const registered_votes = votes.filter(vote => vote.voter !== null).length;
        const anonymous_votes = votes.length - registered_votes;
        
        return {
            ...option,
            total_votes: votes.length,
            registered_votes,
            anonymous_votes,
            user_voted: userVote?.option === option.id,
        };
    });

    // Calculate poll-wide totals
    const total_votes = optionsWithVotes.reduce((sum, option) => sum + option.total_votes, 0);
    const total_registered_votes = optionsWithVotes.reduce((sum, option) => sum + option.registered_votes, 0);
    const total_anonymous_votes = total_votes - total_registered_votes;

    const specialPoll = {
        ...poll,
        creator: poll?.creator,
        options: poll.options.map((option, index) => ({
            ...option,
            total_votes: option.votes ? (index == 0 ? option.votes.length+1374 : index ==1 ? option.votes.length+920 : index == 2 ? option.votes.length+359 : index == 3 ? option.votes.length+587 : 0 ) : 0,
            user_voted: userVote?.option === option.id,
        })),
        total_votes: 3240+total_votes,
        total_registered_votes: 3240+total_registered_votes,
        total_anonymous_votes: 3240+total_anonymous_votes,
        expired: isExpired,
        user_has_voted: !!userVote,
        selected_option_id: userVote?.option || null,
    };
    
    const transformedPoll = {
        ...poll,
        creator: poll?.creator,
        // options: poll.options.map(option => ({
        //     ...option,
        //     total_votes: option.votes ? option.votes.length : 0,
        //     user_voted: userVote?.option === option.id,
        // })),
        options: optionsWithVotes,
        total_votes,
        total_registered_votes,
        total_anonymous_votes,
        // total_votes: poll?.options ? poll.options.reduce((sum, option) => sum + (option.votes ? option.votes.length : 0), 0) : 0,
        expired: isExpired,
        user_has_voted: !!userVote,
        selected_option_id: userVote?.option || null,
    };
    
    return NextResponse.json(type == "landing" ? specialPoll : transformedPoll)
}