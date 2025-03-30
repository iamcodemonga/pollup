import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

interface TVote {
    id: string;
  }
  
  interface TOption {
    id: string;
    text: string;
    image: string | null;
    votes: TVote[];
  }
  
  interface TCreator {
    id: string;
    dp: string | null;
    username: string;
    email: string;
    verified: boolean;
  }
  
  interface TPoll {
    id: string;
    question: string;
    duration: number;
    active: boolean;
    created_at: string;
    creator: TCreator | null;
    options: TOption[];
  }

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "9");
    const offset = (page - 1) * limit;

    const { data: votes, error } = await supabase
        .from('votes')
        .select(`
            poll: polls!poll (
            id,
            question,
            duration,
            active,
            created_at,
            creator: users!creator (
                id,
                dp,
                username,
                email,
                verified
            ),
            options: options!poll (
                id,
                image,
                text,
                votes: votes!option (
                id
                    )
                )
            )
        `)
        .eq('voter', user?.id) // Filter by user ID
        .range(offset, offset + limit - 1) // Paginate results
        .order('created_at', { ascending: false }); // Sort by most recent


        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }


    const currentTime = new Date();

    const transformedPolls = votes.map((item) => {
        //  @ts-expect-error-error
        const poll: TPoll = item.poll;
                // Calculate total votes for the poll
            const total_votes = poll?.options.reduce((sum: number, option: TOption) => sum + option?.votes.length, 0);
    
            // Check if the poll has expired
            const createdAt = new Date(poll.created_at);
            const expiryDate = new Date(createdAt);
            expiryDate.setDate(expiryDate.getDate() + poll.duration); // Add duration to created_at
            const isExpired = currentTime > expiryDate;
    
            return {
                ...poll,
                creator: poll.creator,
                total_votes,
                isExpired,
            };
    });
  
    return NextResponse.json(transformedPolls);
}