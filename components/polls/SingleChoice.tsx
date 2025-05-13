"use client"

import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from 'sonner'
import { motion } from 'motion/react'
// import axios from "axios"
import { useExploreVote, useVote } from '@/hooks/vote'
import { milestones } from '@/lib/data/clientMockData'
import { ShineBorder } from '../magicui/shine-border'
import Link from 'next/link'
// import { CldImage } from 'next-cloudinary';
import Image from 'next/image'

type Props = {
    data: {
        id: string,
        question: string,
        description: string | null,
        duration: number,
        active: boolean,
        permission: string,
        private: string,
        show_result: string,
        budget: number,
        media: string | null,
        media_url: string | null,
        credit_per_vote: number,
        action: boolean,
        action_goal: string | null,
        action_title: string | null,
        action_description: string | null,
        waitlist_purpose: string | null,
        checkout: { platform: string, url: string } | null,
        created_at: string,
        creator?: TOwner | null,
        options: Array<TOptions>,
        total_votes: number,
        total_registered_votes: number,
        total_anonymous_votes: number,
        expired?: boolean,
        user_has_voted: boolean,
        selected_option_id: string | null
    },
    bulk: boolean;
    user: string;
    validUser: boolean;
    openForm: () => void;
    openWaitList: (poll_id: string, title?: string, description?: string) => void;
    openPreSale: (url: string, title?: string, description?: string) => void;
}

type TOwner = {
    id: string,
    dp: string,
    fullname: string,
    username: string,
    email: string,
    verified: boolean,
    achievement?: Array<string>
}

type TOptions = {
    id: string,
    text: string,
    trigger: boolean,
    image?: string | null,
    votes: Array<string | null>,
    total_votes: number,
    registered_votes: number,
    anonymous_votes: number,
    user_voted: boolean
}

// const showResult = true;

