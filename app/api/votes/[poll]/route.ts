import { getIPInfo, taskCompletionReward } from "@/lib/queries/server";
import { redis } from "@/lib/redis";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ poll: string }> }) {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();
    const { poll } = await params;
    const rawIP = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const IP = process.env.NODE_ENV === "development" && ['::1', '127.0.0.1'].includes(rawIP) ? '8.8.8.8' : rawIP;

    // Get user IPinfo (continent, country, country_code, region, city) and cache it.
    let location;
    const cached = await redis.get(`ip:${rawIP}`);
    console.log("cached: "+cached);
    
    if (cached) {
        location = cached;
    } else {
        const { data: geo } = await axios(`https://ipinfo.io/${IP}?token=${process.env.IPINFO_API_TOKEN}`)
        const details = await getIPInfo(geo.country, geo.city, geo.region);
        await redis.set(`ip:${rawIP}`, details, { ex: 86400 });
        location = details;
    }
    
    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    const { data: vote, error } = await supabase
        .from('votes')
        .insert([
            { poll, option: searchParams.get("choice"), voter: user?.id, IP: rawIP, location },
        ])
        .select("*")

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // give reward to creator
        if (searchParams.has("eligible") && searchParams.has("creator") && searchParams.has("reward")) {
            console.log(`creator has been rewarded ${Number(searchParams.get('reward'))} credits`);
            await taskCompletionReward(searchParams.get("creator") as string, searchParams.get("eligible") as string, Number(searchParams.get("reward")))
        }
    
    return NextResponse.json(vote)
}