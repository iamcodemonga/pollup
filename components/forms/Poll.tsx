"use client"

import React, { FormEvent, useEffect, useState } from 'react'
import { Switch } from '../ui/switch'
// import { addPoll } from '@/actions'
import { toast } from 'sonner'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
// import CreatePollButton from '../serverButtons/CreatePollButton'
import { tasks } from '@/lib/data/clientMockData'
import { Checkbox } from '../ui/checkbox'
import axios from 'axios'
import MoonLoader from 'react-spinners/MoonLoader'
import { useRouter } from 'next/navigation';

type Props = {
    user: string
    eligible: boolean
    balance?: number
}


const Poll = ({ user, eligible, balance }: Props) => {
    const router = useRouter();

    //Basic poll settings
    const [ question, setQuestion ] = useState<string>("");
    const [ titleCounter, setTitleCounter ] = useState<number>(70);
    const [ addDescription, setAddDescription ] = useState<boolean>(false);
    const [ description, setDescription ] = useState<string>("");
    const [ descCounter, setDescCounter ] = useState<number>(150);
    const [ includeImage, setIncludeImage ] = useState<boolean>(false);
    const [ options, setOptions ] = useState<Array<{image:null, text:string, trigger: boolean}>>([{ image: null,  text: "", trigger: true }, { image: null,  text: "", trigger: true }]);
    const optionLimit = 5

    //Advanced poll settings
    const [ advanced, setAdvanced ] = useState<boolean>(false);
    const [ duration, setDuration ] = useState<string>("3");
    const [ permission, setPermission ] = useState<string>(user ? "users" : "all");
    const [ liveResult, setLiveResult ] = useState<string>("before");
    const [ privacy, setPrivacy ] = useState<boolean>(false);

    // sponsorship settings
    const [ sponsored, setSponsored ] = useState<boolean>(false);
    const [budget, setBudget] = useState<number>(10000);
    const [creditsPerFan, setCreditsPerFan] = useState<number>(100);
    const [error, setError] = useState<string>('');
    const [distribution, setDistribution] = useState<{
        totalFans: number;
        totalDistributed: number;
        leftoverCredits: number;
    } | null>(null);

    // Visuals settings
    const [ visual, setVisual ] = useState<boolean>(false)
    const [ mediaType, setMediaType ] = useState<string>("youtube");
    const [ mediaFile, setMediaFile ] = useState<File | null>(null)
    const [ youtube, setYoutube ] = useState<string>("")
    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    // Post-vote Actions
    const [ action, setAction ] = useState<boolean>(false)
    const [ trigger, setTrigger ] = useState<boolean>(false)
    const [ goal, setGoal ] = useState<string>("wait-list")
    
    // WaitLists
    // const [ waitList, setWaitList ] = useState<boolean>(false)
    const [ waitTitleCounter, setWaitTitleCounter ] = useState<number>(30);
    const [ waitNoteCounter, setWaitNoteCounter ] = useState<number>(100);
    const [ waitList_title, setWaitList_title ] = useState<string>("")
    const [ waitList_note, setWaitList_note ] = useState<string>("")
    const [ purpose, setPurpose ] = useState<string>("product launch")
    // Pre-orders
    const [ preOrderTitleCounter, setPreOrderTitleCounter ] = useState<number>(30);
    const [ preOrderNoteCounter, setPreOrderNoteCounter ] = useState<number>(100);
    const [ preOrder_title, setPreOrder_title ] = useState<string>("")
    const [ preOrder_note, setPreOrder_note ] = useState<string>("")
    const [ checkOutPlatForm, setCheckOutPlatForm ] = useState<string>("stripe")
    const [ checkOutLink, setCheckOutLink ] = useState<string>("")
    const [ loading, setLoading ] = useState<boolean>(false)

    useEffect(() => {
        validateAndCalculate();
    }, [budget, creditsPerFan]);

    const validateAndCalculate = () => {
        setError('');
        const errors: string[] = [];

        if ((balance as number) < budget) {
            errors.push("You don't have enough credit!");
        }
    
        if (Number(budget) < 10000) {
            errors.push('Minimum budget is 10,000 credits');
        }

        if (!Number.isInteger(budget)) {
            errors.push('Budget must be a whole number');
        }

        if (Number(creditsPerFan) < 100) {
            errors.push('Minimum of 100 credits per vote');
        }

        if (!Number.isInteger(creditsPerFan)) {
            errors.push('Credits per vote must be a whole number');
        }
        
        const maxAllowedPerFan = Number(budget) / 100;
        if (Number(creditsPerFan) > maxAllowedPerFan && maxAllowedPerFan >= 100) {
            errors.push(`Maximum allowed credits per vote: ${Math.floor(maxAllowedPerFan)}`);
        }
    
        if (errors.length > 0) {
          setError(errors.join(' • '));
          setDistribution(null);
          return;
        }
    
        const totalFans = Math.floor(Number(budget) / Number(creditsPerFan));
        const totalDistributed = Number(creditsPerFan) * totalFans;
        const leftoverCredits = Number(budget) - totalDistributed;
    
        setDistribution({
          totalFans,
          totalDistributed,
          leftoverCredits
        });
    };

    //Basic functions
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

    const handleAddDescription = () => {
        setAddDescription(prev => !prev)
        return;
    }

    const handleOption = (index: number, params: { image: null, text: string, trigger: boolean }) => {
        if (params.text.length > 30) {
            return;
        }
        const updatedOptions = [...options];
        updatedOptions[index] = { ...params };
        setOptions(updatedOptions);
    }

    const addOption = () => {
        if (options.length >= optionLimit) {
            return;
        }
        setOptions([...options, { image: null, text: "", trigger: true }]);
    };

    const removeOption = (index: number) => {
        const updatedInputs = options.filter((_, i) => i !== index);
        setOptions(updatedInputs);
    };

    const handleIncludeImage = () => {
        setIncludeImage(prev => !prev)
        return;
    }

    const handleDuration = (range: string) => {
        if ((Number(range) && Number(range) <= 365) || range == "") {
            setDuration(range.trim())
            return;
        }
        return;
    }

    // Sponsorship functions
    const handleSetBudget = (money: string) => {
        if (Number(money) || Number(money) == 0) {
            setBudget(Number(money))
            return;
        }
        return;
    }

    const handleSetCreditPerVote = (money: string) => {
        if (Number(money) || Number(money) == 0) {
            setCreditsPerFan(Number(money))
            return;
        }
        return;
    }
    
    // Visual function
    const extractYouTubeVideoId = (url: string): string | null => {
        const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
    
        if (match && match[1]) {
            console.log(match[1]);
            
          return match[1];
        }
    
        return null;
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        
        if (!file) return;
    
        // Validate file type and size
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file!', {
                className: "dark:!bg-red-600 dark:!text-white"
            })
          return;
        }

        if (!allowedTypes.includes(file.type)) {
            toast.error('Only JPG, JPEG, and PNG images are allowed!', {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }
    
        if (file.size > MAX_SIZE_BYTES) {
            toast.error(`File size exceeds ${MAX_SIZE_MB}MB limit`, {
                className: "dark:!bg-red-600 dark:!text-white"
            })
          return;
        }
    
        // Create preview
        setMediaFile(file)
        // setPreview(URL.createObjectURL(file));
    };

    const handleFileUpload = async() => {
        if (!mediaFile) {
            toast.error('No photo selected!', {
                className: "dark:!bg-red-600 dark:!text-white"
            })
          return;
        };

        const formData = new FormData();
        formData.append('file', mediaFile as File);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ROOTURL}/api/upload`, { method: 'POST', body: formData})

            const result = await response.json();
            if (result.success) {
                return result.url;
            } else {
                toast.error('Error uploading photo!', {
                    className: "dark:!bg-red-600 dark:!text-white"
                })
                throw new Error("Error uploading photo")
            }
        } catch (error) {
            console.log(error);
            toast.error('Error uploading photo!', {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }
    }

    // WaitList functions
    const handleWaitListTitle = (text: string) => {
        if (text.length > 30) {
            return;
        }
        setWaitList_title(text);
        setWaitTitleCounter(30-text.length)
        return;
    }

    const handleWaitListNote = (text: string) => {
        if (text.length > 100) {
            return;
        }
        setWaitList_note(text);
        setWaitNoteCounter(100-text.length)
        return;
    }

    const handleSetTrigger = async(status: boolean, text: string) => {
        setOptions((prev) => {
            return prev.map(opt => opt.text == text ? { ...opt, trigger: !opt.trigger} : opt)
        })
        return;
    }

    // Pre-order functions
    const handlePreOrderTitle = (text: string) => {
        if (text.length > 30) {
            return;
        }
        setPreOrder_title(text);
        setPreOrderTitleCounter(30-text.length)
        return;
    }

    const handlePreOrderNote = (text: string) => {
        if (text.length > 100) {
            return;
        }
        setPreOrder_note(text);
        setPreOrderNoteCounter(100-text.length)
        return;
    }
      
    const isValidLink = (platform: string, urlString: string): boolean => {
        try {
          const url = new URL(urlString);
          const host = url.hostname;
          const path = url.pathname;

          if (url.protocol == "http:") {
            return false;
          }
      
          if (platform === "stripe") {
            return host === "checkout.stripe.com" && path.startsWith("/pay/");
          }
      
          if (platform === "gumroad") {
            return host.endsWith("gumroad.com") && path.startsWith("/l/");
          }
      
          if (platform === "lemonSqueezy") {
            return host.endsWith("lemonsqueezy.com") && path.includes("/checkout/");
          }
      
          if (platform === "payhip") {
            return host === "payhip.com" && path.startsWith("/b/");
          }
      
          if (platform === "shopify") {
            return host.endsWith(".myshopify.com") && path.includes("/products/");
          }
      
          return false;
        } catch {
          return false;
        }
    }

    // submit function
    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        let file_url: string | null = null;
        const extractedVideoId = extractYouTubeVideoId(youtube);
        let youtube_url: string | null = null;

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

        if (visual && mediaType == "youtube" && !youtube) {
            toast.error("Add youtube video link!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (visual && mediaType == "youtube" && !extractedVideoId) {
            toast.error("Invalid youtube video!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return
        }

        if (visual && mediaType == "youtube" && extractedVideoId) {
            youtube_url = `https://www.youtube.com/embed/${extractedVideoId}` as string;
        }

        if (visual && mediaType == "photo" && !mediaFile) {
            toast.error("Select a photo for your poll!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        if (action && goal == "pre-orders") {
            const valid = isValidLink(checkOutPlatForm, checkOutLink)
            if (!checkOutLink.trim()) {
                toast.error(`Please fill in your ${checkOutPlatForm} checkout link!`, {
                    className: "dark:!bg-red-600 dark:!text-white"
                })
                return;
            }

            if (valid == false) {
                toast.error(`Invalid ${checkOutPlatForm} checkout link`, {
                    className: "dark:!bg-red-600 dark:!text-white"
                })
                return;
            }
        }

        if (sponsored && error) {
            toast.error(error.split(' • ')[0], {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            return;
        }

        setLoading(true)
        try {
            if (visual && mediaType=="photo" && mediaFile) {
                file_url = await handleFileUpload();
            }

            const { data: result } = await axios.post(`${process.env.NEXT_PUBLIC_ROOTURL}/api/polls`, { question: question.trim(), description: description.trim(), duration: Number(duration), options, privacy, permission, show_result: liveResult, eligible: eligible, reward: tasks[3].reward, budget: (sponsored ? budget : 0), credit_per_vote: (sponsored ? creditsPerFan : 0), media: (visual ? mediaType : null), media_url: (visual ? mediaType == "photo" ? file_url : youtube_url : null), action, action_goal: (action ? goal : null), action_title: (action ? goal == "wait-list" ? waitList_title : goal == "pre-orders" ? preOrder_title : null : null), action_description: (action ? goal == "wait-list" ? waitList_note : goal == "pre-orders" ? preOrder_note : null : null), waitlist_purpose: (action ? goal == "wait-list" ? purpose : null : null), checkout: (action ? goal == "pre-orders" ? { platform: checkOutPlatForm, url: checkOutLink} : null : null) })

            if (result.status == "failed") {
                toast.error(result.message, {
                    className: "dark:!bg-red-600 dark:!text-white"
                })
                setLoading(false)
                return
            }

            toast.success(result.message, {
                className: "dark:!bg-green-600 dark:!text-white"
            })
            setLoading(false)
            router.push(`/poll/${result.id}`);
            return;
        } catch (error) {
            console.log(error);
            toast.error("Network Error!", {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            setLoading(false)
            return
        }
        
        // const result = await addPoll({ question: question.trim(), description: description.trim(), duration: Number(duration), options, privacy, permission, show_result: liveResult, eligible: eligible, reward: tasks[3].reward, budget: (sponsored ? budget : 0), credit_per_vote: (sponsored ? creditsPerFan : 0), media: (visual ? mediaType : null), media_url: (visual ? mediaType == "photo" ? file_url : youtube_url : null), action, action_goal: (action ? goal : null), action_title: (action ? goal == "wait-list" ? waitList_title : goal == "pre-orders" ? preOrder_title : null : null), action_description: (action ? goal == "wait-list" ? waitList_note : goal == "pre-orders" ? preOrder_note : null : null), waitlist_purpose: (action ? goal == "wait-list" ? purpose : null : null), checkout: (action ? goal == "pre-orders" ? { platform: checkOutPlatForm, url: checkOutLink} : null : null) })
        // if (result?.error) {
        //     alert(result?.error)
        //     return;
        // }

    }

    return (
        // <form action={async () => await handleSubmit()}  className="w-full lg:w-[700px] space-y-7 bg-muted dark:bg-background border px-2 lg:px-10 pt-16 pb-20 rounded-lg">
        <form onSubmit={(e) => handleSubmit(e)}  className="w-full lg:w-[700px] space-y-7 bg-muted dark:bg-background border px-2 lg:px-10 pt-16 pb-20 rounded-lg">
            <div id="title">
                <div className='flex items-center justify-between mb-1'>
                    <label htmlFor="question" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Question</label>
                    <p className='text-[10px] mr-2 text-foreground/80'>{titleCounter}</p>
                </div>
                <input type="text" name="question" id="question" placeholder='Ask a question' className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={question} onChange={(e) => handleQuestion(e.target.value)} />
                <div className="flex items-center space-x-2 mt-2 ml-1">
                    <input type="checkbox" name="add_description" id="add_description" checked={addDescription} className='border-2' onChange={handleAddDescription} />
                    <label htmlFor="add_description" className='block text-xs text-gray-500 dark:text-gray-300'>Add description</label>
                </div>
            </div>
            {addDescription ? <div id="description">
                <div className='flex items-center justify-between mb-1'>
                    <label htmlFor="description" className='block text-xs text-gray-500 dark:text-gray-300 mb-1 ml-1'>Description(optional)</label>
                    <p className='text-[10px] mr-2 text-foreground/80'>{descCounter}</p>
                </div>
                <textarea name="description" id="description" placeholder='Short note on the question' className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={description} onChange={(e) => handleDescription(e.target.value)} rows={3}></textarea>
            </div> : null}
            <div id="options">
                <div className="w-full flex justify-between items-center mb-1 ml-1">
                    <label htmlFor="" className='block text-xs text-gray-500 dark:text-gray-300'>Answer Options</label>
                    <div className="items-center space-x-2 hidden">
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
                    <input type="text" name={`option${index+1}`} id={`option${index+1}`} placeholder={`Option ${index+1}`} className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent transition-all' value={option.text} onChange={(e) => handleOption(index, { image: option.image, text:e.target.value, trigger: option.trigger})} />
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
            {/* <div id="duration" className={user ? "hidden" : ""}> */}
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
                <div id="duration">
                    <label htmlFor="duration" className='block text-xs text-gray-500 dark:text-gray-300 mb-1 ml-1'>Poll duration(In days)</label>
                    <input type="text" name="duration" id="duration" placeholder='Add duration in days' className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={duration} onChange={(e) => handleDuration(e.target.value)} />
                </div>
                <div className="my-5 permitted-voters">
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
                <div className="mb-5 live-result">
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
                <div className="w-full flex justify-between items-center mb-5 px-3 bg-gray-200 dark:bg-muted py-5 rounded-lg privacy">
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
                <div className={`mb-5 bg-gray-200 dark:bg-muted rounded-lg visual ${user ? "" : "hidden"}`}>
                    <div className="w-full flex justify-between items-center mb-2 px-3 py-5">
                        <label htmlFor="visual">Add photo/video</label>
                        <Switch id="visual" checked={visual} onCheckedChange={setVisual}  />
                    </div>
                    <div className={`${visual ? "px-3 pb-8 space-y-5" : "hidden"}`}>
                        <div>
                            <div className='mb-1 flex items-center space-x-1'>
                                <label htmlFor="mediatype" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Media type</label>
                            </div>
                            <select name="mediatype" id="mediatype" value={mediaType} className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' onChange={(e) => setMediaType(e.target.value)}>
                                <option value="photo">Photo</option>
                                <option value="youtube">Youtube Video</option>
                            </select>
                        </div>
                        <div>
                            {mediaType == "youtube" &&  <div>
                                <div className='mb-1 flex items-center space-x-1'>
                                    <label htmlFor="youtube" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Youtube video link</label>
                                </div>
                                <input type="text" name="youtube" id="youtube" placeholder='e.g: https://youtube.com/embed/12345' className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={youtube} onChange={(e) => setYoutube(e.target.value)} />
                            </div>}
                            {mediaType == "photo" && <div>
                                <input type="file" name="mediafile" id="mediafile" placeholder='select photo' className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' accept='.jpg, .jpeg, .png, .gif' onChange={(e) => handleFileSelect(e)} />
                            </div>}
                        </div>
                    </div>
                </div>
                <div className={`mb-5 bg-gray-200 dark:bg-muted rounded-lg wait-list`}>
                    <div className="w-full flex justify-between items-center mb-2 px-3 py-5">
                        <label htmlFor="wait-list">Post-vote Action</label>
                        <Switch id="wait-list" checked={action} onCheckedChange={setAction} />
                    </div>
                    <div className={`${action ? "px-3 pb-8 space-y-5" : "hidden"}`}>
                        <div id='action-goal'>
                            <div className='mb-1 flex items-center space-x-1'>
                                <label htmlFor="goal" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Conversion goal</label>
                            </div>
                            <select name="goal" id="goal" value={goal} className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' onChange={(e) => setGoal(e.target.value)}>
                                <option value="wait-list">Build wait-list</option>
                                <option value="pre-orders">Get pre-orders</option>
                            </select>
                        </div>
                        <div id='trigger'>
                            <p className='mb-1 ml-1 text-xs text-gray-500 dark:text-gray-300'>Action trigger</p>
                            <button type="button" className='w-full border border-gray-500 py-[10px] rounded-md text-sm flex items-center justify-between px-2' onClick={() => setTrigger(prev => !prev)}>
                                <span className='text-gray-400'>Options that trigger post-vote action</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </button>
                            {trigger ? <div className='px-5 py-7 border border-gra-500 rounded-md w-full mt-3 space-y-7 bg-[#DCDCDC] dark:bg-[#383838]'>
                                {options ? options.map((option, index) => <div className="flex items-center space-x-2" key={index}>
                                    <Checkbox id={option.text} checked={option.trigger}  onCheckedChange={(e) => handleSetTrigger(e.valueOf() as boolean, option.text)} />
                                    <label htmlFor={option.text} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{option.text}</label>
                                </div>)  : null}
                            </div> : null}
                        </div>
                        {goal == "wait-list" ? <div id='wait-list-wrapper' className='space-y-5'>
                            <div id='wait-list-purpose'>
                                <div className='mb-1 flex items-center space-x-1'>
                                    <label htmlFor="purpose" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Wait-list Purpose</label>
                                </div>
                                <select name="purpose" id="purpose" value={purpose} className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' onChange={(e) => setPurpose(e.target.value)}>
                                    <option value="product launch">Product Launch</option>
                                    <option value="newsletter">Newsletter</option>
                                </select>
                            </div>
                            <div id="wait-list-title">
                                <div className='flex items-center justify-between mb-1'>
                                    <label htmlFor="waitList_title" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Title(optional)</label>
                                    <p className='text-[10px] mr-2 text-foreground/80'>{waitTitleCounter}</p>
                                </div>
                                <input type="text" name="waitList_title" id="waitList_title" placeholder={purpose == "product launch" ? 'e.g Enjoy Early Access' : purpose == "newsletter" ? "e.g Join Our Newsletter" : 'e.g Join Our Wait-list' } className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={waitList_title} onChange={(e) => handleWaitListTitle(e.target.value)} />
                            </div>
                            <div id="wait-list-description">
                                <div className='flex items-center justify-between mb-1'>
                                    <label htmlFor="wait-list-description" className='block text-xs text-gray-500 dark:text-gray-300 mb-1 ml-1'>Sub-title(optional)</label>
                                    <p className='text-[10px] mr-2 text-foreground/80'>{waitNoteCounter}</p>
                                </div>
                                <textarea name="wait-list-description" id="wait-list-description" placeholder='Write short note' className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={waitList_note} onChange={(e) => handleWaitListNote(e.target.value)} rows={2}></textarea>
                            </div>
                        </div> : <div id='pre-order-wrapper' className='space-y-5'>
                            <div id='pre-order-platform'>
                                <div className='mb-1 flex items-center space-x-1'>
                                    <label htmlFor="platform" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Checkout Platform</label>
                                </div>
                                <select name="platform" id="platform" value={checkOutPlatForm} className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' onChange={(e) => setCheckOutPlatForm(e.target.value)}>
                                    <option value="stripe">Stripe</option>
                                    <option value="gumroad">Gumroad</option>
                                    <option value="lemonsqueezy">Lemonsqueezy</option>
                                </select>
                            </div>
                            <div id="pre-order-link">
                                <div className='flex items-center justify-between mb-1'>
                                    <label htmlFor="pre-order_link" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Checkout Link</label>
                                </div>
                                <input type="text" name="pre-order_link" id="pre-order_link" placeholder={`Add ${checkOutPlatForm} checkout URL`} className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={checkOutLink} onChange={(e) => setCheckOutLink(e.target.value)} />
                            </div>
                            <div id="pre-order-title">
                                <div className='flex items-center justify-between mb-1'>
                                    <label htmlFor="pre-order_title" className='block text-xs text-gray-500 dark:text-gray-300 ml-1'>Title(optional)</label>
                                    <p className='text-[10px] mr-2 text-foreground/80'>{preOrderTitleCounter}</p>
                                </div>
                                <input type="text" name="pre-order_title" id="pre-order_title" placeholder="Make your order!" className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={preOrder_title} onChange={(e) => handlePreOrderTitle(e.target.value)} />
                            </div>
                            <div id="pre-order-description">
                                <div className='flex items-center justify-between mb-1'>
                                    <label htmlFor="pre-order-description" className='block text-xs text-gray-500 dark:text-gray-300 mb-1 ml-1'>Sub-title(optional)</label>
                                    <p className='text-[10px] mr-2 text-foreground/80'>{preOrderNoteCounter}</p>
                                </div>
                                <textarea name="pre-order-description" id="pre-order-description" placeholder='Write short note' className='px-2 lg:py-[10px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' value={preOrder_note} onChange={(e) => handlePreOrderNote(e.target.value)} rows={2}></textarea>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className={`mb-5 bg-gray-200 dark:bg-muted rounded-lg sponsorship ${user ? "" : "hidden"}`}>
                    <div className="w-full flex justify-between items-center mb-2 px-3 py-5">
                        <label htmlFor="sponsored">Sponsorship</label>
                        <Switch id="sponsored" checked={sponsored} onCheckedChange={setSponsored}  />
                    </div>
                    <div className={`${sponsored ? "px-3 pb-8 space-y-5" : "hidden"}`}>
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
                            <input type="text" name="budget" id="budget" placeholder='Add Budget' className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' min="10000" step="10" value={budget} onChange={(e) => handleSetBudget(e.target.value)} />
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
                            <input type="text" name="reward" id="reward" placeholder='Reward per voter' className='px-2 lg:py-[8px] py-3 border-[1px] rounded-md border-gray-500 text-sm w-full bg-transparent' min="100" step="10" value={creditsPerFan} onChange={(e) => handleSetCreditPerVote(e.target.value)} />
                        </div>
                        {error && (
                            <div className="p-3 bg-red-600 text-white dar:bg-red-50 dar:text-red-700 rounded-md text-sm space-y-2">
                                {error.split(' • ').map((msg, i) => (
                                <p key={i}>⚠️ {msg}</p>
                                ))}
                            </div>
                        )}
                        {distribution && (
                            <div className="p-4 bg-green-400/30 dark:bg-green-100 rounded-md">
                                <h3 className="text-sm font-semibold text-blue-800 mb-3">Distribution Plan</h3>
                                
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Expected Reapers(Earners):</span>
                                        <span className="ml-2 text-lg font-bold text-blue-600">
                                        {distribution.totalFans.toLocaleString()}
                                        </span>
                                    </div>
                                
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Total Distributed:</span>
                                        <span className="ml-2 text-lg font-bold text-green-600">
                                        {distribution.totalDistributed.toLocaleString()} credits
                                        </span>
                                    </div>

                                    {distribution.leftoverCredits > 0 && (
                                        <div className="bg-yellow-50 p-2 rounded-md">
                                        <span className="text-sm font-medium text-yellow-700">Leftover Credits:</span>
                                        <span className="ml-2 text-lg font-bold text-yellow-600">
                                            {distribution.leftoverCredits.toLocaleString()} credits
                                        </span>
                                        <p className="text-xs mt-1 text-yellow-700">
                                            Consider adjusting amounts to use all credits
                                        </p>
                                        </div>
                                    )}

                                    <p className="text-xs text-blue-700 mt-2">
                                        💡 Must benefit at least 100 participants with minimum 100 credits each
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <button type="submit" className='bg-primary w-full lg:w-2/3 py-4 px-10 text-black rounded-md text-sm'>{loading ? "Uploading..." : "submit"}</button>
                {loading ? <div className='fixed bg-background/50 w-full h-full top-0 left-0 flex items-center justify-center'>
                    <MoonLoader color='white' size={30} loading={loading} /> 
                </div> : null}
            </div>
            {/* <CreatePollButton /> */}
        </form>
    )
}

export default Poll