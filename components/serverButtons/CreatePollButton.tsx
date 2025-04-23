import React from 'react'
import { useFormStatus } from 'react-dom';
import MoonLoader from 'react-spinners/MoonLoader'

const CreatePollButton = () => {
    const { pending } = useFormStatus();

    return (
        <div className='w-full flex justify-center'>
            <button type="submit" className='bg-primary w-2/3 py-4 px-10 text-black rounded-md text-sm'>{pending ? "Uploading..." : "submit"}</button>
            {pending ? <div className='fixed bg-background/50 w-full h-full top-0 left-0 flex items-center justify-center'>
                <MoonLoader color='white' size={30} loading={pending} /> 
            </div> : null}
        </div>
    )
}

export default CreatePollButton