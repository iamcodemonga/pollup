import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerTitle,
    DrawerHeader,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import Link from 'next/link';
import { Separator } from '../ui/separator';

const DashboardTopBar = ({ user }: { user: string }) => {
    return (
        <div className='pr-2 pb-5 pt-2 sticky top-0 z-50'>
            <div className='bg-background border flex lg:hidden items-center justify-between w-full py-5 px-3 lg:px-5 rounded-md nav-sm'>
                <Link href={"/"} className='flex items-center font-bold text-2xl'>
                    <span className='text-secondary'>Reap</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-primary">
                        <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                    </svg>
                    <span className='text-accent'>ll</span>
                </Link>
                <Drawer>
                    <DrawerTrigger asChild>
                        <button type='button' className='flex space-x-1'>
                            {/* <span>menu</span> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className='hidden'>Menu</DrawerTitle>
                        </DrawerHeader>
                    <div className='space-y-5 mb-5'>
                            <Link href={"/"} className='w-full flex justify-center text-md font-semibold text-slate-500'>Home</Link>
                            <Link href={"/explore"} className='w-full flex justify-center text-md font-semibold text-slate-500'>Explore</Link>
                            <Link href={"/create"} className='w-full flex justify-center text-md font-semibold text-slate-500'>Create Poll</Link>
                            {/* <a href={"mailto:codemonga@gmail.com"} className='w-full flex justify-center text-md font-semibold text-slate-400'>Contact</a> */}
                            {/* <Link href={"/"} className='w-full flex justify-center text-md font-semibold text-slate-400'>About</Link> */}
                            {/* <Link href={"/login"} className='w-full flex justify-center text-md font-semibold text-slate-400'>Login</Link> */}
                    </div>
                    <DrawerFooter className='py-3 mb-10'>
                            <div className='w-full flex justify-center items-center'>
                                <div className='space-x-5'>
                                    <Link href={"/dashboard"} className='bg-blue-500 text-white py-3 px-8 rounded-full'>Dashboard</Link>
                                </div>
                            </div>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
            <div className='bg-background border hidden lg:flex items-center justify-between w-full py-5 px-3 lg:px-5 rounded-md nav-lg'>
                <div className='space-x-7 flex items-center'>
                    <Link href={"/"} className='flex items-center font-bold text-2xl'>
                        <span className='text-secondary'>Reap</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-primary">
                            <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                        </svg>
                        <span className='text-accent'>ll</span>
                    </Link>
                    <Link href={"/explore"}>Explore</Link>
                    <Link href={"/create"}>Create Poll</Link>
                    {/* <a target='_blank' href="mailto:codemonga@gmail.com">Contact Us</a> */}
                    {/* <Link href={"/"}>About</Link> */}
                </div>
                {user ? <div className='space-x-3 flex items-center'>
                    <Separator orientation='vertical' className='h-5 bg-slate-300 dark:bg-slate-600' />
                    <div>
                        <Link href={"/dashboard"} className=''>Dashboard</Link>
                    </div>
                    </div> : null}
            </div>
        </div>
    )
}

export default DashboardTopBar