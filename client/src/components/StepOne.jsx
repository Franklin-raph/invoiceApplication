import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoginImage from '../assets/images/360_F_556550658_HdTG42xb5HCJENnAJ9FtanFpITpRvK67.jpg'

const StepOne = ({ vendorDetails, nextStep, setFname, setLname, setEmail, setPassword, setConfirmPassword }) => {

    const [error, setError] = useState("")
    const { fName, lName, email, password, confirmPassword } = vendorDetails

    function validateFieldsAndUpdateStep(e) {
        e.preventDefault()
        if (!fName || !lName || !email || !password || !confirmPassword) {
            setError("Fill in all fields")
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }

        if (confirmPassword !== password) {
            setError("Passwords do not match")
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }
        nextStep()
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[80%] md:w-[90%] my-8 py-5 bg-white flex items-center h-auto justify-between gap-9 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]" >
                <div className="w-full px-6 lg:px-12 py-12">
                    <div className="flex items-center justify-between mt-3 gap-2 relative">
                        <h1 className="text-start text-xl font-bold">Personal Information</h1>
                        <div className="h-0.5 bg-slate-200 w-2/5"></div>
                        <p className="absolute text-xl px-3 py-1 text-white right-0 rounded-full bg-[#141625]">1</p>
                    </div>
                    {error && <p className="text-white text-center bg-red-600 py-1 px-2">{error}</p>}
                    <label className="block my-3">
                        <h1>First Name</h1>
                        <input onChange={(e) => setFname(e.target.value)} value={fName} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2" />
                    </label>
                    <label className="block my-3">
                        <h1>Last Name</h1>
                        <input onChange={(e) => setLname(e.target.value)} value={lName} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2" />
                    </label>
                    <label className="block my-3">
                        <h1>Email</h1>
                        <input onChange={(e) => setEmail(e.target.value)} value={vendorDetails.email} type="text" placeholder='Email' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full  mt-2" />
                    </label>
                    <label className="block my-3">
                        <h1>Password</h1>
                        <input onChange={(e) => setPassword(e.target.value)} value={vendorDetails.password} type="password" placeholder='Password' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2" />
                    </label>
                    <label className="block my-3">
                        <h1>Confirm Password</h1>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} value={vendorDetails.confirmPassword} type="password" placeholder='Confirm Password' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2" />
                    </label>
                    <div className="flex justify-between items-center flex-col lg:flex-row">
                        <p className="text-center py-3 pb-5">Already have an account? <Link to='/login' className="underline">Sign In</Link> </p>

                        <button onClick={validateFieldsAndUpdateStep} className="flex items-center border-gray-300 rounded-[4px] border-[1px] px-3 py-1 hover:bg-slate-500 hover:text-white transition">
                            <p>Next</p>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                </div>
                <img src={LoginImage} className="lg:w-full lg:block hidden" alt="" />
            </div>
        </div>
    )
}

export default StepOne