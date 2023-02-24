import React from 'react'

const Alert = ({ message, alertType }) => {
    return (
        <div className=" flex items-center justify-center fixed top-0 left-0 h-full w-full bg-black bg-opacity-[90%] z-10">
            <div className='bg-white flex items-center justify-center py-10 px-5 gap-4 flex-col rounded-lg'>
                <i class="ri-close-circle-line text-7xl text-red-500"></i>
                <p className="text-center text-red-500 text-2xl py-1 px-2 mb-3">{message}</p>
            </div>
        </div>
    )
}

export default Alert