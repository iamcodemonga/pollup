"use client"

import { useInfiniteUserVotes } from '@/hooks/uservotes';
import UserVotesCard from '../dashboard/UserVoteCard';
import MoonLoader from 'react-spinners/MoonLoader';
import DashboardCard from '../loader/DashboardCard';
import EmptyUserVotes from '../empty/EmptyUserVotes';

type Props = {
    id: string,
    question: string,
    duration: number,
    active: boolean,
    created_at: string,
    creator?: TOwner | null,
    options: Array<TOptions>,
    total_votes: number,
    isExpired: boolean
}

type TOwner = {
    id: string,
    dp: string,
    username: string,
    email: string,
    verified: boolean
}

type TOptions = {
    id: string,
    text: string,
    image?: string | null,
    votes: Array<string | null>
}

const UserVotesFetcher = () => {

    const { data: polls, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteUserVotes();
    // const { ref, inView } = useInView();
    console.log(polls);

    return (
        <>
            <section className='w-full pb-10 allorders-section hidde pr-2 lg:pr-4 space-y-3 lg:space-y-5'>
                {isError ? <p>error</p> : null}
                {isLoading ? <DashboardCard count={[1,2,3,4,5,6]} /> : null}
                {polls?.pages[0].length > 0 ? polls?.pages.map((pages, pageIndex) => <div className='grid grid-cols-12 gap-x-3 gap-y-3 lg:gap-y-5 lg:gap-x-3' key={pageIndex}>
                    {pages.length > 0 ? pages.map((page: Props, index: number) => <UserVotesCard data={page} key={index}/>) : null}
                </div>) : <EmptyUserVotes />}
            </section>
            <div className='w-full flex justify-center mt-10 mb-20'>
                {isFetchingNextPage ? <MoonLoader color='hsl(var(--foreground))' size={30} loading={isFetchingNextPage} /> : hasNextPage ? <button type="button" className='px-10 py-3 rounded-md bg-primary text-xs text-black' onClick={() => fetchNextPage()}>Load more</button> : null}
            </div>
        </>
    )
}

export default UserVotesFetcher