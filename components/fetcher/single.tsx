"use client"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import SingleChoice from '../polls/SingleChoice';
import PollSkeleton from '../loader/Poll';
import JoinCompletion from '../popup/JoinCompletion';
import WaitList from '../popup/WaitList';
import PreSale from '../popup/PreSale';

type Props = {
    id: string,
    user: string,
    userEmail: string | null,
    validUser: boolean
}

const fetchPoll = async (id: string) => {
    const response = await axios(`${process.env.NEXT_PUBLIC_ROOTURL}/api/polls/${id}`);
    return response.data;
};

const SinglePollFetcher = ({ id, user, userEmail, validUser }: Props) => {
  const [ waitlistModal, setWaitListModal ] = useState<{ open: boolean, poll_id: string, title: string, description: string }>({ open: false, poll_id: "", title: "", description: "" })
  const [ checkoutModal, setCheckoutModal ] = useState<{ open: boolean, title: string, description: string, url: string }>({ open: false, title: "", description: "", url: "" })
  const [ showForm, setShowForm ] = useState<boolean>(false)

    const { data, isLoading, isError } = useQuery({
        queryKey: ["poll", id],
        queryFn: () => fetchPoll(id)
    })

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

    if (isLoading) return <PollSkeleton count={[1]} />
    if (isError) return <div>An error occurred</div>

    return (
        <div className='lg:w-[600px] space-y-20'>
            <SingleChoice data={data} user={user} bulk={false} validUser={validUser} openForm={handleForm} openWaitList={handleWaitList} openPreSale={handleCheckout} />
            <JoinCompletion open={showForm} handleStatus={handleForm} />
            <WaitList poll_id={waitlistModal.poll_id} title={waitlistModal.title} description={waitlistModal.description} open={waitlistModal.open} handleModal={handleWaitList} handleStatus={handleWaitListStatus} userEmail={userEmail as string} />
            <PreSale title={checkoutModal.title} description={checkoutModal.description} url={checkoutModal.url} open={checkoutModal.open} handleStatus={handlecheckoutStatus} />
            <PollSchema poll={data} />
        </div>
    )
}

function PollSchema({ poll }: { poll: {
    id: string,
    question: string,
    description: string | null,
    created_at: string,
    creator?: {
        id: string,
        fullname: string,
        username: string,
    } | null,
    options: Array<{
        id: string,
        text: string,
        image?: string | null,
        votes: Array<string | null>,
        total_votes: number,
    }>,
    total_votes: number,
  } }) {
    return (
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Question",
          "name": poll.question,
          "text": poll.description,
          "dateCreated": poll.created_at,
          "author": {
            "@type": "Person",
            "name": poll.creator?.fullname
          },
          "answerCount": poll.total_votes,
          "suggestedAnswer": poll.options.map(option => ({
            "@type": "VotingAction",
            "name": option.text,
            "voteCount": option.votes
          }))
        })}
      </script>
    )
}

export default SinglePollFetcher