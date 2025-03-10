import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const page = () => {
    return (
        <main className='w-full relative overflow-x-hidden ml-14 settings'>
            <section className='py-0 pr-2 lg:pr-2 lg:pl-2 pt-7'>
                <div className='grid grid-cols-12 gap-x-5 gap-y-7'>
                    <form className='col-span-12 lg:col-span-12 border rounded-lg py-16 space-y-8' action="" method="post">
                        <h3 className="text-center lg:font-bold text-xl px-3">Profile Photo/Logo</h3>
                        <div className='w-full flex justify-center'>
                            <Avatar className='flex flex-col justify-center items-center w-28 h-28 lg:w-36 lg:h-36'>
                                <AvatarImage src="https://images.pexels.com/photos/29761732/pexels-photo-29761732/free-photo-of-traditional-vietnamese-incense-drying-process.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" className='object-cover' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='flex items-center justify-center space-x-3 w-full'>
                            <div className=''>
                                <label htmlFor="logofile" className='bg-muted py-[10px] px-5 rounded-md text-sm'>Select Image</label>
                                <input type="file" name="" id="logofile" className='hidden' />
                            </div>
                            <button type="submit" className='bg-primary py-2 px-5 text-black rounded-md text-sm'>Submit</button>
                        </div>
                        <p className="text-center text-slate-400 text-sm">Allowed JPG, PNG, JPEG. Max size of 1MB</p>
                    </form>
                    <form className='hidden col-span-12 lg:col-span-7 border rounded-lg py-12 lg:py-16 px-4 lg:px-16 space-y-6' action="" method="post">
                        <div className='space-y-2'>
                            <h3 className="lg:font-bold text-xl">Business details</h3>
                            <p className='text-sm text-slate-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        </div>
                        <div>
                            <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                                <label htmlFor="businessname" className='block text-xs text-gray-600 dark:text-gray-400'>Business Name</label>
                            </div>
                            <input type="text" name="businessname" id="businessname" placeholder="what's your business name?" className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 text-sm w-full' />
                        </div>
                        <div>
                            <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                                <label htmlFor="businessemail" className='block text-xs text-gray-600'>Business E-mail</label>
                            </div>
                            <input type="email" name="businessemail" id="businessemail" placeholder="your business email address?" className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 text-sm w-full' />
                        </div>
                        <div>
                            <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                                <label htmlFor="businessregno" className='block text-xs text-gray-600'>Business Registration Number</label>
                            </div>
                            <input type="text" name="businessregno" id="businessregno" placeholder="your business registration number?" className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 text-sm w-full' />
                        </div>
                        <button type="submit" className='bg-slate-900 py-2 px-10 text-slate-100 rounded-md text-sm'>Submit</button>
                    </form>
                </div>
                <div className='grid grid-cols-12 gap-x-5 gap-y-7 border rounded-lg mt-5 mb-40'>
                    <form className='col-span-12 lg:col-span-6 py-12 lg:py-16 px-4 lg:px-16 space-y-6' action="" method="post">
                        <div className='space-y-2'>
                            <h3 className="lg:font-bold text-xl">Personal Information</h3>
                            <p className='text-sm text-slate-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        </div>
                        <div>
                            <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                                <label htmlFor="fullname" className='block text-xs text-gray-600 dark:text-gray-400'>Full Name</label>
                            </div>
                            <input type="text" name="fullname" id="fullname" placeholder="Your full name" className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 text-sm w-full bg-transparent' />
                        </div>
                        <div>
                            <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                                <label htmlFor="email" className='block text-xs text-gray-600 dark:text-gray-400'>E-mail</label>
                            </div>
                            <input type="email" name="email" id="email" placeholder="Your email address?" className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 text-sm w-full bg-transparent' />
                        </div>
                        <button type="submit" className='bg-primary py-2 px-10 text-black rounded-md text-sm'>Submit</button>
                    </form>
                    <form className='col-span-12 lg:col-span-6 py-12 lg:py-16 px-4 lg:px-16 space-y-6' action="" method="post">
                        <div className='space-y-2'>
                            <h3 className="lg:font-bold text-xl">Change Password</h3>
                            <p className='text-sm text-slate-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        </div>
                        <div>
                            <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                                <label htmlFor="currentpassword" className='block text-xs text-gray-600 dark:text-gray-400'>Current Password</label>
                                <button type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </div>
                            <input type="password" name="currentpassword" id="currentpassword" placeholder='xxxxxxxxxxxx' className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 bg-transparent text-sm w-full' />
                        </div>
                        <div>
                            <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                                <label htmlFor="newpassword" className='block text-xs text-gray-600 dark:text-gray-400'>New Password</label>
                                <button type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </div>
                            <input type="password" name="newpassword" id="newpassword" placeholder='xxxxxxxxxxxx' className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 bg-transparent text-sm w-full' />
                        </div>
                        <div>
                            <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                                <label htmlFor="confirmpassword" className='block text-xs text-gray-600 dark:text-gray-400'>Confirm Password</label>
                                <button type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </div>
                            <input type="password" name="confirmpassword" id="confirmpassword" placeholder='xxxxxxxxxxxx' className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 bg-transparent text-sm w-full' />
                        </div>
                        <button type="submit" className='bg-primary py-2 px-10 text-black rounded-md text-sm'>Submit</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default page