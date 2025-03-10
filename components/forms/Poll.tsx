"use client"

import React, { useState } from 'react'
import { Switch } from '../ui/switch'
import { addPoll } from '@/actions'
import { toast } from 'sonner'


const Poll = () => {

    const optionLimit = 5
    const [ question, setQuestion ] = useState<string>("");
    const [ duration, setDuration ] = useState<string>("");
    const [ includeImage, setIncludeImage ] = useState<boolean>(false);
    const [ options, setOptions ] = useState<Array<{image:null, text:string}>>([{ image: null,  text: ""}, { image: null,  text: ""}]);

    const handleQuestion = (text: string) => {
        if (text.length > 50) {
            return;
        }
        setQuestion(text);
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

    const handleSubmit = async() => {
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

        const result = await addPoll({ question, duration: Number(duration), options })
        if (result?.error) {
            alert(result?.error)
            return;
        }
        return;
    }

    return (
        <form action={async () => await handleSubmit()} className="w-full lg:w-[500px] space-y-6">
            <div id="title">
                <label htmlFor="question" className='block text-xs text-gray-500 dark:text-gray-300 mb-1 ml-1'>Question</label>
                <input type="text" name="question" id="question" placeholder='Ask a question' className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={question} onChange={(e) => handleQuestion(e.target.value)} />
            </div>
            <div id="type" className="hidden">
                <label htmlFor="type" className='block text-xs text-gray-500 dark:text-gray-300 mb-1 ml-1'>Poll type</label>
                <div className="px-2 py-[8px] border-[1px] rounded-md border-gray-500 w-full">
                    <select name="type" id="type" className='text-sm w-full bg-transparent outline-none'>
                        <option value="single">Single Choice</option>
                        <option value="multiple">Multiple Choice</option>
                    </select>
                </div>
            </div>
            <div id="Options">
                <div className="w-full flex justify-between items-center mb-1 ml-1">
                    <label htmlFor="" className='block text-xs text-gray-500 dark:text-gray-300'>Answer Options</label>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" name="include-image" id="include-image" checked={includeImage} className='border-2' onChange={handleIncludeImage} />
                        <label htmlFor="include-image" className='block text-xs text-gray-500 dark:text-gray-300'>Include image</label>
                    </div>
                </div>
                {options.map((option, index) => <div className="w-full flex items-center mb-2 relative" key={index}>
                    {includeImage ? <div className="mr-2">
                        <label htmlFor={`image${index+1}`} className='block text-xs text-gray-500 cursor-pointer border border-gray-500 rounded-md'>
                            {!option.image ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 my-[8px] mx-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg> : <img src="https://images.pexels.com/photos/8553864/pexels-photo-8553864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="w-12 h-9 rounded-md object-cover" />}
                        </label>
                        <input type="file" name={`image${index+1}`} id={`image${index+1}`} className="hidden" />
                    </div> : null}
                    <input type="text" name={`option${index+1}`} id={`option${index+1}`} placeholder={`Option ${index+1}`} className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent transition-all' value={option.text} onChange={(e) => handleOption(index, { image: option.image, text:e.target.value})} />
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
                {options.length < optionLimit ? <button type="button" className="border border-muted bg-muted rounded-md py-2 w-full flex justify-center items-center text-sm" onClick={addOption}>
                    <div className="flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>Add option</span>
                    </div>
                </button> : null}
            </div>
            <div id="duration">
                <label htmlFor="duration" className='block text-xs text-gray-500 dark:text-gray-300 mb-1 ml-1'>Poll duration(In days)</label>
                <input type="text" name="duration" id="duration" placeholder='Add duration in days' className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={duration} onChange={(e) => handleDuration(e.target.value)} />
            </div>
            <div id="settings">
                <div className="w-full flex justify-between items-center mb-4">
                    <label htmlFor="anonymous">Anonymous votes</label>
                    <Switch id="anonymous" checked={false}  />
                </div>
                <div className="w-full flex justify-between items-center mb-4">
                    <label htmlFor="private">Private</label>
                    <Switch id="private" checked={true}  />
                </div>
                <div className="w-full flex justify-between items-center mb-4">
                    <label htmlFor="comments">Allow comments</label>
                    <Switch id="comments" checked={false}  />
                </div>
                <div className="mb-5">
                    <div className="w-full flex justify-between items-center mb-4">
                        <label htmlFor="sponsored">Sponsored</label>
                        <Switch id="sponsored" checked={false}  />
                    </div>
                    <input type="number" name="price" id="price" placeholder='Add Price' className='px-2 py-[8px] border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' />
                </div>
            </div>
            <button type="submit" className="py-3 w-full text-sm text-black rounded-md bg-primary">Submit</button>
        </form>
    )
}

export default Poll