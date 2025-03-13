"use client"

import React, { useEffect } from 'react'
import SingleChoice from '../polls/SingleChoice';
import { useInfinitePolls } from '@/hooks/polls';
import { useInView } from 'react-intersection-observer';
import MoonLoader from "react-spinners/MoonLoader"

type Props = {
    id: string,
    question: string,
    duration: number,
    active: boolean,
    created_at: string,
    creator?: TOwner | null,
    options: Array<TOptions>,
    total_votes: number,
    user_has_voted: boolean,
    selected_option_id: string | null
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
    votes: Array<string | null>,
    total_votes: number,
    user_voted: boolean
}

const ExplorePollFetcher = () => {

    const { data: polls, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfinitePolls();
    const { ref, inView } = useInView();
    console.log(polls);
    

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // if (isLoading) return <div>Loading...</div>
    // if (isError) return <div>An error occurred</div>

    return (
        <>
            <section className='w-full lg:flex justify-center px-3 lg:px-20 mt-40'>
                {isLoading ? <p>Loading</p> : null}
                {isError ? <p>An error occurred</p> : null}
                <div className='space-y-20'>
                    {polls?.pages.map((pages, pageIndex) => (<div key={pageIndex} className='lg:w-[600px] space-y-20'>
                            {pages.length > 0 ? pages.map((page: Props, index: number) => <SingleChoice data={page} bulk={true} key={index} />) : null}
                        </div>
                    ))}
                </div>
            </section>
            <div ref={ref} className='w-full flex justify-center mt-16'>
                {isFetchingNextPage ? <MoonLoader color='hsl(var(--foreground))' size={30} loading={isFetchingNextPage} /> : hasNextPage ? <MoonLoader color='hsl(var(--foreground))' size={30} loading={hasNextPage} /> : null}
            </div>
            {/* <div ref={ref} className='w-full flex justify-center mt-16'>
                {isFetchingNextPage ? <Oval visible={true} height="30" width="30" color="hsl(var(--foreground))" secondaryColor='hsl(var(--border))' strokeWidth={3} ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="!bg-transparent" /> : hasNextPage ? <Oval visible={true} height="30" width="30" color="hsl(var(--foreground))" secondaryColor='hsl(var(--border))' strokeWidth={3} ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="!bg-transparent" /> : null}
            </div> */}
        </>
    )
}

export default ExplorePollFetcher