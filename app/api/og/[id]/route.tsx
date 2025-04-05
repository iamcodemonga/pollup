import { getPollById } from "@/lib/queries/server";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge"
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const poll = await getPollById(id)
    return new ImageResponse(
        (
            <div style={{
              background: '#010101',
              color: 'white',
              width: '100%',
              height: '100%',
              padding: '50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            //   alignItems: "center",
              fontFamily: 'Inter'
            }}>
              <h1 style={{ fontSize: 30, marginBottom: 30, display: "flex" }}>{poll.question}</h1>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {poll.options.map(opt => (
                  <div key={opt.id} style={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                    <span style={{ fontSize: 18, marginBottom: 2 }}>{opt.text} ({((opt.total_votes/poll.total_votes)*100).toFixed(0)}%)</span>
                    <div style={{ 
                      width: `${opt.total_votes == 0 ? "0%" : ((opt.total_votes/poll.total_votes)*100).toFixed(0)}%`,
                      height: 30,
                      background: '#3b82f6',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 10,
                    }}>
                    </div>
                  </div>
                ))}
              </div>
      
              <div style={{ 
                // position: 'absolute',
                // bottom: 50,
                marginTop: 20,
                fontSize: 24,
                color: '#94a3b8',
                display: 'flex'
              }}>
                <span>Total votes: {poll.total_votes.toLocaleString()} • reapoll.com</span>
              </div>
            </div>
          ),
        {
            width: 1200,
            height: 630,
            // fonts: [
            //   {
            //     name: 'Inter',
            //     data: await fetch(
            //       new URL('../../assets/Inter-Regular.ttf', import.meta.url)
            //     ).then((res) => res.arrayBuffer()),
            //     style: 'normal',
            //     weight: 400
            //   }
            // ]
            headers: {
              'cache-control': 'public, max-age=3600' // Cache for 1 hour
            }
        },
    )
}