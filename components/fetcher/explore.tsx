"use client"

import React, { useEffect } from 'react'
import SingleChoice from '../polls/SingleChoice';
import { useInfinitePolls } from '@/hooks/polls';
import { useInView } from 'react-intersection-observer';
import MoonLoader from "react-spinners/MoonLoader"
import PollSkeleton from '../loader/Poll';

type Props = {
    id: string,
    question: string,
    description: string | null,
    duration: number,
    active: boolean,
    permission: string,
    private: string,
    show_result: string,
    budget: number,
    media: string | null,
    media_url: string | null,
    credit_per_vote: number,
    created_at: string,
    creator?: TOwner | null,
    options: Array<TOptions>,
    total_votes: number,
    total_registered_votes: number,
    total_anonymous_votes: number,
    user_has_voted: boolean,
    selected_option_id: string | null
}

type TOwner = {
    id: string,
    dp: string,
    username: string,
    fullname: string,
    email: string,
    verified: boolean,
    achievement: Array<string>
}

type TOptions = {
    id: string,
    text: string,
    image?: string | null,
    votes: Array<string | null>,
    total_votes: number,
    registered_votes: number,
    anonymous_votes: number,
    user_voted: boolean
}

const ExplorePollFetcher = ({ user }: { user: string }) => {

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
            <section className='w-full lg:flex justify-center px-3 lg:px-20 mt-24 lg:mt-40'>
                {isError ? <p>An error occurred</p> : null}
                <div className='space-y-20'>
                    {isLoading ? <PollSkeleton count={[1,2,3]} /> : null}
                    {/* <PollSkeleton count={[1,2,3]} /> */}
                    {polls?.pages.map((pages, pageIndex) => (<div key={pageIndex} className='lg:w-[600px] space-y-20'>
                            {pages.length > 0 ? pages.map((page: Props, index: number) => <SingleChoice data={page} bulk={true} user={user} key={index} />) : null}
                        </div>
                    ))}
                </div>
            </section>
            <div ref={ref} className='w-full flex justify-center mt-16'>
                {isFetchingNextPage ? <MoonLoader color='hsl(var(--foreground))' size={30} loading={isFetchingNextPage} /> : hasNextPage ? <MoonLoader color='hsl(var(--foreground))' size={30} loading={hasNextPage} /> : null}
            </div>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": polls?.pages.flat().map((poll, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "Question",
                        "name": poll.question,
                        "description": poll.description || "Vote on this poll and earn rewards",
                        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/poll/${poll.id}`,
                        "dateCreated": poll.created_at,
                        "answerCount": poll.total_votes,
                        "author": {
                        "@type": "Person",
                        "name": poll.creator?.fullname || "Anonymous"
                        }
                    }
                    })) || []
                })}
            </script>
        </>
    )
}

export default ExplorePollFetcher