import Link from 'next/link'
import React from 'react'


const EmptyActivePolls = () => {
    return (
        <div className="w-full h-72 lg:h-96 flex justify-center items-center">
            <div className=''>
                <p className='text-5xl lg:text-6xl text-center'>😧</p>
                <h5 className='text-sm lg:text-base text-slate-400 text-center mt-3 mb-5'>You have no active polls!</h5>
                <div>
                    <Link href="/create" className="flex justify-center items-center space-x-1 px-5 py-3 text-background bg-primary border border-primary rounded-full text-[12px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg><span>Create now</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EmptyActivePolls