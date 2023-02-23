import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoginImage from '../assets/images/teaching-img.png'

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
            <div className="mt-8 pt-5 bg-white flex items-center justify-between gap-9 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]" >
                <div className="w-full px-12">
                    <h1 className="text-start text-xl font-bold">Personal Information</h1>
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
                    <button onClick={validateFieldsAndUpdateStep} className="flex justify-center items-center border-gray-300 rounded-[4px] border-[1px] px-3 py-1 hover:bg-slate-500 hover:text-white transition">
                        <p>Next</p>
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                    {/* <input type="submit" value="Sign In" className="w-full bg-green-500 text-white py-2 rounded-[4px] hover:cursor-pointer" /> */}
                    <p className="text-center py-3 pb-5">Already have an account? <Link to='/login' className="underline">Sign In</Link> </p>
                </div>
                <img src={LoginImage} className="w-2/4" alt="" />
            </div>
        </div>
    )
}

export default StepOne