import SinglePollFetcher from '@/components/fetcher/single'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getPollById } from '@/lib/queries/server'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
// import { redirect } from 'next/navigation'

type Pageprops  = {
    params: Promise<{
        id: string;
    }>
}

type TGenerateMetadataProps = {
    params: Promise<{ id: string }>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: TGenerateMetadataProps): Promise<Metadata> {
    const { id } = await params;
    const poll = await getPollById(id);
  
    return {
        title: `${poll.question}`,
        description: `${poll.description ? poll.description : `Vote on "${poll.question}" and earn rewards.`}`,
        alternates: {
            canonical: `/poll/${poll.id}`
        //   canonical: `/poll/${poll.id}/${poll.slug}`
        },
        openGraph: {
            title: poll.question,
            description: `Join the discussion on ${poll.question}`,
            images: [
              {
                url: `${process.env.ROOTURL}/og/${id}`, // Points to your OG image route
                width: 1200,
                height: 630,
                alt: poll.question,
              }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: poll.question,
            description: `Vote now: ${poll.question}`,
            images: [
                {
                url: `${process.env.ROOTURL}/og/${id}`,
                width: 1200,
                height: 630,
                alt: poll.question,
                }
            ] // Same image URL
        }
    }
}

const page = async({ params } : Pageprops) => {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="px-3 lg:px-20 bggg">
            <Navbar user={user?.id as string} />
            <section className='w-full lg:flex justify-center mt-28 lg:mt-40'>
                <div className='lg:w-[700px] space-y-10'>
                    <SinglePollFetcher id={id} user={user?.id as string} />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default page