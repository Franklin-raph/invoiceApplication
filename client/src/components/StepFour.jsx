import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerVendor } from '../redux/vendorAuthSlice'

const StepFour = ({ vendorDetails, prevStep }) => {

    const {
        fName, lName, email, password, city, streetAddress, postalCode, country,
        businessName, businessOwnersName, businessType, businessWesite, confirmPassword
    } = vendorDetails

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { vendorData, isLoading, isSuccess, isError, message } = useSelector(state => state.vendorAuth)
    console.log(vendorData)
    useEffect(() => {
        if (isSuccess || vendorData) {
            navigate('/')
        }
    }, [])

    const handleVedorRegister = (e) => {
        console.log("first")
        e.preventDefault();
        dispatch(registerVendor({
            fName, lName, email, password, city, streetAddress, postalCode, country,
            businessName, businessOwnersName, businessType, businessWesite,
        }))
    }

    return (
        <div className="flex justify-center items-center">
            <div className="mt-14 pb-5 bg-white flex items-center justify-between gap-9 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]" >
                <div className="w-full ">
                    <p className="text-xl mb-8 text-center font-bold text-white bg-[#1F213A] py-3">Please Confirm the following details</p>

                    <div className='px-12'>
                        <p className='mb-3 px-2 py-1 bg-[#1F213A] inline-block text-white rounded-[10px]'>Personal Details</p>
                        <div className="flex items-center gap-3 mb-4">
                            <p> <span className="font-bold text-gray-700">First Name:</span> {fName}</p>
                            <p> <span className="font-bold text-gray-700 ml-[90px]">Last Name:</span> {lName}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p> <span className="font-bold text-gray-700">Email:</span> {email}</p>
                            <p> <span className="font-bold text-gray-700 ml-[90px]">Password:</span> {password}</p>
                        </div>
                    </div>

                    <div className='my-9 border-y-[1px] py-9 px-12'>
                        <p className='mb-3 px-2 py-1 bg-[#1F213A] inline-block text-white rounded-[10px]'>Business Information</p>
                        <div className="flex items-center gap-3 mb-4">
                            <p> <span className="font-bold text-gray-700">Business Name:</span> {businessName}</p>
                            <p> <span className="font-bold text-gray-700 ml-[90px]">Business Owner's Name:</span> {businessOwnersName}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p> <span className="font-bold text-gray-700">Business Type:</span> {businessType}</p>
                            <p><span className="font-bold text-gray-700 ml-[90px]">Business Website:</span> {businessWesite} </p>
                        </div>
                    </div>

                    <div className='px-12'>
                        <p className='mb-3 px-2 py-1 bg-[#1F213A] inline-block text-white rounded-[10px]'>Business Location Details</p>
                        <div className="flex items-center gap-5 mb-4">
                            <p> <span className="font-bold text-gray-700">Country:</span> {country}</p>
                            <p> <span className="font-bold text-gray-700 ml-28">City:</span> {city}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p> <span className="font-bold text-gray-700">Street Address:</span> {streetAddress}</p>
                            <p><span className="font-bold text-gray-700 ml-[90px]">Postal Code:</span> {postalCode} </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-5">
                        <button onClick={() => prevStep()} className="flex justify-center items-center border-gray-300 rounded-[4px] border-[1px] px-3 py-1 hover:bg-slate-500 hover:text-white transition">
                            <i className="ri-arrow-left-s-line"></i>
                            <p>Prev</p>
                        </button>
                        <form onSubmit={handleVedorRegister}>
                            <input type="submit" value="Sign Up" className="w-full bg-green-500 text-white py-2 rounded-[4px] hover:cursor-pointer" />
                        </form>
                    </div>
                    <p className="text-center py-3">Already have an account? <Link to='/login'>Sign In</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default StepFour