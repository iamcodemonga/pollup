import React, { ReactNode } from 'react'

type Props = {
    label: string;
    value: number;
    children: ReactNode;
    money: boolean;
    index?: number;
}

const TopCard = ({ label, value, children, money, index }: Props) => {
    return (
        <div className={`px-0 lg:px-10 py-7 ${index==0 ? "bg-green-800" : "bg-muted dark:bg-muted"} rounded-md lg:flex lg:justify-center space-y-3 space-x-0 lg:space-x-5 lg:space-y-0 items-center col-span-6 lg:col-span-3`}>
            <div className='w-full lg:w-max flex justify-center'>
                {children}
            </div>
            <div className='w-full lg:w-max flex justify-center'>
                <div className='space-y-1'>
                    <p className={`text-xs ${index==0 ? "text-slate-300 text-center lg:text-left" :"text-primary dark:text-primary text-center lg:text-left"}`}>{label}</p>
                    <h4 className={`text-sm lg:text-xl text-center lg:text-left lg:ml-2 ${index==0 ? "text-white lg:!ml-0" :""}`}>{money ? `${value.toLocaleString()}` : value}</h4>
                </div>
            </div>
        </div>
    )
}

export default TopCard