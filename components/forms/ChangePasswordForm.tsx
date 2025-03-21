"use client"

import { updatePassword } from '@/actions';
import React, { useState } from 'react'
import { toast } from 'sonner';
import ChangePasswordButton from '../serverButtons/ChangePasswordButton';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [ visibility, setVisibility ] = useState<{ old: boolean, new: boolean, confirmed: boolean }>({ old: false, new: false, confirmed: false });

    const handleVisibility = async(type: string) => {
        setVisibility(prev => {
            if (type == "new") {
                return {...prev, new: !prev.new}
            }
             if (type == "old") {
                return {...prev, old: !prev.old}
            }
            return {...prev, confirmed: !prev.confirmed}
        })
        return;
    }

    const handleSubmit = async () => {
        // e.preventDefault();
        if (oldPassword == "" || newPassword == "" || confirmedPassword == "") {
            toast.error("Please, Fill in all fields!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (newPassword !== confirmedPassword) {
            toast.error("New password does not match confirmation!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }
    
        try {
          const result = await updatePassword({ oldPassword, newPassword })
            if (result?.error) {
                toast.error(result.error, {
                    className: "dark:!bg-red-600 dark:!text-white"
                })
                return;
            }
        } catch (err) {
            console.log(err);  
        }

        setOldPassword("");
        setNewPassword("");
        setConfirmedPassword("");
        toast.success("Password changed successfully!", {
            className: "dark:!bg-green-600 dark:!text-white"
        })
        return;
    };

    return (
        <form action={async () => await handleSubmit()} className='col-span-12 lg:col-span-6 py-12 lg:py-16 px-4 lg:px-16 space-y-6' >
            <div className='space-y-2'>
                <h3 className="lg:font-bold text-xl">Change Password</h3>
                <p className='text-sm text-slate-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
            <div>
                <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                    <label htmlFor="currentpassword" className='block text-xs text-gray-600 dark:text-gray-400'>Current Password</label>
                    <button type="button" onClick={() => handleVisibility("old")}>
                        {visibility.old ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>}
                    </button>
                </div>
                <input type={visibility.old ? "text" : "password"} name="currentpassword" id="currentpassword" placeholder='xxxxxxxxxxxx' className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 bg-transparent text-sm w-full' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div>
                <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                    <label htmlFor="newpassword" className='block text-xs text-gray-600 dark:text-gray-400'>New Password</label>
                    <button type="button" onClick={() => handleVisibility("new")}>
                        {visibility.new ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>}
                    </button>
                </div>
                <input type={visibility.new ? "text" : "password"} name="newpassword" id="newpassword" placeholder='xxxxxxxxxxxx' className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 bg-transparent text-sm w-full' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
                <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                    <label htmlFor="confirmpassword" className='block text-xs text-gray-600 dark:text-gray-400'>Confirm Password</label>
                    <button type="button" onClick={() => handleVisibility("confirmed")}>
                        {visibility.confirmed ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>}
                    </button>
                </div>
                <input type={visibility.confirmed ? "text" : "password"} name="confirmpassword" id="confirmpassword" placeholder='xxxxxxxxxxxx' className='px-2 py-[8px] border-[1.5px] rounded-md border-gray-500 bg-transparent text-sm w-full' value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
            </div>
            <ChangePasswordButton />
        </form>
    )
}

export default ChangePasswordForm