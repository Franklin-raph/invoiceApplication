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
        console.log("Logout")
    }

    return (
        <div className="hidden pb-3 top-0 bottom-0 left-0 fixed h-full lg:flex items-center justify-between flex-col w-20 bg-[#1F213A] rounded-br-xl">
            <Link to='/' className="logo mt-5"><i className="ph-house text-white text-[30px]"></i></Link>
            <div className="flex flex-col justify-center items-center">
                {/* <i className="ph-sun-dim hover:cursor-pointer text-red-400 mb-5 text-2xl" onClick={toggleBackground}></i> */}
                <img src={userPic} className="rounded-full w-10 mt-5" alt="" />
            </div>
            <i className="ph-sign-out text-white text-center text-3xl hover:cursor-pointer" onClick={logout}></i>
        </div>
    )
}

export default Sidenav


// #141625
// #1F213A
// #7B5EF8