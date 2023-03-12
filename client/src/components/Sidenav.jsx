import React from 'react'
import userPic from '../assets/images/69945518.jfif'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset, logoutVendor } from '../redux/vendorAuthSlice'

const Sidenav = ({ toggleBackground }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logout() {
        dispatch(reset())
        dispatch(logoutVendor())
    }

    return (
        <div className="hidden pb-3 top-0 bottom-0 left-0 fixed z-50 h-full lg:flex items-center justify-between flex-col w-[15%] bg-[#1F213A]">
            <div className="flex flex-col justify-center items-center w-full px-4">
                <p className='mt-10 text-white'>Logo</p>
                <Link to='/' className="logo mt-5 flex items-center justify-start gap-2 text-white w-full bg-[#7B5EF8] py-2 rounded-lg pl-2">
                    <i className="ph-house text-[24px]"></i>
                    <p>Home</p>
                </Link>
                <Link to='/newinvoice' className="logo mt-5 flex items-center justify-start gap-2 text-white w-full py-2 rounded-lg pl-2">
                    <i className="ri-add-circle-fill text-[20px]"></i>
                    <p>New Invoice</p>
                </Link>
                <Link to='/' className="logo mt-5 flex items-center justify-start gap-2 text-white w-full py-2 rounded-lg pl-2">
                    <i className="ph ph-users text-[24px]"></i>
                    <p>Clients</p>
                </Link>
                <Link to='/settings' className="logo mt-5 flex items-center justify-start gap-2 text-white w-full py-2 rounded-lg pl-2 hover:cursor-pointer">
                    <i className="ph ph-gear-six text-[24px]"></i>
                    <p>Settings</p>
                </Link>
            </div>

            <div className='w-full'>
                <div className='border-t-2 border-gray-500 w-full '></div>

                <div className="logo mt-5 flex items-center justify-start gap-2 text-white w-full py-2 rounded-lg pl-2">
                    <i className="ri-logout-box-r-line text-white text-center text-2xl hover:cursor-pointer" onClick={logout}></i>
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