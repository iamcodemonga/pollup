import ExplorePollFetcher from '@/components/fetcher/explore'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import React from 'react'

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: 'Explore Polls & Earn Rewards',
    description: 'Vote on trending polls about technology, business, and politics to earn rewards.',
    keywords: ['trending polls', 'popular surveys', 'current polls'],
    alternates: {
      canonical: '/explore'
    }
  }

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