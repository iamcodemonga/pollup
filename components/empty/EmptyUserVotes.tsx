import Link from 'next/link'
import React from 'react'

const EmptyUserVotes = () => {
    return (
        <div className="w-full h-[450px] lg:h-[450px] flex justify-center items-center">
            <div className=''>
                <p className='text-5xl lg:text-6xl text-center'>😧</p>
                <h5 className='text-sm lg:text-base text-slate-400 text-center mt-3 mb-5'>No votes yet?</h5>
                <div>
                    <Link href="/explore" className="flex justify-center items-center space-x-1 px-5 py-3 text-background bg-primary border border-primary rounded-full text-[12px]">Explore Polls</Link>
                </div>
            </div>
        </div>
    )
}

export default EmptyUserVotes