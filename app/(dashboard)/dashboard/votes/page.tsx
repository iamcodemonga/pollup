import DashboardTopBar from '@/components/dashboard/DashboardTopBar'
import UserVotesFetcher from '@/components/fetcher/uservotes'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const page = async() => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
        redirect("/login")
    }

    return (
        <main className='w-full relative overflow-x-hidden ml-14 lg:pl-3 allvotes'>
            <DashboardTopBar user={user.id} />
            <div className='flex w-full pr-2 py-5 mt-0'>
                <h1 className='text-2xl lg:text-4xl'>Polls Engaged</h1>
            </div>
            <UserVotesFetcher />
        </main>
    )
}

export default page