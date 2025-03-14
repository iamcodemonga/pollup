"use client"

import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {
    count: Array<number>
}

const PollSkeleton = ({ count }: Props) => {
    return (
        <div className='w-full space-y-20'>
            {count.map((c, i) => <div className="w-full lg:w-[600px] relative border dark:border dark:border-foreground/30 bg-[#f3f3f3] dark:bg-[#0c0c0c] rounded-md py-10 lg:py-16 px-2 lg:px-5" key={i}>
                <div className='w-full flex justify-end mb-0'>
                    <Skeleton className='rounded-full h-10 w-10 bg-border dark:bg-[#404040]' />
                </div>
                <div className='w-full space-y-3 mt-10 mb-12 lg:mb-16'>
                    <Skeleton className='w-full h-7 rounded-xl bg-border dark:bg-[#404040]' />
                    <Skeleton className='w-2/3 h-7 rounded-xl bg-border dark:bg-[#404040]' />
                    {/* <Skeleton className='w-[300px] h-5 rounded-lg bg-border dark:bg-[#404040]' /> */}
                </div>
                <div className='space-y-7'>
                    {[1,2,3].map((d: number, i: number) => <div className='space-y-2' key={i}>
                        <div className='flex space-x-3 items-center'>
                            <Skeleton className='rounded-full h-6 w-6 bg-border dark:bg-[#404040]' />
                            <Skeleton className='w-40 h-4 rounded-lg bg-border dark:bg-[#404040]' />
                        </div>
                        <Skeleton className='w-full h-5 rounded-lg bg-border dark:bg-[#404040]' />
                    </div>)}
                </div>
                <div className='mt-10 w-full flex justify-between items-center'>
                    <Skeleton className='w-[100px] h-4 rounded-lg bg-border dark:bg-[#404040]' />
                    <Skeleton className='w-[100px] h-10 rounded-full bg-border dark:bg-[#404040]' />
                </div>
            </div>)}
        </div>
    )
}

export default PollSkeleton