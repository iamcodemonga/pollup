import React from 'react'
import ChangePasswordForm from '@/components/forms/ChangePasswordForm'
import EditProfileForm from '@/components/forms/EditProfileForm'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardTopBar from '@/components/dashboard/DashboardTopBar'
import DPUpload from '@/components/dashboard/DPUpload'

const page = async() => {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
        redirect("/login")
    }

    const { data, error } = await supabase
        .from("users")
        .select("fullname, gender, birthday, dp")
        .eq("id", user.id)
        .single()

    if (error) {
        console.log(error);
    }
    
    return (
        <main className='w-full relative overflow-x-hidden ml-14 settings'>
            <section className='py-0 lg:pr-0 lg:pl-3 pt-0'>
                <DashboardTopBar user={user.id} />
                <div className='grid grid-cols-12 gap-x-5 gap-y-7 mr-2 lg:mr-2'>
                    <DPUpload abbr={data?.fullname.substring(0, 2)} userid={user.id} dp={data?.dp} />
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
                <div className='grid grid-cols-12 gap-x-5 gap-y-7 border rounded-lg mt-5 mb-40 lg:pr-2 mr-2 lg:mr-2'>
                    <EditProfileForm name={data?.fullname} dob={data?.birthday} gend={data?.gender} />
                    <ChangePasswordForm />
                </div>
            </section>
        </main>
    )
}

export default page