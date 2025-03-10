import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
// import { Circle } from 'lucide-react'
import React from 'react'
// import SingleChoice from '@/components/polls/SingleChoice'

const page = () => {
    return (
        <div className="">
            <Navbar />
            <section className='w-full flex justify-center px-3 lg:px-20 mt-40'>
                {/* <div className='lg:w-[600px] space-y-20'>
                    {timeline.length > 0 ? timeline.map((data, index: number) => <SingleChoice data={data} key={index} />) : null}
                </div> */}
            </section>
            <Footer />
        </div>
    )
}

export default page