import React from 'react'
import { Link } from 'react-router-dom'

const Alert = ({ message, alertType }) => {
    const billId = localStorage.getItem("billId")
    return (
        <div className=" flex items-center justify-center fixed top-0 left-0 h-full w-full bg-black bg-opacity-[90%] z-10">
            <div className='bg-white flex items-center justify-center py-10 px-5 w-1/3 gap-4 flex-col rounded-lg'>

                {alertType === "Danger" ?
                    <i className="ri-close-circle-line text-7xl text-red-500"></i>
                    :
                    <i className="ri-checkbox-circle-fill text-7xl text-green-600"></i>
                }

                {alertType === "Danger" ?
                    <p className="text-center text-red-500 text-lg py-1 px-2 mb-3">{message}</p>
                    :
                    <p className="text-center text-green-600 text-lg py-1 px-2 mb-3">{message}</p>
                }

                {alertType === "Success" ?
                    <Link to={`/itemlist/${billId}`} className='text-green-600 rounded-[4px] border-green-600 border-[1px] py-1 px-3 hover:bg-green-600 hover:text-white transition-all'>Continue</Link>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Alert