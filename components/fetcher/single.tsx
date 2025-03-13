"use client"

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import SingleChoice from '../polls/SingleChoice';

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

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>An error occurred</div>

    return (
        <SingleChoice data={data} bulk={false} />
    )
}

export default SinglePollFetcher