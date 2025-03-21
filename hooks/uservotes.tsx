"use client"

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMyVotes = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const { data } = await axios(`${process.env.NEXT_PUBLIC_ROOTURL}/api/user/votes?page=${pageParam}&limit=${6}`)
    return data;
};

export const useInfiniteUserVotes = () => {
  return useInfiniteQuery({
    queryKey: ['my-votes'],
    queryFn: fetchMyVotes,
    getNextPageParam: (lastPage, allPages) => {
      // Return the next page number if there are more pages
      return lastPage.length === 6 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1, // Start with page 1
  });
};