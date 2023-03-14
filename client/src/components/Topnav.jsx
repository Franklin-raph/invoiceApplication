import React from 'react'
import userPic from '../assets/images/69945518.jfif'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset, logoutVendor } from '../redux/vendorAuthSlice'

const Topnav = ({ toggleBackground }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logout() {
        dispatch(reset())
        dispatch(logoutVendor())
        console.log("Logout")
    }


    return (
        <div className="lg:hidden pb-3 px-7 top-0 fixed z-[999] w-full flex items-center justify-between bg-[#1F213A]">
            <Link to='/home' className="logo mt-5"><i className="ph ph-scroll text-white text-[30px]"></i></Link>
            <div className="flex justify-center items-center gap-3">
                {/* <i className="ph-sun-dim hover:cursor-pointer text-white text-2xl" onClick={toggleBackground}></i> */}
                {/* <img src={userPic} className="rounded-full w-10" alt="" /> */}
            </div>
            <i className="ri-menu-3-line text-white text-center text-2xl hover:cursor-pointer"></i>
            {/* <i className="ri-logout-box-r-line text-white text-center text-2xl hover:cursor-pointer" onClick={logout}></i> */}
        </div>
    )
}

export default Topnav