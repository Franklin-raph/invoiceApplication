import React from 'react'
import userPic from '../assets/images/69945518.jfif'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset, logoutVendor } from '../redux/vendorAuthSlice'

const Topnav = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logout() {
        dispatch(reset())
        dispatch(logoutVendor())
        console.log("Logout")
    }


    return (
        <div className="lg:hidden pb-3 px-7 top-0 fixed  z-[999] w-full flex items-center justify-between bg-[#1F213A] rounded-br-xl">
            <Link to='/' className="logo mt-5"><box-icon name='home' color="white" size="30px"></box-icon></Link>
            <div className="flex justify-center items-center">
                {/* <i className="ri-sun-fill hover:cursor-pointer text-white mb-5 text-xl"></i> */}
                {/* <div className="py-[0.5px] w-full my-5 bg-gray-500"></div> */}
                <img src={userPic} className="rounded-full w-10 mt-5" alt="" />
            </div>
            <i className="ri-logout-box-r-line text-white text-center text-2xl hover:cursor-pointer" onClick={logout}></i>
        </div>
    )
}

export default Topnav