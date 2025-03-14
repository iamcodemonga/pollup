"use client"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import SingleChoice from '../polls/SingleChoice';
import PollSkeleton from '../loader/Poll';

type Props = {
    id: string
}

const fetchPoll = async (id: string) => {
    const response = await axios(`${process.env.NEXT_PUBLIC_ROOTURL}/api/polls/${id}`);
    return response.data;
};

const SinglePollFetcher = ({ id }: Props) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["poll", id],
        queryFn: () => fetchPoll(id)
    })

    if (isLoading) return <PollSkeleton count={[1]} />
    if (isError) return <div>An error occurred</div>

    return (
        <div className='lg:w-[600px] space-y-20'>
            <SingleChoice data={data} bulk={false} />
        </div>
    )
}

export default SinglePollFetcher