import SignUpForm from '@/components/forms/SignUp'
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: 'Sign Up to Create Polls & Earn Rewards',
    description: `Join ${process.env.BRANDNAME} for free! Create polls, vote on topics, and earn rewards.`,
    alternates: {
      canonical: '/signup'
    }
  }

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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-foreground lg:text-white">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                    </svg>
                    <span className='text-foreground lg:text-white'>Back</span>
                </Link>
            </div>
            <div className='hidden lg:block lg:h-screen w-full bg-muted'>
                <Image src="https://images.pexels.com/photos/8553864/pexels-photo-8553864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="thumbs-up" className='w-full h-full object-cover' width={500} height={500} />
            </div>
            <div className='h-screen w-full flex justify-center items-center'>
                <SignUpForm />
            </div>
        </div>
    )
}

export default page