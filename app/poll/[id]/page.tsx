import SinglePollFetcher from '@/components/fetcher/single'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

type Pageprops  = {
    params: Promise<{
        id: string;
    }>
}

export const dynamic = "force-dynamic";

const page = async({ params } : Pageprops) => {

    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data: poll, error: pollError } = await supabase
        .from("polls")
        .select("id")
        .eq("id", id)
        .single()

    console.log(poll);
        
    if (pollError) {
        redirect("/")
    }

    return (
        <div className="px-3 lg:px-20 bggg">
            <Navbar user={user?.id as string} />
            <section className='w-full lg:flex justify-center mt-40'>
                <div className='lg:w-[700px] space-y-10'>
                    <SinglePollFetcher id={id} />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default page