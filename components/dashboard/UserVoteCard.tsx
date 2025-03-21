import Link from 'next/link'
import React from 'react'

type Prop = {
    data: {
        id: string,
        question: string,
        duration: number,
        active: boolean,
        created_at: string,
        creator?: TOwner | null,
        options: Array<TOptions>,
        total_votes: number,
        isExpired: boolean
    }
  }

  type TOwner = {
    id: string,
    dp: string,
    username: string,
    email: string,
    verified: boolean
}

type TOptions = {
    id: string,
    text: string,
    image?: string | null,
    votes: Array<string | null>
}

const UserVoteCard = ({ data }: Prop) => {
    return (
        <div className='col-span-12 lg:col-span-4 Pcard py-6 px-3 lg:px-5 lg:pb-8 bg-muted rounded-md' key={data.id}>
            <div className='flex items-center justify-between text-xs mb-5  dark:text-gray-400'>
                {data.isExpired ? <div className='text-red-600 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>Expired
                </div> : <div className='text-green-600 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>Live
                </div>}
                <button type='button' className='w-10 h-10 flex justify-center items-center bg-border dark:bg-[#404040] rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-foreground">
                        <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <Link href={`${process.env.NEXT_PUBLIC_ROOTURL}/poll/${data.id}`} className='text-xl mb-5 block hover:underline'>{data.question}</Link>
            <div className='w-full flex justify-between items-center space-x-2'>
                <div className='flex items-center text-gray-800 dark:text-gray-400 text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                    </svg>{data.total_votes.toLocaleString()} votes
                </div>
                <div className='flex items-center space-x-2'>
                    <Link href={`${process.env.NEXT_PUBLIC_ROOTURL}/poll/${data.id}`} className='text-xs text-background px-5 py-3 rounded-full flex justify-center items-center bg-foreground'>View poll<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-1 text-background">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserVoteCard