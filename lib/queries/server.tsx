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

// findExistingUserByEmail - email * expecting boolean
export const findExistingUserByEmail = async(email: string) => {
    const supabase = await createClient();
    try {
        const { data: user, error } = await supabase
        .from('users')
        .select(`id, email`)
        .eq('email', email)
        .single();

        if (error) {
            throw new Error(error.message)
        }

        return !!user;

    } catch (error) {
        console.log(error);
    }
}

// findExistingUserById - userId * expecting boolean
export const findExistingUserById = async(userId: string) => {
    const supabase = await createClient();
    try {
        const { data: user, error } = await supabase
        .from('users')
        .select(`id, email`)
        .eq('id', userId)
        .single();

        if (error) {
            throw new Error(error.message)
        }

        return !!user;

    } catch (error) {
        console.log(error);
    }
}

// getUserByEmail - email
export const getUserByEmail = async(email: string) => {
    const supabase = await createClient();
    try {
        const { data: user, error } = await supabase
        .from('users')
        .select(`*`)
        .eq('email', email)
        .single();

        if (error) {
            throw new Error(error.message)
        }

        return user;

    } catch (error) {
        console.log(error);
    }
}

// getUserById - userId
export const getUserById = async(userId: string, columns: Array<string>) => {
    const supabase = await createClient();
    try {
        const { data: user, error } = await supabase
        .from('users')
        .select(columns.join(","))
        .eq('id', userId)
        .single();

        if (error) {
            throw new Error(error.message)
        }

        return user;

    } catch (error) {
        console.log(error);
    }
}

// updateUserById - userId, updateInfo
export const updateUserById = async(userId: string, { fullname, birthday, gender }: { fullname: string, birthday: string, gender: string }) => {
    const supabase = await createClient();
    try {
        const { data: user, error } = await supabase
            .from('users')
            .update({ fullname, birthday, gender })
            .eq('id', userId)
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return user;

    } catch (error) {
        console.log(error);
    }
}

// updateUserByEmail - email, updateInfo
export const updateUserByEmail = async(email: string, { fullname, birthday, gender }: { fullname: string, birthday: string, gender: string }) => {
    const supabase = await createClient();
    try {
        const { data: user, error } = await supabase
            .from('users')
            .update({ fullname, birthday, gender })
            .eq('email', email)
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return user;

    } catch (error) {
        console.log(error);
    }
}

// rewardUser - creator(user), milestone, reward
export const taskCompletionReward = async(userId: string, task: string, reward: number) => {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase.rpc('append_task_and_increment_reward', {
            user_id: userId,
            new_task: task,
            reward_increment: reward
          });
          
          if (error) {
            console.error('Error updating tasks and rewards:', error);
          } else {
            console.log('Updated user:', data[0]);
          }

    } catch (error) {
        console.log(error);
    }
}

// referralReward - creator(user), task, reward
export const referralReward = async(userId: string, reward: number) => {
    const supabase = await createClient();
    try {
        const { data: newBalance, error: rpcError } = await supabase.rpc('balance_increment', { amount: reward, user_id: userId });

        if (rpcError) {
            throw new Error(rpcError.message);
        }

        return newBalance;

    } catch (error) {
        console.log(error);
    }
}

// getUserPolls - userId
// getUserVotedPolls - userId