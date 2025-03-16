import Link from 'next/link'
import LoginForm from '@/components/forms/Login'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const page = async() => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user?.id) {
        redirect("/dashboard")
    }

    return (
      <div className='w-full lg:flex'>
        <div className='fixed top-0 left-0 m-4 z-50'>
            <Link href="/" className='flex items-center space-x-1'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-black lg:text-white">
                    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                </svg>
                <span className='text-black lg:text-white'>Back</span>
            </Link>
        </div>
        <div className='hidden lg:block lg:h-screen w-full'>
            <img src="https://images.pexels.com/photos/2379886/pexels-photo-2379886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="thumbs-up" className='w-full h-full object-cover' />
        </div>
        <div className='h-screen w-full flex justify-center items-center'>
            <LoginForm />
        </div>
      </div>
    )
}

export default page