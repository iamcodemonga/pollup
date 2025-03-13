import ExplorePollFetcher from '@/components/fetcher/explore'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
// import { Circle } from 'lucide-react'
import React from 'react'
// import SingleChoice from '@/components/polls/SingleChoice'

export const dynamic = "force-dynamic"

const page = async() => {
    
    return (
        <div className="">
            <Navbar />
            <ExplorePollFetcher />
            <Footer />
        </div>
    )
}

export default page