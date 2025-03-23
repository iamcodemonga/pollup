import ExplorePollFetcher from '@/components/fetcher/explore'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { createClient } from '@/utils/supabase/server'
// import { Circle } from 'lucide-react'
import React from 'react'
// import SingleChoice from '@/components/polls/SingleChoice'

export const dynamic = "force-dynamic"

const page = async() => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    console.log("user: "+user);
    
    return (
        <div className="">
            <Navbar user={user?.id as string} />
            <ExplorePollFetcher user={user?.id as string} />
            <Footer />
        </div>
    )
}

export default page