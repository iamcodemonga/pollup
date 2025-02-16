import Link from 'next/link'
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerTitle,
    DrawerHeader,
    DrawerTrigger,
  } from "@/components/ui/drawer"

const Navbar = () => {
    return (
        <nav className='w-full py-4 sticky top-0 left-0'>
            <div className='lg:hidden w-full flex justify-between items-center nav-sm'>
                <Link href={"/"} className='flex items-center font-bold text-2xl'>
                    <span className='text-red-500'>P</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-500">
                        <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                    </svg>
                    <span className='text-blue-500'>ll</span>
                    <span className='text-purple-500'>up</span>
                </Link>
                <Drawer>
                    <DrawerTrigger asChild>
                        <button type='button' className='flex space-x-1'>
                            <span>menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className='hidden'>Menu</DrawerTitle>
                        </DrawerHeader>
                       <div className='space-y-5 mb-5'>
                            <Link href={"/"} className='w-full flex justify-center text-2xl font-bold'>Home</Link>
                            <Link href={"/"} className='w-full flex justify-center text-md font-semibold text-slate-400'>Explore</Link>
                            <Link href={"/"} className='w-full flex justify-center text-md font-semibold text-slate-400'>Create Poll</Link>
                            <Link href={"/"} className='w-full flex justify-center text-md font-semibold text-slate-400'>Contact</Link>
                            <Link href={"/"} className='w-full flex justify-center text-md font-semibold text-slate-400'>About</Link>
                            <Link href={"/"} className='w-full flex justify-center text-md font-semibold text-slate-400'>Login</Link>
                       </div>
                       <DrawerFooter className='py-3 mb-10'>
                            <div className='w-full flex justify-center items-center'>
                                <div className='space-x-5'>
                                    <Link href={"/"} className='bg-blue-500 text-white py-3 px-8 rounded-md'>Sign up</Link>
                                </div>
                            </div>
                       </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
            <div className='hidden lg:flex w-full lg:justify-between lg:items-center nav-lg'>
                <div className='space-x-7 flex items-center'>
                    <Link href={"/"} className='flex items-center font-bold text-2xl'>
                        <span className='text-red-500'>P</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-500">
                            <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                        </svg>
                        <span className='text-blue-500'>llup</span>
                    </Link>
                    <Link href={"/"}>Explore</Link>
                    <Link href={"/"}>Create Poll</Link>
                    <a target='_blank' href="mailto:codemonga@gmail.com">Contact Us</a>
                    {/* <Link href={"/"}>About</Link> */}
                </div>
                <div className='space-x-5'>
                    <Link href={"/login"}>Login</Link>
                    <Link href={"/signup"} className='bg-blue-500 text-white py-2 px-4 rounded-md'>Sign up</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar