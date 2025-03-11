"use client"

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

type TTPoll = {
    id: string,
    question: string,
    duration: number,
    active: boolean,
    created_at: string,
    creator: {
        dp: string | null,
        id: string,
        email: string,
        username: string,
        verified: boolean
    },
    options: Array<TTOption>,
    total_votes: number,
    user_has_voted: boolean,
    selected_option_id: string | null
}

type TTOption = {
    id: string,
    text: string,
    image: string | null,
    votes?: string[],
    total_votes: number,
    user_voted: boolean
}

export const vote = async ({ pollId, optionId }: { pollId: string; optionId: string }) => {
    const { data: result } = await axios.post(`${process.env.NEXT_PUBLIC_ROOTURL}/api/votes/${pollId}?choice=${optionId}`);
    return result;
};

export const useVote = (pollId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vote,
    onMutate: async (newVote) => {
      // Cancel any ongoing refetches for this query
      await queryClient.cancelQueries({ queryKey: ['poll', pollId] });

      // Get the previous poll data
      const previousPoll = queryClient.getQueryData(['poll', pollId]);

      // Optimistically update the poll data
      queryClient.setQueryData(['poll', pollId], (old: TTPoll) => {
        return {
          ...old,
          options: old.options.map((option: TTOption) => ({
            ...option,
            total_votes:
              option.id === newVote.optionId ? option.total_votes + 1 : option.total_votes,
            user_voted: option.id === newVote.optionId ? true : option.user_voted,
          })),
          total_votes: old.total_votes + 1,
          user_has_voted: true,
          selected_option_id: newVote.optionId,
        };
      });

      // Return the previous poll data for rollback
      return { previousPoll };
    },
    onError: (err, newVote, context) => {
      // Rollback to the previous poll data
      queryClient.setQueryData(['poll', pollId], context?.previousPoll);
      toast.error("Oops, an error occurred trying to vote!!!", {
        className: "dark:!bg-red-600 dark:!text-white"
    })
    },
    onSettled: () => {
      // Refetch the poll data to ensure the UI is in sync with the server
      queryClient.invalidateQueries({ queryKey: ['poll', pollId] });
        // toast.success("You have voted successfully!", {
        //     className: "dark:!bg-green-600 dark:!text-white"
        // })
        return;
    },
  });
};