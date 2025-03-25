"use client"

import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner';
import EditProfileButton from '../serverButtons/EditProfileButton';
import { updateUser } from '@/actions';

const EditProfileForm = ({ name, gend, dob }: { name: string, gend: string, dob: string }) => {
    const [ fullname, setFullname ] = useState<string>(name);
    const [ gender, setGender ] = useState<string>(gend ? gend : "");
    const [ birthday, setBirthday ] = useState<string>(dob ? new Date(dob).toISOString().split("T")[0] : "");
  const [maxDate, setMaxDate] = useState<string>("");

    useEffect(() => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18); // Subtract 18 years
        const maxDateStr = today.toISOString().split("T")[0]; // Format YYYY-MM-DD
        setMaxDate(maxDateStr);
    }, []);

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        const fullnameRegex = /^([a-zA-Z ]+)$/;

        if (fullname.trim() == "") {
            toast.error("Fullname is empty!", {
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
            const result = await updateUser({ fullname, gender, birthday })
            if (result?.error) {
                toast.error(result.error, {
                    className: "dark:!bg-red-600 dark:!text-white"
                })
                return;
            }
        } catch (err) {
            console.log(err);  
        }

        toast.success("Profile changed successfully!", {
            className: "dark:!bg-green-600 dark:!text-white"
        })
        return;
    }

    return (
        <form className='col-span-12 lg:col-span-6 py-12 lg:py-16 px-4 lg:px-16 space-y-6' onSubmit={handleSubmit}>
            <div className='space-y-2'>
                <h3 className="lg:font-bold text-xl">Personal Information</h3>
                <p className='text-sm text-slate-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
            <div>
                <div className='mb-[5px] flex w-full justify-between items-center px-1'>
                    <label htmlFor="fullname" className='block text-xs text-gray-600 dark:text-gray-400'>Fullname</label>
                </div>
                <input type="text" name="fullname" id="fullname" placeholder="Your full name" className='px-2 py-3 lg:py-[8px] border-[1.5px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </div>
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
            <EditProfileButton />
        </form>
    )
}

export default EditProfileForm