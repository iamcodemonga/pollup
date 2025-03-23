"use client"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import PollSkeleton from '../loader/Poll';
import LandingPoll from '../polls/LandingPoll';

type Props = {
    id: string
}

const fetchPoll = async (id: string) => {
    const response = await axios(`${process.env.NEXT_PUBLIC_ROOTURL}/api/polls/${id}?type=landing`);
    return response.data;
};

const LandingPollFetcher = ({ id }: Props) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["poll", id],
        queryFn: () => fetchPoll(id)
    })

    if (isLoading) return <PollSkeleton count={[1]} />
    if (isError) return <div>An error occurred</div>

    return (
        <LandingPoll data={data} bulk={false} />
    )
}

export default LandingPollFetcher