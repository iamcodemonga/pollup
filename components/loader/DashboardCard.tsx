import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {
    count: Array<number>
}

const DashboardCard = ({ count }: Props) => {
    return (
        <div className='grid grid-cols-12 gap-x-3 gap-y-3 lg:gap-y-5 lg:gap-x-3'>
            {count.map((c, i) => <div className='col-span-12 lg:col-span-4 Pcard py-6 px-3 lg:px-5 lg:pb-8 bg-muted rounded-md' key={i}>
                <div className='flex items-center justify-between text-xs mb-5  dark:text-gray-400'>
                    <Skeleton className='w-32 h-3' />
                    <Skeleton className='w-10 h-10 rounded-full' />
                </div>
                <div className="space-y-3">
                    <Skeleton className='w-full h-5 rounded-full' />
                    <Skeleton className='w-2/3 h-5 rounded-full' />
                </div>
                <div className='w-full flex justify-between items-center space-x-2 mt-5'>
                    <Skeleton className='w-28 h-3' />
                    <Skeleton className='h-10 w-28 rounded-full' />
                </div>
            </div>)}
        </div>
    )
}

export default DashboardCard