const SingleChoice = ({ data, bulk, user, validUser, openForm, openWaitList, openPreSale }: Props) => {
    const [ choice, setChoice ] = useState<string | null>(data.selected_option_id || null);
    const { mutate: pollVote } = useVote(data.id);
    const { mutate: exploreVote } = useExploreVote();
    const [ showResult, setShowResult ] = useState<boolean>(data.show_result == "before" ? true : data.user_has_voted ? true : false)
    const mileStones = [ 99, 199, 499, 999, 1999, 4999, 9999, 99999 ]

    const handleVote = async() => {
        let isReady: boolean = false;
        let award: string | null = null;
        let achieved: boolean = false;
        let token: number = 0;
        let sponsored: number = 0;
        const triggerValue = data.options.find((option: TOptions) => option.id === choice?.trim())?.trigger;

        if (choice?.trim() == null) {
            toast.error("No option was selected!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (validUser == false) {
            openForm()
            return
        }

        if (data.user_has_voted) {
            toast.error("You've already voted 🤣!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (data.permission == "users" && !user) {
            toast.error("Poll strictly for registered users!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (user && user == data.creator?.id) {
            toast.error("You can't participate on your poll!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (user && (data.budget - data.credit_per_vote) > 0) {
            sponsored = data.credit_per_vote
        }

        if (!showResult) {
            setShowResult(true)
        }

        isReady = mileStones.includes(data.total_registered_votes)
        if (isReady) {
            award = `${data.total_registered_votes+1}v`
            achieved = data.creator?.achievement?.includes(`${data.total_registered_votes+1}v`) as boolean;
            const index = milestones.findIndex(item => item.type == award)
            token = milestones[index].reward;
            console.log(index);
        }

        if (bulk) {
            exploreVote({ pollId: data.id, optionId: choice, eligible: achieved ? null : award, creator: data.creator?.id ? data.creator.id : null, reward: achieved ? 0 : token, sponsored });

            if (user && sponsored > 0) {
                toast.info(`You just earned ${sponsored} credit!`, {
                    className: "dark:!bg-green-600 dark:!text-white"
                })
            }

            if (triggerValue && data.action && data.action_goal == "wait-list") {
                setTimeout(() => {
                    openWaitList(data.id, data.action_title as string, data.action_description as string)
                }, 1000);
                return;
            }
    
            if (triggerValue && data.action && data.action_goal == "pre-orders") {
                setTimeout(() => {
                    openPreSale(data.checkout?.url as string, data.action_title as string, data.action_description as string)
                }, 1000);
                return;
            }

        } else {
            pollVote({ pollId: data.id, optionId: choice, eligible: achieved ? null : award, creator: data.creator?.id ? data.creator.id : null, reward: token, sponsored })
            if (sponsored > 0) {
                if (user) {
                    toast.info(`🔶 You just earned ${sponsored} credit!`, {
                        className: "dark:!bg-green-600 dark:!text-white"
                    })
                }

                if (triggerValue && data.action && data.action_goal == "wait-list") {
                    setTimeout(() => {
                        openWaitList(data.id, data.action_title as string, data.action_description as string)
                    }, 1000);
                    return;
                }
        
                if (triggerValue && data.action && data.action_goal == "pre-orders") {
                    setTimeout(() => {
                        openPreSale(data.checkout?.url as string, data.action_title as string, data.action_description as string)
                    }, 1000);
                    return;
                }

            } else {
                if (triggerValue && data.action && data.action_goal == "wait-list") {
                    setTimeout(() => {
                        openWaitList(data.id, data.action_title as string, data.action_description as string)
                    }, 1000);
                    return;
                }
        
                if (triggerValue && data.action && data.action_goal == "pre-orders") {
                    setTimeout(() => {
                        openPreSale(data.checkout?.url as string, data.action_title as string, data.action_description as string)
                    }, 1000);
                    return;
                }

                toast.success("You have voted successfully!", {
                    className: "dark:!bg-green-600 dark:!text-white"
                })

            }
        }
    }

    return (
        <div className="relative border dark:border dark:border-foreground/30 bg-[#f3f3f3] dark:bg-[#0c0c0c] rounded-md py-10 lg:py-16 px-2 lg:px-5">
            {data.budget > 0 ? <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} /> : null}
            <div className='flex w-full justify-end mb-5'>
                <button type='button' className='w-10 h-10 flex justify-center items-center bg-border dark:bg-[#404040] rounded-full' onClick={() => {}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {/* {data.creator ? <div className='flex items-center space-x-1 mb-2'>
                <span className="text-[10px] ml-2 text-foreground/60">By {data.creator.fullname}</span>
                {data ? data.creator.verified ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-blue-500">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg> : null : null}
            </div> : null} */}
            <Link href={`${process.env.NEXT_PUBLIC_ROOTURL}/poll/${data.id}`} className='font-semibold text-2xl lg:text-4xl !leading-snug'>{data.question}</Link>
            {data.description ? <p className='text-sm lg:text-base mt-3 lg:mt-3 !leading-snug ml-2 text-foreground/60'>{data.description}</p> : null}
            {data.media ? 
                data.media == "photo" ? <div className="w-full mt-5">
                <Image
                src={data.media_url as string}
                width={500}
                height={400}
                className="w-full h-auto bg-muted rounded-lg"
                alt="poll_image"
                />
            </div> : 
            data.media == "youtube" ? <div className="w-full aspect-video bg-muted mt-5"><iframe
                    className="w-full h-full"
                    height={240}
                    src={data.media_url as string}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe></div> : null
                : null}
            <RadioGroup className='space-y-5 mt-10 lg:mt-14' value={choice as string} onValueChange={setChoice}>
                {data.options ? data.options.length > 0 ? data.options.map((option) => <label htmlFor={option.id} className='w-full flex items-center space-x-2 lg:space-x-3 cursor-pointer' key={option.id}>
                    {/* <div className={`min-w-9 lg:min-w-12 h-9 lg:h-12 border-2 border-primary rounded-full ${option.image ? 'flex items-center justify-center' : 'hidden'}`}>
                        {option.image ? <img src={option.image} alt={option.text} className='w-7 lg:w-10 h-7 lg:h-10 object-cover rounded-full' /> : null}
                    </div> */}
                    <div className='w-full space-y-1'>
                        <div className={`flex items-center ${!option.image ? 'mb-2' : null}`}>
                            <RadioGroupItem id={option.id} value={option.id} className={`w-5 h-5 ${option.user_voted ? "text-green-600 border-green-600" : "text-primary border-primary"} mr-2 ${option.image ? "hidden" : null}`} disabled={data.user_has_voted}  />
                            <p className='text-sm'>{option.text}</p>
                        </div>
                        <div className={`w-[100%] h-5 lg:h-6 bg-border dark:bg-[#404040] rounded-xl overflow-hidden ${!showResult ? "hidden" : null} relative`}>
                            <p className='text-[8px] text-center absolute right-[40%] top-[18%] lg:top-[20%]'>{`${option.total_votes < 1 ? 0 : ((option.total_votes/data.total_votes)*100).toFixed(0)}% (${option.total_votes} votes)`}</p>
                            <motion.div style={{ width: 0}} animate={{width: `${option.total_votes < 1 ? 0 : ((option.total_votes/data.total_votes)*100).toFixed(0)}%`}} transition={{ duration: 1, ease: 'easeInOut' }} className={`h-5 lg:h-6 ${option.user_voted ? "bg-green-600" : "bg-primary"} rounded-xl flex items-center justify-center`}></motion.div>
                        </div>
                        {/* <p className='text-end text-[10px] text-gray-700'>185 votes</p> */}
                    </div>
                </label>) : null :null}
            </RadioGroup>
            <div className='mt-7 w-full flex justify-between items-center'>
                <div className='text-xs text-foreground/80 font-semibold flex items-center space-x-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>{data.total_votes} votes</span>
                </div>
                <div className='space-x-2 flex items-center'>
                    {/* <button type="button" className='py-1 lg:py-2 px-3 rounded-md bg-gray-950 text-sm text-white flex items-center space-x-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                            <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clipRule="evenodd" />
                        </svg>
                        <span>comment</span>
                    </button> */}
                    {data.user_has_voted ? <button type="button" className='py-3 lg:py-3 px-5 lg:px-7 rounded-full bg-muted text-foreground text-xs flex items-center space-x-1'>
                        <span>voted 👍</span></button> : <button type="button" className='py-3 lg:py-3 px-5 lg:px-7 rounded-full bg-green-600 text-foreground text-xs flex items-center space-x-1' onClick={handleVote}>
                        <span>vote</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default SingleChoice