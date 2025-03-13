"use client"

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAllPolls = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const { data } = await axios(`${process.env.NEXT_PUBLIC_ROOTURL}/api/polls?page=${pageParam}&limit=${10}`)
    return data;
};

export const useInfinitePolls = () => {
  return useInfiniteQuery({
    queryKey: ['explore'],
    queryFn: fetchAllPolls,
    getNextPageParam: (lastPage, allPages) => {
      // Return the next page number if there are more pages
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1, // Start with page 1
  });
};