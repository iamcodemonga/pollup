import DashboardTopBar from '@/components/dashboard/DashboardTopBar'
import UserPollsFetcher from '@/components/fetcher/userpolls'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const page = async() => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
        redirect("/login")
    }

    return (
        <main className='w-full relative overflow-x-hidden ml-14 lg:pl-3 allpolls'>
            <DashboardTopBar user={user.id} />
            <div className='flex w-full pr-2 py-5 mt-0'>
                <h1 className='text-2xl lg:text-4xl'>Polls Created</h1>
            </div>
            <UserPollsFetcher />
        </main>
    )
}

export default page