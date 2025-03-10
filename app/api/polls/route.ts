import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const result = await request.json()
    console.log(result);
    return NextResponse.json([])
}