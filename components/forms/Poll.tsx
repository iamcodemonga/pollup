"use client"

import React, { FormEvent, useState } from 'react'
import { Switch } from '../ui/switch'
import { addPoll } from '@/actions'
import { toast } from 'sonner'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import CreatePollButton from '../serverButtons/CreatePollButton'

type Props = {
    user: string
}


const Poll = ({ user }: Props) => {

    const optionLimit = 5
    const [ question, setQuestion ] = useState<string>("");
    const [ titleCounter, setTitleCounter ] = useState<number>(70);
    const [ description, setDescription ] = useState<string>("");
    const [ descCounter, setDescCounter ] = useState<number>(150);
    const [ includeImage, setIncludeImage ] = useState<boolean>(false);
    const [ options, setOptions ] = useState<Array<{image:null, text:string}>>([{ image: null,  text: ""}, { image: null,  text: ""}]);
    const [ duration, setDuration ] = useState<string>(user ? "180" : "");
    const [ advanced, setAdvanced ] = useState<boolean>(false);
    const [ permission, setPermission ] = useState<string>(user ? "users" : "all");
    const [ liveResult, setLiveResult ] = useState<string>("before");
    const [ privacy, setPrivacy ] = useState<boolean>(false);
    const [ sponsored, setSponsored ] = useState<boolean>(false);

    const handleQuestion = (text: string) => {
        if (text.length > 70) {
            return;
        }
        setQuestion(text);
        setTitleCounter(70-text.length)
        return;
    }

    const handleDescription = (text: string) => {
        if (text.length > 150) {
            return;
        }
        setDescription(text);
        setDescCounter(150-text.length)
        return;
    }

    const handleOption = (index: number, params: { image: null, text: string }) => {
        if (params.text.length > 30) {
            return;
        }
        const updatedOptions = [...options];
        updatedOptions[index] = { ...params };
        setOptions(updatedOptions);
    }

    const handleDuration = (range: string) => {
        if ((Number(range) && Number(range) <= 365) || range == "") {
            setDuration(range.trim())
            return;
        }
        return;
    }

    const addOption = () => {
        if (options.length >= optionLimit) {
            return;
        }
        setOptions([...options, { image: null, text: ""}]);
    };

    const removeOption = (index: number) => {
        const updatedInputs = options.filter((_, i) => i !== index);
        setOptions(updatedInputs);
    };

    const handleIncludeImage = () => {
        setIncludeImage(prev => !prev)
        return;
    }

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        if (question.trim() == "") {
            toast.error("Write a poll question!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (options.some((option) => option.text.trim() === "")) {
            toast.error("Please fill in all options!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (Number(duration) < 1) {
            toast.error("Add poll duration!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        const result = await addPoll({ question, description, duration: Number(duration), options, privacy, permission, show_result: liveResult })
        if (result?.error) {
            alert(result?.error)
            return;
        }

        toast.success("Poll created successfully!", {
            className: "dark:!bg-green-600 dark:!text-white"
        })
        return;
    }

    return (
        <form onSubmit={handleSubmit} className="w-full lg:w-[700px] space-y-7 bg-muted dark:bg-background border px-2 lg:px-10 py-20 rounded-lg">
            <div id="title">
                <div className='flex items-center justify-between mb-1'>
                    <label htmlFor="question" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Question</label>
                    <p className='text-[10px] mr-2 text-foreground/80'>{titleCounter}</p>
                </div>
                <input type="text" name="question" id="question" placeholder='Ask a question' className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={question} onChange={(e) => handleQuestion(e.target.value)} />
            </div>
            <div id="description">
                <div className='flex items-center justify-between mb-1'>
                    <label htmlFor="description" className='block text-xs text-gray-500 dark:text-gray-300 mb-1 ml-1'>Description(optional)</label>
                    <p className='text-[10px] mr-2 text-foreground/80'>{descCounter}</p>
                </div>
                <textarea name="description" id="description" placeholder='Short note on the question' className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={description} onChange={(e) => handleDescription(e.target.value)} rows={3}></textarea>
            </div>
            <div id="options">
                <div className="w-full flex justify-between items-center mb-1 ml-1">
                    <label htmlFor="" className='block text-xs text-gray-500 dark:text-gray-300'>Answer Options</label>
                    <div className="flex items-center space-x-2 hidden">
                        <input type="checkbox" name="include-image" id="include-image" checked={includeImage} className='border-2' onChange={handleIncludeImage} />
                        <label htmlFor="include-image" className='block text-xs text-gray-500 dark:text-gray-300'>Include image</label>
                    </div>
                </div>
                {options.map((option, index) => <div className="w-full flex items-center mb-2 relative" key={index}>
                    {includeImage ? <div className="mr-2">
                        <label htmlFor={`image${index+1}`} className='block text-xs text-gray-500 cursor-pointer border border-gray-500 rounded-md'>
                            {!option.image ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 my-[11.5px] lg:my-[8px] mx-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg> : <img src="https://images.pexels.com/photos/8553864/pexels-photo-8553864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="w-12 h-9 rounded-md object-cover" />}
                        </label>
                        <input type="file" name={`image${index+1}`} id={`image${index+1}`} className="hidden" />
                    </div> : null}
                    <input type="text" name={`option${index+1}`} id={`option${index+1}`} placeholder={`Option ${index+1}`} className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent transition-all' value={option.text} onChange={(e) => handleOption(index, { image: option.image, text:e.target.value})} />
                    <div className={`${index <= 1 ? "hidden absolute right-0" : "absolute right-0"}`}>
                        <button type="button" className='block text-xs text-gray-500 cursor-pointer borde border-gray-500 rounded-md' onClick={() => removeOption(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 my-[8px] mx-2 text-red-600">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                            </svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 my-[8px] mx-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg> */}
                        </button>
                    </div>
                </div>)}
                {options.length < optionLimit ? <button type="button" className="border border-muted bg-gray-200 dark:bg-muted rounded-md lg:py-2 py-3 w-full flex justify-center items-center text-sm" onClick={addOption}>
                    <div className="flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>Add option</span>
                    </div>
                </button> : null}
            </div>
            <div id="duration" className={user ? "hidden" : ""}>
                <label htmlFor="duration" className='block text-xs text-gray-500 dark:text-gray-300 mb-1 ml-1'>Poll duration(In days)</label>
                <input type="text" name="duration" id="duration" placeholder='Add duration in days' className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={duration} onChange={(e) => handleDuration(e.target.value)} />
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className=''>
                    <button type='button' className='flex items-center space-x-1' onClick={() => setAdvanced(prev => !prev)}>
                        <span>Advanced settings</span>
                        {advanced ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>}
                    </button>
                </div>
            </div>
            <div id="settings" className={`${advanced ? "" : "hidden"}`}>
                <div className="mb-5">
                    <div className='mb-1 flex items-center space-x-1'>
                        <label htmlFor="permission" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Permitted voters</label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type='button'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500 dark:text-gray-500">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className='bg-foreground w-80'>
                                    <p className='mb-2 text-background'>Who is permitted to vote on this poll? Is it everybody or the registered users?</p>
                                    <p className='text-background'><strong>N/B:</strong> You will get accurate user demographics if you go for the registered users.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <select name="permission" id="permission" value={permission} className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' onChange={(e) => setPermission(e.target.value)}>
                        <option value="all">Everyone</option>
                        <option value="users">Registered users</option>
                    </select>
                </div>
                <div className="mb-5">
                    <div className='mb-1 flex items-center space-x-1'>
                        <label htmlFor="result-visibility" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Show result</label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type='button'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500 dark:text-gray-500">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className='bg-foreground w-80'>
                                    <p className='mb-2 text-background'>Decide whether you want to show the polling results before or after the user votes!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <select name="result-visibility" id="result-visibility" value={liveResult} className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' onChange={(e) => setLiveResult(e.target.value)}>
                        <option value="before">Before voting</option>
                        <option value="after">After voting</option>
                    </select>
                </div>
                <div className="w-full flex justify-between items-center mb-5 px-3 bg-gray-200 dark:bg-muted py-5 rounded-lg">
                    <div className='flex items-center space-x-1'>
                        <label htmlFor="private">Private</label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type='button'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500 dark:text-gray-500">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className='bg-foreground w-80'>
                                    <p className='mb-2 text-background'>Private polls are only available to those you share the link with! These polls cannot be found on the Explore page.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Switch id="private" checked={privacy} onCheckedChange={setPrivacy} />
                </div>
                <div className="mb-5 hidden bg-gray-200 dark:bg-muted rounded-lg">
                    <div className="w-full flex justify-between items-center mb-2 px-3 py-5">
                        <label htmlFor="sponsored">Sponsored</label>
                        <Switch id="sponsored" checked={sponsored} onCheckedChange={setSponsored}  />
                    </div>
                    <div className={`${sponsored ? "px-3 pb-7 space-y-5" : "hidden"}`}>
                        <div>
                            <div className='mb-1 flex items-center space-x-1'>
                                <label htmlFor="pattern" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Type</label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button type='button'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500 dark:text-gray-500">
                                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-foreground w-80'>
                                            <p className='mb-2 text-background'>The type of sponsorship!</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <select name="pattern" id="pattern" value={"early"} className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' onChange={() => {}}>
                                <option value="early">Early birds</option>
                                <option value="share">Fair share</option>
                            </select>
                        </div>
                        <div>
                            <div className='mb-1 flex items-center space-x-1'>
                                <label htmlFor="budget" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Budget</label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button type='button'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500 dark:text-gray-500">
                                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-foreground w-80'>
                                            <p className='mb-2 text-background'>What is you campaign budget?</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <input type="text" name="budget" id="budget" placeholder='Add Budget' className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={""} onChange={() => {}} />
                        </div>
                        <div>
                            <div className='mb-1 flex items-center space-x-1'>
                                <label htmlFor="reward" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Reward Per Voter</label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button type='button'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-500 dark:text-gray-500">
                                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-foreground w-80'>
                                            <p className='mb-2 text-background'>What is the reward per voter?</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <input type="text" name="reward" id="reward" placeholder='Reward per voter' className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={""} onChange={() => {}} />
                        </div>
                    </div>
                </div>
            </div>
            <CreatePollButton />
        </form>
    )
}

export default Poll