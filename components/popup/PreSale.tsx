"use client"

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
 } from '../ui/dialog'
// import Link from 'next/link';

const PreSale = ({ title, description, url, open, handleStatus }: { title: string, description: string, url: string, open: boolean, handleStatus: () => void }) => {

    return (
        <Dialog open={open} onOpenChange={handleStatus}>
            <DialogContent className="max-w-80 sm:max-w-[425px] rounded-lg">
                <DialogHeader>
                    <DialogTitle className='text-2xl'>{title ? title : "Would you love to pre-order?"}</DialogTitle>
                    <DialogDescription className='!mt-3'>{description ? description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas aliquid at harum quasi natus"}</DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex justify-start'>
                    {url ? <a href={`${url}`} target='_blank' className='py-2 px-5 rounded-lg bg-green-600 text-sm text-white'>order now!</a> : <button type='button'>order now</button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
    
}

export default PreSale