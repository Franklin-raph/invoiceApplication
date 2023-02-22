import React from 'react'
import userPic from '../assets/images/69945518.jfif'

const Sidenav = () => {
    return (
        <div className="pb-3 top-0 bottom-0 left-0 fixed h-full flex justify-between flex-col w-20 bg-[#1F213A]">
            <div className="logo text-white">Logo</div>
            <div className="flex flex-col justify-center items-center">
                <i className="ri-sun-fill hover:cursor-pointer text-white"></i>
                <div className="py-[0.5px] w-full my-5 bg-gray-500"></div>
                <img src={userPic} className="rounded-full w-10" alt="" />
            </div>
        </div>
    )
}

export default Sidenav


// #141625
// #1F213A
// #7B5EF8