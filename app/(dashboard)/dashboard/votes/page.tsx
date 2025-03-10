import React from 'react'

const page = () => {
    return (
        <main className='w-full relative overflow-x-hidden ml-14 pr-4 lg:pl-3 allvotes'>
            <div className='flex w-full pr-2 py-5 mt-7'>
                <h1 className='text-2xl'>Voted Polls</h1>
            </div>
            <section className='w-full pb-10'>
                <div className='grid grid-cols-12 gap-x-3 gap-y-3 lg:gap-y-5 lg:gap-x-3'>
                    <div className='col-span-12 lg:col-span-4 Pcard py-6 px-3 lg:px-5 bg-muted rounded-md'>
                        <div className='flex items-center text-xs mb-2 text-gray-500 dark:text-gray-400'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg> 50,000 votes
                        </div>
                        <h3 className='text-lg mb-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, porro.</h3>
                        <div className='w-full flex justify-between items-center space-x-2'>
                            <div className='flex items-center space-x-2'>
                                <button type='button' className='w-7 h-7 rounded-full flex justify-center items-center bg-red-500/10'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <button type='button' className='text-xs text-green-600 px-3 py-2 rounded-full flex justify-center items-center bg-green-600/10'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-green-600 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                    </svg>Copy link
                                </button>
                                <button type='button' className='px-4 py-2 rounded-full flex items-center bg-primary text-xs text-black'>View Poll <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 ml-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-20'>
                    <button type="button" className='px-10 py-3 rounded-md bg-primary text-xs text-black'>Load more</button>
                </div>
            </section>
        </main>
    )
}

export default page