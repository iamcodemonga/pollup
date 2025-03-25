import React from 'react'
import { useFormStatus } from 'react-dom';
import MoonLoader from 'react-spinners/MoonLoader'

const EditProfileButton = () => {
    const { pending } = useFormStatus();

    return (
        <>
            <button type="submit" className='bg-primary py-3 lg:py-2 px-10 text-black rounded-md text-sm'>{pending ? "processing..." : "submit"}</button>
            {pending ? <div className='fixed bg-background/50 w-full h-full -top-6 left-0 flex items-center justify-center'>
                <MoonLoader color='white' size={30} loading={pending} /> 
            </div> : null}
        </>
    )
}

export default EditProfileButton