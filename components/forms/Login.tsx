"use client"

import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { toast } from "sonner";
import { loginWithPassword } from "@/actions";
import { useState } from "react";
import LoginButton from "../serverButtons/LoginButton";

const LoginForm = () => {

    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ visibility, setVisibility ] = useState<boolean>(false);

    const handleSubmit = async() => {
        const emailRegex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/;

        if (email.trim() == "" || password == "") {
            toast.error("Please, Fill in all fields!", {
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

        const result = await loginWithPassword({ email, password })
        if (result?.error) {
            toast.error(result.error, {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        toast.success("Welcome back!", {
            className: "dark:!bg-green-600 dark:!text-white"
        })
        return;
    }

    return (
        <form action={async () => await handleSubmit()} className='py- px-5 w-80  space-y-6 rounded-lg'>
            <div>
                <h1 className='text-center text-xl text-sky-500 mb-2'>Login</h1>
                {/* <p className='text-center text-gray-500 text-sm'>More decisions to make 🚀  </p> */}
            </div>
            <div className='space-y-5'>
                <div className="email-wrapper">
                    <label htmlFor="email" className='block text-xs text-gray-500 dark:text-gray-400 mb-1 ml-1'>Email</label>
                    <input type="email" name="email" id="email" placeholder='e.g mcdonalds@gmail.com' className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="password-wrapper">
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
                    <input type={visibility ? "text" : "password"} name="password" id="password" placeholder='xxxxxxxxxxxx' className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-full space-y-4'>
                    <small className='block text-gray-500 dark:text-gray-400 text-center text-xs'>Don&apos;t have account? <Link href={"/signup"} className='underline text-blue-700'>Signup</Link></small>
                    <LoginButton />
                    <Dialog>
                        <DialogTrigger className='block w-full text-center text-xs underline text-blue-700'>I forgot my password!</DialogTrigger>
                        <DialogContent className='py-10'>
                        <DialogHeader>
                            <DialogTitle className='mb-2'>Forgot Password?</DialogTitle>
                            <DialogDescription className='text-gray-500 dark:text-gray-400'>
                            We will send a new passcode to your email address, you can change it when you log in.
                            </DialogDescription>
                        </DialogHeader>
                            <form action="" className='space-y-5 mt-3'>
                            <div>
                                <label htmlFor="forgot-email" className='block text-xs text-gray-500 dark:text-gray-400 mb-1 ml-1'>Email address</label>
                                <input type="forgot-email" name="forgot-email" id="forgot-email" placeholder='e.g johndoe@gmail.com' className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' />
                            </div>
                            <button type="submit" className='py-[10px] px-10 text-sm rounded-md bg-primary text-black'>Submit</button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </form>
    )
}

export default LoginForm