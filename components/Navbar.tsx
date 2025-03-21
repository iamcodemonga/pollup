"use client"

import Link from 'next/link'
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerTitle,
    DrawerHeader,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Separator } from './ui/separator'
import { Moon, Sun } from "lucide-react"
import { useTheme  } from 'next-themes'
import { usePathname } from 'next/navigation'

const Navbar = ({ user }: { user: string }) => {
    const { setTheme, theme } = useTheme()
    const pathname = usePathname()

    const handleToggleTheme = (mode: string) => {
        if (mode == "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
        return;
    }
    
    return (
        <nav className='w-full py-5 fixed top-0 left-0 px-3 lg:px-28 bg-background/5 backdrop-blur-sm wrapper border-b border-primary z-50'>
            <div className='lg:hidden w-full flex justify-between items-center nav-sm'>
                <Link href={"/"} className='flex items-center font-bold text-2xl'>
                    <span className='text-secondary'>Reap</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-primary">
                        <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                    </svg>
                    <span className='text-accent'>ll</span>
                </Link>
                <div className='flex items-center space-x-3'>
                    <button type='button' onClick={() => handleToggleTheme(theme as string)}>{theme == "light" ? <Moon fill='#0ea5e9' className="h-[1.2rem] w-[1.2rem] text-sky-500" /> : <Sun fill='yellow' className="h-[1.2rem] w-[1.2rem] text-yellow-400" />}</button>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <button type='button' className='flex space-x-1'>
                                {/* <span>menu</span> */}
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
                                <Link href={"/"} className={`w-full flex justify-center ${pathname == "/" ? "text-2xl font-bold" : "font-semibold text-slate-500 text-base dark:text-slate-400"}`}>Home</Link>
                                <Link href={"/explore"} className={`w-full flex justify-center ${pathname.startsWith("/explore") ? "text-2xl font-bold" : "font-semibold text-slate-500 text-base dark:text-slate-400"}`}>Explore</Link>
                                <Link href={"/create"} className={`w-full flex justify-center ${pathname.startsWith("/create") ? "text-2xl font-bold" : "font-semibold text-slate-500 text-base dark:text-slate-400"}`}>Create Poll</Link>
                                <a href={"mailto:codemonga@gmail.com"} className='w-full flex justify-center text-md font-semibold text-slate-500 dark:text-slate-400'>Contact</a>
                                {/* <Link href={"/"} className='w-full flex justify-center text-md font-semibold text-slate-400'>About</Link> */}
                                {!user ? <Link href={"/login"} className='w-full flex justify-center text-md font-semibold text-slate-500 dark:text-slate-400'>Login</Link> : null}
                        </div>
                        <DrawerFooter className='py-3 mb-10'>
                                <div className='w-full flex justify-center items-center'>
                                    <div className='space-x-5'>
                                        {user ? <Link href={"/dashboard"} className='bg-blue-500 text-white py-3 px-8 rounded-full'>Dashboard</Link> : <Link href={"/signup"} className='bg-blue-500 text-white py-3 px-8 rounded-full'>Sign up</Link>}
                                    </div>
                                </div>
                        </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
            <div className='hidden lg:flex w-full lg:justify-between lg:items-center nav-lg'>
                <div className='space-x-7 flex items-center'>
                    <Link href={"/"} className='flex items-center font-bold text-2xl'>
                        <span className='text-secondary'>Reap</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-primary">
                            <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                        </svg>
                        <span className='text-accent'>ll</span>
                    </Link>
                    <Link href={"/explore"}>Explore</Link>
                    <Link href={"/create"}>Create Poll</Link>
                    <a target='_blank' href="mailto:codemonga@gmail.com">Contact Us</a>
                    {/* <Link href={"/"}>About</Link> */}
                </div>
                {user ? <div className='space-x-3 flex items-center'>
                    <button type='button' onClick={() => handleToggleTheme(theme as string)}>{theme == "light" ? <Moon fill='#0ea5e9' className="h-[1.5rem] w-[1.5rem] text-sky-500" /> : <Sun fill='yellow' className="h-[1.5rem] w-[1.5rem] text-yellow-400" />}</button>
                    <Separator orientation='vertical' className='h-5 bg-slate-300 dark:bg-slate-600' />
                    <div className='text-green-500'>💠 $56.9</div>
                    <Separator orientation='vertical' className='h-5 bg-slate-300 dark:bg-slate-600' />
                    <div>
                        <Link href={"/dashboard"} className=''>Dashboard</Link>
                    </div>
                    </div> : <div className='space-x-3 flex items-center'>
                    <button type='button' onClick={() => handleToggleTheme(theme as string)}>{theme == "light" ? <Moon fill='#0ea5e9' className="h-[1.5rem] w-[1.5rem] text-sky-500" /> : <Sun fill='yellow' className="h-[1.5rem] w-[1.5rem] text-yellow-400" />}</button>
                    <Separator orientation='vertical' className='h-5 bg-slate-300 dark:bg-slate-600' />
                    <Link href={"/login"}>Login</Link>
                    <Separator orientation='vertical' className='h-5 bg-slate-300 dark:bg-slate-600' />
                    <Link href={"/signup"} className='bg-primary text-sm text-black py-3 px-5 rounded-full'>Sign up</Link>
                </div>}
            </div>
        </nav>
    )
}

export default Navbar