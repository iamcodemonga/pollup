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

// const fetchPollData = async(id: string) => {
//     const supabase = await createClient();
//         const { data: poll, error: pollError } = await supabase
//             .from('polls')
//             .select(`
//                 id,
//                 question,
//                 description,
//                 created_at,
//                 creator:users!creator (
//                     id,
//                     fullname,
//                     username
//                 ),
//                 options:options!poll (
//                     id,
//                     image,
//                     text,
//                     votes:votes!option (
//                         id
//                     )
//                 ),
//                 total_votes:votes!poll (
//                     id
//                 )
//             `)
//             .eq('id', id)
//             .order("position", { referencedTable: "options", ascending: true})
//             .single();
        
//         if (pollError) {
//             redirect("/")
//         }

//     return  {
//         ...poll,
//         creator: poll?.creator,
//         options: poll.options.map(option => ({
//             ...option,
//             total_votes: option.votes ? option.votes.length : 0
//         })),
//         total_votes: poll?.options ? poll.options.reduce((sum, option) => sum + (option.votes ? option.votes.length : 0), 0) : 0
//     };
// }

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
        // openGraph: {
        //   images: poll.image || '/og-poll-default.jpg'
        // }
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