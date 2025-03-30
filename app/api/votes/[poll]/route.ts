import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ poll: string }> }) {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();
    const { poll } = await params;
    const IP = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

    // Get user IPinfo (continent, country, region, city) and cache it.

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    const { data: vote, error } = await supabase
        .from('votes')
        .insert([
            { poll, option: searchParams.get("choice"), voter: user?.id, IP },
        ])
        .select("*")

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    
    return NextResponse.json(vote)
}