"use client"

import React, { useEffect, useState } from 'react'
import SingleChoice from '../polls/SingleChoice';
import { useInfinitePolls } from '@/hooks/polls';
import { useInView } from 'react-intersection-observer';
import MoonLoader from "react-spinners/MoonLoader"
import PollSkeleton from '../loader/Poll';
import JoinCompletion from '../popup/JoinCompletion';
import PreSale from '../popup/PreSale';
import WaitList from '../popup/WaitList';

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
    action: boolean,
    action_goal: string | null,
    action_title: string | null,
    action_description: string | null,
    waitlist_purpose: string | null,
    checkout: { platform: string, url: string } | null,
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
    trigger: boolean,
    image?: string | null,
    votes: Array<string | null>,
    total_votes: number,
    registered_votes: number,
    anonymous_votes: number,
    user_voted: boolean
}

const ExplorePollFetcher = ({ user, userEmail, validUser }: { user: string, userEmail: string | null, validUser: boolean }) => {
    const [ waitlistModal, setWaitListModal ] = useState<{ open: boolean, poll_id: string, title: string, description: string }>({ open: false, poll_id: "", title: "", description: "" })
    const [ checkoutModal, setCheckoutModal ] = useState<{ open: boolean, title: string, description: string, url: string }>({ open: false, title: "", description: "", url: "" })
    const [ showForm, setShowForm ] = useState<boolean>(false)

    const { data: polls, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfinitePolls();
    const { ref, inView } = useInView();
    console.log(polls);

    const handleWaitList = (poll_id: string, title?: string, description?: string) => {
        setWaitListModal({ open: true, poll_id, title: title as string, description: description as string })
        return;
    }

    const handleWaitListStatus = () => {
        setWaitListModal(prev => {
            return {...prev, open: !prev.open}
        })
        return;
    }

    const handleCheckout = (url: string, title?: string, description?: string) => {
        setCheckoutModal({ open: true, url, title: title as string, description: description as string })
        return;
    }

    const handlecheckoutStatus = () => {
        setCheckoutModal(prev => {
            return {...prev, open: !prev.open}
        })
        return;
    }

    const handleForm = () => {
        setShowForm(prev => !prev)
        return;
    }
    
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
                        {pages.length > 0 ? pages.map((page: Props, index: number) => <SingleChoice data={page} bulk={true} user={user} validUser={validUser} key={index} openForm={handleForm} openWaitList={handleWaitList} openPreSale={handleCheckout} />) : null}
                    </div>
                    ))}
                </div>
            </section>
            <JoinCompletion open={showForm} handleStatus={handleForm} />
            <WaitList poll_id={waitlistModal.poll_id} title={waitlistModal.title} description={waitlistModal.description} open={waitlistModal.open} handleModal={handleWaitList} handleStatus={handleWaitListStatus} userEmail={userEmail as string} />
            <PreSale title={checkoutModal.title} description={checkoutModal.description} url={checkoutModal.url} open={checkoutModal.open} handleStatus={handlecheckoutStatus} />
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