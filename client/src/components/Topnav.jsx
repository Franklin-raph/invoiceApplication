import React, { useState } from 'react'
import userPic from '../assets/images/69945518.jfif'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset, logoutVendor } from '../redux/vendorAuthSlice'

const Topnav = ({ toggleBackground, toggleNavOpen, toggleNavClose }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [toggleState, setToggleState] = useState(true)

    function logout() {
        dispatch(reset())
        dispatch(logoutVendor())
        console.log("Logout")
    }

    function navOpen() {
        toggleNavOpen()
        setToggleState(!toggleState)
    }

    function navClose() {
        toggleNavClose()
        setToggleState(!toggleState)
    }


    return (
        <div className="lg:hidden pb-3 px-7 top-0 fixed z-[999] w-full flex items-center justify-between bg-[#1F213A]">
            <Link to='/home' className="logo mt-5"><i className="ph ph-scroll text-white text-[30px]"></i></Link>
            {toggleState ? <i className="ri-menu-3-line text-white text-center text-2xl hover:cursor-pointer" onClick={navOpen}></i> : <i className="ri-close-circle-line text-white text-center text-2xl hover:cursor-pointer" onClick={navClose}></i>}
        </div>
    )
}

export default Topnav