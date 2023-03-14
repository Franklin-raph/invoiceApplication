import React from 'react'

const Confirm = ({ setConfirmModal, header, body, performAction }) => {
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 h-full w-full bg-black bg-opacity-[90%] z-[51]">
            <div className='bg-white flex items-center justify-center py-10 px-5 w-[90%] md:w-1/3 gap-4 flex-col rounded-lg text-black text-center'>
                <p>{header}</p>
                <p>{body}</p>
                <div className='flex items-center justify-center gap-2'>
                    <button className='text-white bg-red-500 px-3 py-2 rounded-sm' onClick={() => setConfirmModal(false)}>No</button>
                    <button className='text-white bg-green-500 px-3 py-2 rounded-sm' onClick={performAction}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default Confirm