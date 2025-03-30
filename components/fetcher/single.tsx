"use client"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import SingleChoice from '../polls/SingleChoice';
import PollSkeleton from '../loader/Poll';

type Props = {
    id: string,
    user: string
}

const fetchPoll = async (id: string) => {
    const response = await axios(`${process.env.NEXT_PUBLIC_ROOTURL}/api/polls/${id}`);
    return response.data;
};

const SinglePollFetcher = ({ id, user }: Props) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["poll", id],
        queryFn: () => fetchPoll(id)
    })

    if (isLoading) return <PollSkeleton count={[1]} />
    if (isError) return <div>An error occurred</div>

    return (
        <div className='lg:w-[600px] space-y-20'>
            <SingleChoice data={data} user={user} bulk={false} />
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