"use client"

import Link from 'next/link'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const page = () => {
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
        <div className='h-screen w-full flex justify-center items-center bggg'>
            <form className='borde py- px-5 w-80  space-y-6 rounded-lg'>
                <div>
                    <h1 className='text-center text-xl text-sky-500 mb-2'>Login</h1>
                    {/* <p className='text-center text-gray-500 text-sm'>More decisions to make 🚀  </p> */}
                </div>
                <div className='space-y-5'>
                    <div>
                        <label htmlFor="email" className='block text-xs text-gray-500 mb-1 ml-1'>Email</label>
                        <input type="email" name="email" id="email" placeholder='e.g mcdonalds@gmail.com' className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' />
                    </div>
                    <div>
                        <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                            <label htmlFor="password" className='block text-xs text-gray-500'>Password</label>
                            <button type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                        </div>
                        <input type="password" name="password" id="password" placeholder='xxxxxxxxxxxx' className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' />
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <div className='w-full space-y-4'>
                        <small className='block text-gray-500 text-center text-xs'>Don&apos;t have account? <Link href={"/signup"} className='underline text-blue-700'>Signup</Link></small>
                        <button type='submit' className='w-full py-3 px-10 text-white rounded-lg bg-black text-sm'>submit</button>
                        <Dialog>
                          <DialogTrigger className='block w-full text-center text-xs underline text-blue-700'>I forgot my password!</DialogTrigger>
                          <DialogContent className='py-10'>
                            <DialogHeader>
                              <DialogTitle className='mb-2'>Forgot Password?</DialogTitle>
                              <DialogDescription>
                                We will send a new passcode to your email address, you can change it when you log in.
                              </DialogDescription>
                            </DialogHeader>
                              <form action="" className='space-y-5 mt-3'>
                                <div>
                                    <label htmlFor="forgot-email" className='block text-xs text-gray-500 mb-1 ml-1'>Email address</label>
                                    <input type="forgot-email" name="forgot-email" id="forgot-email" placeholder='e.g johndoe@gmail.com' className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' />
                                </div>
                                <button type="submit" className='py-[10px] px-10 text-sm rounded-md bg-slate-950 text-white'>Submit</button>
                              </form>
                          </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </form>
        </div>
      </div>
    )
}

export default page