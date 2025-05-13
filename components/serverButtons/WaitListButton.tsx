import React from 'react'
import { useFormStatus } from 'react-dom';
import MoonLoader from 'react-spinners/MoonLoader'


const WaitListButton = () => {
    const { pending } = useFormStatus();

    return (
        <>
            <button type="submit" className='py-3 lg:py-2 px-5 rounded-lg bg-green-600 text-sm text-white outline-none'>{pending ? "Processing..." : "Continue"}</button>
            {pending ? <div className='fixed bg-background/50 w-full h-full -top-6 left-0 flex items-center justify-center'>
                <MoonLoader color='white' size={30} loading={pending} /> 
            </div> : null}
        </>
    )
}

export default WaitListButton