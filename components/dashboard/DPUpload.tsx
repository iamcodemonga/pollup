"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const DPUpload = ({ userid, dp, abbr }: { userid: string, dp: string | null, abbr: string }) => {
    const supabase = createClient()
    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');
    // const fileInputRef = useRef<HTMLInputElement>(null);
    const [ dpFile, setDpFile ] = useState<File | null>(null);
    const no_avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhslR_IBbWqq6aKDwSybRj5I7kZnEI5Rhd_g&s";

    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

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
        setDpFile(file)
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async() => {
        const filename = dpFile?.name as string;
        const extension = filename.substring(filename.lastIndexOf('.') + 1);
        // Start upload
        try {
            setStatus('uploading');
            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(`/photos/${userid}.${extension}`, dpFile as File);
        
            if (uploadError) throw uploadError;

            const url = `https://pmbwinktitlthtdlgimc.supabase.co/storage/v1/object/public/media/photos/${userid}.${extension}`;
            //update user database
            const { error } = await supabase
                .from("users")
                .update({ dp: url })
                .eq("id", userid)

            if (error) throw error

            setStatus('success');
            toast.success("Profile picture was uploaded!", {
                className: "dark:!bg-green-600 dark:!text-white"
            })
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            setStatus('error');
            toast.error('Upload failed. Please try again!', {
                className: "dark:!bg-red-600 dark:!text-white"
            })
            console.log('Upload error:', err);
        }
    }

    return (
        <form className='col-span-12 lg:col-span-12 border rounded-lg py-16 space-y-8' action="" method="post">
            <h3 className="text-center lg:font-bold text-xl px-3">Profile Photo/Logo</h3>
            <div className='w-full flex justify-center'>
                <Avatar className='flex flex-col justify-center items-center w-28 h-28 lg:w-36 lg:h-36'>
                    <AvatarImage src={preview ? preview : dp ? dp : no_avatar} className='object-cover' />
                    <AvatarFallback>{abbr.toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex items-center justify-center space-x-3 w-full'>
                <div className=''>
                    <label htmlFor="logofile" className='bg-muted py-[10px] px-5 rounded-md text-sm'>Select Image</label>
                    <input type="file" name="" id="logofile" className='hidden' onChange={(e) => handleFileSelect(e)} accept=".jpg, .jpeg, .png" />
                </div>
                <button type="button" className='bg-primary py-2 px-5 text-black rounded-md text-sm' onClick={handleUpload} disabled={dpFile == null ? true : status == "uploading" ? true : false}>{status == "uploading" ? "Uploading" : "Submit"}</button>
            </div>
            <p className="text-center text-slate-400 text-xs">Allowed JPG, PNG, JPEG. Max size of {MAX_SIZE_MB}MB</p>
        </form>
    )
}

export default DPUpload