import React from 'react'
import userPic from '../assets/images/69945518.jfif'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset, logoutVendor } from '../redux/vendorAuthSlice'

const Sidenav = ({ toggleBackground }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentLocation = useLocation().pathname.toLowerCase();

    function logout() {
        dispatch(reset())
        dispatch(logoutVendor())
    }
    return (
        <div className="hidden pb-3 top-0 bottom-0 left-0 fixed z-50 h-full lg:flex items-center justify-between flex-col w-[15%] bg-[#1F213A]">
            <div className="flex flex-col justify-center items-center w-full sideNav">
                <div className='w-full'>
                    <div className="flex flex-col justify-center items-center mt-5 text-white gap-2 pb-1">
                        <i className="ph ph-scroll text-[38px]"></i>
                        <p>e-Invoice</p>
                    </div>
                    <div className='border-t-2 border-gray-700 w-full'></div>
                </div>
                <div className='px-4 w-full'>
                    <Link to='/home' className={currentLocation.includes('/home') ? "mt-5 flex items-center justify-start gap-2 text-white w-full bg-[#7B5EF8] py-2 rounded-lg pl-2" : "mt-5 flex items-center justify-start gap-2 text-white w-full py-2 rounded-lg pl-2"}>
                        {/* <i className="ph-house "></i> */}
                        <i className="fa-solid fa-house-chimney text-[18px]"></i>
                        <p>Home</p>
                    </Link>
                    <Link to='/newinvoice' className={currentLocation.includes('/newinvoice') ? "mt-5 flex items-center justify-start gap-2 text-white w-full bg-[#7B5EF8] py-2 rounded-lg pl-2" : "mt-5 flex items-center justify-start gap-2 text-white w-full py-2 rounded-lg pl-2"}>
                        {/* <i className="ri-add-circle-fill text-[20px]"></i> */}
                        <i className="fa-solid fa-circle-plus"></i>
                        <p>New Invoice</p>
                    </Link>
                    <Link to='/clients' className={currentLocation.includes('/clients') ? "mt-5 flex items-center justify-start gap-2 text-white w-full bg-[#7B5EF8] py-2 rounded-lg pl-2" : "mt-5 flex items-center justify-start gap-2 text-white w-full py-2 rounded-lg pl-2"}>
                        {/* <i className="ph ph-users-three text-[24px]"></i> */}
                        <i className="fa-solid fa-users text-[18px]"></i>
                        <p>Clients</p>
                    </Link>
                    <Link to='/settings' className={currentLocation.includes('/settings') ? "mt-5 flex items-center justify-start gap-2 text-white w-full bg-[#7B5EF8] py-2 rounded-lg pl-2" : "mt-5 flex items-center justify-start gap-2 text-white w-full py-2 rounded-lg pl-2"}>
                        <i className="fa-solid fa-user-gear text-[18px]"></i>
                        <p>Settings</p>
                    </Link>
                </div>
            </div>

            <div className='w-full'>
                <div className='border-t-2 border-gray-700 w-full'></div>
                <div onClick={logout} className="w-[90%] mx-auto pl-2 mt-5 flex items-center justify-start gap-2 text-white py-1 rounded-lg hover:cursor-pointer hover:bg-[#141625]">
                    <i className="fa-solid fa-right-from-bracket text-center text-xl"></i>
                    <p>Logout</p>
                </div>
            </div>

        </div>
    )
}

export default Sidenav


// #141625
// #1F213A
// #7B5EF8