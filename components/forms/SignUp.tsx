"use client"

import { signUp } from '@/actions'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import RegisterButton from '../serverButtons/RegisterButton'
// import MoonLoader from 'react-spinners/MoonLoader'

const SignUpForm = () => {

    const [ fullname, setFullname ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ visibility, setVisibility ] = useState<boolean>(false);

    const handleSubmit = async() => {
        const fullnameRegex = /^([a-zA-Z ]+)$/;
        const emailRegex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/;

        if (fullname.trim() == "" || email.trim() == "" || password == "") {
            toast.error("Please, Fill in all fields!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (!fullnameRegex.test(fullname)) {
            toast.error("Fullname can only be alphabets!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error("Improper email format, check again!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        try {
            const result = await signUp({ fullname, email, password })
            if (result?.error) {
                toast.error(result.error, {
                    className: "dark:!bg-red-600 dark:!text-white"
                })
                return;
            }
        } catch (error) {
            console.log(error);
        }
        
        toast.success("Signup was successful!", {
            className: "dark:!bg-green-600 dark:!text-white"
        })
        return;
    }

    return (
        <>
            <form action={async () => await handleSubmit()} className='px-5 w-80  space-y-7 rounded-lg'>
                <div>
                    <h1 className='text-center text-xl text-primary mb-2'>Create Account</h1>
                    <p className='text-center text-foreground/80 text-sm'>Make decisions, earn rewards 👍 </p>
                </div>
                <div className='space-y-5'>
                    <div className='fullname-wrapper'>
                        <label htmlFor="fullname" className='block text-xs text-gray-500 dark:text-gray-400 mb-1 ml-1'>Fullname</label>
                        <input type="text" name="name" id="fullname" placeholder='e.g john doe' className='px-2 py-3 lg:py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className='email-wrapper'>
                        <label htmlFor="email" className='block text-xs text-gray-500 dark:text-gray-400 mb-1 ml-1'>Email</label>
                        <input type="email" name="email" id="email" placeholder='e.g johndoe23@gmail.com' className='px-2 py-3 lg:py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='password-wrapper'>
                        <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                            <label htmlFor="password" className='block text-xs text-gray-500 dark:text-gray-400'>Password</label>
                            <button type="button" onClick={() => setVisibility(prev => !prev)}>
                                {visibility ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>}
                            </button>
                        </div>
                        <input type={visibility ? "text" : "password"} name="password" id="password" placeholder='xxxxxxxxxxxx' className='px-2 py-3 lg:py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <div className='w-full space-y-4'>
                        <div className="flex items-center space-x-2 ml-1">
                            <input type="checkbox" name="terms" id="terms" checked className='border-2' onChange={() => {}} />
                            <label htmlFor="terms" className='block text-xs text-gray-500 dark:text-gray-300'>I agree with all the <Link href={'/'} className='underline text-blue-500 dark:text-foreground'>terms and conditions</Link></label>
                        </div>
                        <RegisterButton />
                        <small className='block text-gray-500 dark:text-gray-300 text-center text-xs'>Already have an account? <Link href={"/login"} className='underline text-blue-500 dark:text-foreground'>Login</Link></small>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignUpForm