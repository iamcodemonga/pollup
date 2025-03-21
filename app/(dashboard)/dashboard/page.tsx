import TopCard from '@/components/Topcard'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'
import DashboardTopBar from '@/components/dashboard/DashboardTopBar';
import UserActivePollsFetcher from '@/components/fetcher/activeuserpolls';
import axios from 'axios';

const page = async() => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
        redirect("/login")
    }

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_ROOTURL}/api/user?id=${user.id}`)

    return (
        <main className='w-full relative overflow-x-hidden ml-14 lg:pl-3 overview'>
            <DashboardTopBar user={user.id} />
            <div className='pb-8 mt-5 space-y-5'>
                <h1 className='text-2xl lg:text-4xl'>Dashboard</h1>
                {/* <button className='bg-foreground text-background py-3 px-10 rounded-md text-sm'>Topup</button> */}
            </div>
            <div className='grid grid-cols-12 gap-x-1 gap-y-1 lg:gap-y-0 lg:gap-x-3 pr-2 lg:pr-2'>
                <TopCard label='Balance' value={data.balance} money={true} index={0}>
                    <div className='rounded-full p-3 bg-green-700 flex justify-center items-center w-14 h-14'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white self-center">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                    </div>
                </TopCard>
                <TopCard label="Task completed" value={1} money={false}>
                    <div className='rounded-full p-3 bg-primary/10 flex justify-center items-center w-14 h-14'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>
                </TopCard>
                <TopCard label='Polls created' value={data.polls} money={false}>
                    <div className='rounded-full p-3 bg-primary/10 flex justify-center items-center w-14 h-14'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                    </div>
                </TopCard>
                <TopCard label='Total votes' value={data.votes} money={false}>
                    <div className='rounded-full p-3 bg-primary/10 flex justify-center items-center w-14 h-14'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                        </svg>
                    </div>
                </TopCard>
            </div>
            <section className='w-full py-10 allorders-section hidde pr-2 lg:pr-2'>
                <h3 className='text-xl mb-5 text-left lg:text-left'>Active Polls</h3>
                <UserActivePollsFetcher />
            </section>
        </main>
    )
}

export default page