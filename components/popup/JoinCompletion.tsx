"use client"

import { FormEvent, useEffect, useState } from 'react';
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
 } from '../ui/dialog'
import EditProfileButton from '../serverButtons/EditProfileButton';
import { toast } from 'sonner';
import { tasks } from '@/lib/data/clientMockData';
import { updateUser } from '@/actions';

const JoinCompletion = ({ open, handleStatus }: { open: boolean, handleStatus: () => void }) => {
    const [ gender, setGender ] = useState<string>("");
    const [ birthday, setBirthday ] = useState<string>("");
    const [maxDate, setMaxDate] = useState<string>("");

    useEffect(() => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18); // Subtract 18 years
        const maxDateStr = today.toISOString().split("T")[0]; // Format YYYY-MM-DD
        setMaxDate(maxDateStr);
    }, []);

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        if (gender == "") {
            toast.error("Gender not selected!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (!birthday) {
            toast.error("Date of birth is required!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        const selectedDate = new Date(birthday);
        const today = new Date();
        const age = today.getFullYear() - selectedDate.getFullYear();
        const monthDiff = today.getMonth() - selectedDate.getMonth();
        const dayDiff = today.getDate() - selectedDate.getDate();

        const is18 = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

        if (!is18) {
            toast.error("You must be at least 18 years old!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
        }

        try {
            const result = await updateUser({ gender, birthday, eligible: true, reward: tasks[1].reward })
            if (result?.error) {
                toast.error(result.error, {
                    className: "dark:!bg-red-600 dark:!text-white"
                })
                return;
            }
        } catch (err) {
            console.log(err);  
        }

        toast.success(`You just earned extra ${tasks[1].reward.toLocaleString()} credits!`, {
            className: "dark:!bg-green-600 dark:!text-white"
        })

        handleStatus()
        return;
    }

    return (
        <Dialog open={open} onOpenChange={handleStatus}>
            <DialogContent className="max-w-80 sm:max-w-[425px] rounded-lg">
                <DialogHeader>
                    {/* <DialogOverlay  /> */}
                    <DialogTitle className='text-2xl'>You&apos;re almost there</DialogTitle>
                    <DialogDescription className='!mt-3'>Complete your profile, earn extra credits and reap massive rewards by voting.</DialogDescription>
                </DialogHeader>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                            <label htmlFor="gender" className='block text-xs text-gray-600 dark:text-gray-400'>Gender</label>
                        </div>
                        <select name="gender" id="gender" className='px-2 py-3 lg:py-[8px] border-[1.5px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={gender}  onChange={(e) => setGender(e.target.value)}>
                            <option value="">select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div>
                        <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                            <label htmlFor="fullname" className='block text-xs text-gray-600 dark:text-gray-400'>Date of birth</label>
                        </div>
                        <input type="date" name="birthday" id="birthday" placeholder="Add your date of birth" max={maxDate} className='px-2 py-3 lg:py-[8px] border-[1.5px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    </div>
                    <DialogFooter>
                        <EditProfileButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default JoinCompletion