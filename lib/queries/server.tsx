import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getAllActivePolls = async() => {
    const supabase = await createClient();

    const { data, error } = await supabase
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
        .gt('expires_at', new Date().toISOString()) // Filter non-expired polls
        .order('created_at', { ascending: false }); // Sort by most recent

    if (error) {
        console.log(error);
        return [];
    }

    const currentTime = new Date();

    // Transform the data
    const transformedPolls = await Promise.all(
        data.map(async (poll) => {
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

    return transformedPolls
}

export const getPollById = async(id: string) => {
    const supabase = await createClient();
        const { data: poll, error: pollError } = await supabase
            .from('polls')
            .select(`
                id,
                question,
                description,
                created_at,
                creator:users!creator (
                    id,
                    fullname,
                    username
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
            .order("position", { referencedTable: "options", ascending: true})
            .single();
        
        if (pollError) {
            redirect("/")
        }

    return  {
        ...poll,
        creator: poll?.creator,
        options: poll.options.map(option => ({
            ...option,
            total_votes: option.votes ? option.votes.length : 0
        })),
        total_votes: poll?.options ? poll.options.reduce((sum, option) => sum + (option.votes ? option.votes.length : 0), 0) : 0
    };
}