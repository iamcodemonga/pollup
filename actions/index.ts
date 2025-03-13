"use server"

import { createClient } from "@/utils/supabase/server";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function addPoll({ question, duration, options }: { question: string, duration: number, options: Array<{ image: null, text: string }> }) {
    let id: string | undefined;

    // Calculate expires_at by adding duration (in days) to the current timestamp
    // const createdAt = new Date().toISOString();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + duration);

    try {
        const supabase = await createClient();
        const { data: pollData, error: pollError } = await supabase
            .from('polls')
            .insert([
                { question, duration, expires_at: expiresAt }
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
                .insert(options.map((option) => {
                    return { poll: pollData[0].id, image: option.image, text: option.text}
                }))

            if (OptionError) {
                console.log(OptionError);
                throw new Error("Network error!");
            }
        }
        
    } catch (error) {
        return {
            error: getErrorMessage(error)
        }
    }

    redirect(`/poll/${id}`)
    // revalidatePath("/explore");
}