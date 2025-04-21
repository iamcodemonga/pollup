import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();
    const userid = searchParams.get("id");
    // const user = { id: "a77d9b7a-5cce-49a3-997a-4ecd9509c305" };

    const { data: userinfo, error } = await supabase
        .from('users')
        .select(`
            id,
            fullname,
            username,
            email,
            dp,
            birthday,
            gender,
            verified,
            balance,
            achievement,
            polls: polls (count),
            votes: votes (count)
          `)
        .eq('id', userid)
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const transformedUser = {
        ...userinfo,
        polls: userinfo.polls[0].count,
        votes: userinfo.votes[0].count
    }
    return NextResponse.json(transformedUser);
}