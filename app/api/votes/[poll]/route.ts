import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ poll: string }> }) {
    const { searchParams } = new URL(request.url);
    // console.log(await request.json());
    const supabase = await createClient();
    const { poll } = await params;
    // const ip = getIpAddress(request);
    const IP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

    // Get authenticated user
    // const { data: { user } } = await supabase.auth.getUser();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch poll with options, total votes, and user/IP vote status
    const { data: vote, error } = await supabase
        .from('votes')
        .insert([
            { poll, option: searchParams.get("choice"), voter: user?.id, IP },
        ])
        .select("*")

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

    // Transform data for frontend
    console.log(vote);
    

    return NextResponse.json(vote)
}