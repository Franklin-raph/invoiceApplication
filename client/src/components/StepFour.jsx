import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import LoadingSpinner from '../components/LoaderComponent'

const StepFour = ({ vendorDetails, prevStep }) => {


    const {
        fName, lName, email, password, city, streetAddress, postalCode, country,
        businessName, businessOwnersName, businessType, businessWesite, confirmPassword, businessContact
    } = vendorDetails

    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [loading, setLoading] = useState(false)

    const handleVedorRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch('https://invoice-application-0qd7.onrender.com/api/v1/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fName, lName, email, password,
                businessName, businessType, businessOwnersName,
                businessWesite, country, city, streetAddress, postalCode, businessContact
            })
        })
        if (response) {
            setLoading(false)
        }
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('vendorInfo', JSON.stringify(data))
            setMessage("Acount Creation was successfull ")
            setAlertType("Danger")
            // navigate('/')
            location.reload()
        }
        if (!response.ok) {
            setMessage(data.err)
            setAlertType("Danger")
            setTimeout(() => {
                setMessage("")
                setAlertType("")
            }, 3000)
        }
    }

    return (
        <div className="flex justify-center items-center relative">
            {loading && <LoadingSpinner />}
            <div className="w-[95%] md:w-[80%] my-14 pb-5 bg-white flex items-center justify-between gap-9 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]" >
                <div className="w-full ">
                    <p className="text-xl mb-8 text-center font-bold text-white bg-[#1F213A] py-3">Please Confirm the following details</p>
                    {message && <Alert message={message} alertType={alertType} />}
                    <div className='px-5 md:px-12'>
                        <p className='mb-3 px-2 py-1 bg-[#1F213A] inline-block text-white rounded-[5px]'>Personal Details</p>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
                            <p> <span className="font-bold text-gray-700">First Name:</span> {fName}</p>
                            <p> <span className="font-bold text-gray-700 ml-0 md:ml-[90px]">Last Name:</span> {lName}</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                            <p> <span className="font-bold text-gray-700">Email:</span> {email}</p>
                            <p> <span className="font-bold text-gray-700 ml-0 md:ml-[90px]">Password:</span> {password}</p>
                        </div>
                    </div>

                    <div className='my-9 border-y-[1px] py-9 px-5 md:px-12'>
                        <p className='mb-3 px-2 py-1 bg-[#1F213A] inline-block text-white rounded-[5px]'>Business Information</p>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
                            <p> <span className="font-bold text-gray-700">Business Name:</span> {businessName}</p>
                            <p> <span className="font-bold text-gray-700 ml-0 md:ml-[90px]">Business Owner's Name:</span> {businessOwnersName}</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                            <p> <span className="font-bold text-gray-700">Business Type:</span> {businessType}</p>
                            <p><span className="font-bold text-gray-700 ml-0 md:ml-[90px]">Business Contact:</span> {businessContact} </p>
                        </div>
                    </div>

                    <div className='md:px-12 px-5'>
                        <p className='mb-3 px-2 py-1 bg-[#1F213A] inline-block text-white rounded-[5px]'>Business Location Details</p>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-4">
                            <p> <span className="font-bold text-gray-700">Country:</span> {country}</p>
                            <p> <span className="font-bold text-gray-700 md:ml-28">City:</span> {city}</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                            <p> <span className="font-bold text-gray-700">Street Address:</span> {streetAddress}</p>
                            <p><span className="font-bold text-gray-700 md:ml-[90px]">Postal Code:</span> {postalCode} </p>
                        </div>
                    </div>

                    <div className="flex items-start md:items-center justify-between py-5 px-12">
                        <button onClick={() => prevStep()} className="flex justify-center items-center border-gray-300 rounded-[4px] border-[1px] px-3 py-1 hover:bg-slate-500 hover:text-white transition">
                            <i className="ri-arrow-left-s-line"></i>
                            <p>Prev</p>
                        </button>
                        <form onSubmit={handleVedorRegister}>
                            <input type="submit" value="Sign Up" className="w-full bg-green-500 text-white py-2 px-4 rounded-[4px] hover:cursor-pointer" />
                        </form>
                    </div>
                    <p className="text-center py-3">Already have an account? <Link to='/login'>Sign In</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default StepFour