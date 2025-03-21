"use client"

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMyActivePolls = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const { data } = await axios(`${process.env.NEXT_PUBLIC_ROOTURL}/api/user/polls?page=${pageParam}&limit=${6}&filter=active`)
    return data;
};

export const useInfiniteActiveUserPolls = () => {
  return useInfiniteQuery({
    queryKey: ['my-active-polls'],
    queryFn: fetchMyActivePolls,
    getNextPageParam: (lastPage, allPages) => {
      // Return the next page number if there are more pages
      return lastPage.length === 6 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1, // Start with page 1
  });
};