"use client"

import { FormEvent, useState } from 'react';
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
 } from '../ui/dialog'
import { toast } from 'sonner';
import { engageWaitList } from '@/actions';
import WaitListButton from '../serverButtons/WaitListButton';

const WaitList = ({ poll_id, title, description, userEmail, open, handleStatus }: { poll_id: string, title?: string, description?: string, open: boolean, userEmail: string | null, handleModal: ( poll_id: string, title?: string, description?: string) => void, handleStatus: () => void }) => {
    const [email, setEmail] = useState<string>(userEmail ? userEmail : "");

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        const emailRegex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/;

        if (email.trim() == "") {
            toast.error("Please, add your email address!", {
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

        // formaction
        const result = await engageWaitList({ poll_id, email })
        if (result?.error) {
            toast.error(result.error, {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        handleStatus()
        toast.success("Thank you for your support, we appreciate! 👍", {
            className: "dark:!bg-green-600 dark:!text-white"
        })
        return;
    }

    return (
        <Dialog open={open} onOpenChange={handleStatus}>
            <DialogContent className="max-w-80 sm:max-w-[425px] rounded-lg">
                <DialogHeader>
                <DialogTitle className='text-2xl'>{title ? title : "Join our waitlist"}</DialogTitle>
                <DialogDescription className='!mt-3'>{description ? description : "signup to get notified when we launch"}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                            <label htmlFor="email" className='block text-xs text-gray-600 dark:text-gray-400'>Email</label>
                        </div>
                        <input type="email" name="email" id="email" placeholder="e.g johndoe@example.com"className='px-2 py-3 lg:py-[8px] border-[1.5px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <DialogFooter className='mt-1'>
                        <WaitListButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default WaitList