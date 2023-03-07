import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginImage from '../assets/images/teaching-img.png'

const StepTwo = ({ vendorDetails, nextStep, prevStep, setBusinessName, setBusinessType, setBusinessOwnersName, setBusinessWesite }) => {
    const [error, setError] = useState("")

    function validateFieldsAndUpdateStep(e) {
        e.preventDefault()
        if (!vendorDetails.businessName || !vendorDetails.businessType || !vendorDetails.businessOwnersName || !vendorDetails.businessWesite) {
            setError("Fill in all fields")
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }
        nextStep()
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[95%] md:w-[90%] my-8 py-5 bg-white flex items-center h-auto justify-between gap-9 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]" >
                <div className="w-full px-6 lg:px-12 py-12">
                    <div className="flex items-center justify-between mt-3 gap-2 relative">
                        <h1 className="text-start text-xl font-bold mt-3">Business Information</h1>
                        <div className="h-0.5 bg-slate-200 w-2/5"></div>
                        <p className="absolute text-xl px-3 py-1 text-white right-0 rounded-full bg-[#141625]">2</p>
                    </div>
                    {error && <p className="text-white text-center bg-red-600 py-1 px-2">{error}</p>}
                    <label className="block my-3">
                        <h1>Business Name</h1>
                        <input onChange={(e) => setBusinessName(e.target.value)} value={vendorDetails.businessName} type="text" placeholder='Frank Tech-Hub' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2" />
                    </label>
                    <label className="block my-3">
                        <h1>Business Type</h1>
                        <input onChange={(e) => setBusinessType(e.target.value)} value={vendorDetails.businessType} type="text" placeholder='Software Development' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full  mt-2" />
                    </label>
                    <label className="block my-3">
                        <h1>Business owner's Name</h1>
                        <input onChange={(e) => setBusinessOwnersName(e.target.value)} value={vendorDetails.businessOwnersName} type="text" placeholder='Franklin Raphael' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2" />
                    </label>
                    <label className="block my-3">
                        <h1>Business Website</h1>
                        <input onChange={(e) => setBusinessWesite(e.target.value)} value={vendorDetails.businessWesite} type="text" placeholder='https://www.franklinraphael.com' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2" />
                    </label>
                    <div className="flex items-center justify-between">
                        <button onClick={() => prevStep()} className="flex justify-center items-center border-gray-300 rounded-[4px] border-[1px] px-3 py-1 hover:bg-slate-500 hover:text-white transition">
                            <i className="ri-arrow-left-s-line"></i>
                            <p>Prev</p>
                        </button>
                        <button onClick={validateFieldsAndUpdateStep} className="flex justify-center items-center border-gray-300 rounded-[4px] border-[1px] px-3 py-1 hover:bg-slate-500 hover:text-white transition">
                            <p>Next</p>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                    {/* <input type="submit" value="Sign In" className="w-full bg-green-500 text-white py-2 rounded-[4px] hover:cursor-pointer" /> */}
                    <p className="text-center py-3 pb-5">Already have an account? <Link to='/login' className="underline">Sign In</Link> </p>
                </div>
                <img src={LoginImage} className="lg:w-1/2 lg:block hidden" alt="" />
            </div>
        </div>
    )
}

export default StepTwo