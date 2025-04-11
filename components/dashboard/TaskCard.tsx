"use client"

import { MagicCard } from '@/components/magicui/magic-card';
import { useTheme } from "next-themes";
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import copy from "clipboard-copy"
import { toast } from 'sonner';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';

type TTaskCard = {
    task: {
        id: string,
        type: string,
        title: string,
        description: string,
        reward: number,
        completed: boolean,
    },
    children: ReactNode,
    userid?: string
}

const TaskCard = ({ task, children, userid }: TTaskCard) => {
    const { theme } = useTheme();
    const [ copied, setCopied ] = useState<boolean>(false)

    const handleCopy = async(text: string) => {
        if (copied) {
            return;
        }
        setCopied(true)
        await copy(text)
        toast.success("Referral link copied!", {
            className: "dark:!bg-green-600 dark:!text-white"
        })
        setTimeout(() => {
            setCopied(false)
        }, 1500);
        return;
    }

    return (
        <div className='w-full bg-gray'>
            <MagicCard className='!border-0 py-8 px-2 rounded-xl' gradientColor={theme === "dark" ? "#535353" : "#efefef"}>
                <div className="w-full flex justify-center">
                    <div className='w-16 h-16 rounded-full flex justify-center items-center dark:bg-gray-700 bg-gray-200'>
                        {children}
                    </div>
                </div>
                {/* <h4 className='text-center text-xl font-semibold mt-3'>Create a poll</h4> */}
                <h4 className='text-center text-xl font-semibold mt-3'>{task.title}</h4>
                <p className='text-center text-xs mt-1 text-green-600'>+{task.reward.toLocaleString()}</p>
                <p className='text-center text-sm mt-3'>{task.description}</p>
                <div className='w-full flex justify-center mt-4'>
                    {task.completed ? <div className='py-2 px-5 rounded-lg bg-green-600/10 text-green-600 text-sm font-semibold'>completed</div> : task.type == "profile" ? <Link href="/dashboard/settings" className='py-2 px-5 rounded-lg bg-foreground text-background text-sm font-semibold flex space-x-1 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                        </svg>
                        <span>Go to settings</span>
                    </Link> : task.type == "poll" ? <Link href="/create" className='py-[6px] px-5 rounded-lg bg-foreground text-background text-sm font-semibold flex space-x-1 items-center'>
                        <span>Create now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </Link> : task.type == "video" ? <div className='relative'><HeroVideoDialog className="block" animationStyle="from-center" videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb" thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png" thumbnailAlt="Hero Video" /></div> : task.type == "referral" ? <button type='button' className='py-[8px] px-5 rounded-lg bg-foreground text-background text-sm font-semibold flex space-x-1 items-center' onClick={() => handleCopy(`${process.env.NEXT_PUBLIC_ROOTURL}/signup?ref=${userid}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                        </svg>
                        <span>Get referral link</span>
                    </button> : <div className='py-2 px-5 rounded-lg bg-yellow-600/10 text-yellow-600 text-sm font-semibold'>Uncompleted</div>}
                </div>
            </MagicCard>
        </div>
    )
}

export default TaskCard