import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/LoaderComponent'

const VendorSettings = ({ baseUrl }) => {

    const vendorDetails = JSON.parse(localStorage.getItem('vendorInfo'))
    const { vendorData } = useSelector((state) => state.vendorAuth)
    const navigate = useNavigate();

    let logedInVendor = JSON.parse(localStorage.getItem('vendorInfo'))

    useEffect(() => {
        if (vendorData) {
            navigate('/settings')
        }
        if (logedInVendor === null) {
            navigate('/login')
        }
    }, [])

    const [fName, setFname] = useState("")
    const [lName, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [businessType, setBusinessType] = useState("")
    const [businessOwnersName, setBusinessOwnersName] = useState("")
    const [businessWesite, setBusinessWesite] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const [isEdit, setIsEdit] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState('password');
    const [loading, setLoading] = useState("")

    function handleVendorDetailSettings() {
        console.log("Hi settings!!!")
    }

    function toggleEditANdDelete() {
        setIsEdit(!isEdit)
    }

    const toggleInput = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
        setShowPassword(!showPassword)
    }

    async function deleteAccount(e) {
        e.preventDefault()
        if (!password) {
            setError("Please fill in the field")
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }
        setLoading(true)
        const response = await fetch(`${baseUrl}/auth/deleteAccount/${vendorData.vendor._id}`, {
            method: "POST",
            body: JSON.stringify({
                password, email: vendorData.vendor.email
            }),
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${vendorData.token}`
            },
        })
        if (response) {
            setLoading(false)
        }
        const data = await response.json()
        if (!response.ok) {
            setError(data.err)
            setTimeout(() => {
                setError("")
            }, 3000)
        }
        if (response.ok) {
            localStorage.clear()
            navigate('/login')
            location.reload()
        }
        console.log(data)
    }

    return (
        <div className="md:px-[100px] px-5 mx-auto w-full md:w-[90%] md:mt-2 mt-[6rem] md:mb-2 mb-[10rem] relative">
            {loading && <LoadingSpinner />}
            <div className='flex mb-5 w-full md:w-[80%] mx-auto justify-start mt-20'>
                <h1 className='text-white font-bold text-2xl'>Account Settings</h1>
            </div>
            <div className="settingsTopNav text-white mt-5 flex-col mb-5 w-full md:w-[80%] mx-auto justify-start gap-[3rem] bg-[#1F213A] p-4 rounded-md relative">
                <div onClick={() => setIsEdit(true)} className="flex items-center gap-2 bg-[#FFBD03] border-[1px] py-1 px-3 rounded-md hover:cursor-pointer">
                    <i className="ri-pencil-fill"></i>
                    <p>Update Account</p>
                </div>
                <div onClick={() => setIsEdit(false)} className='flex items-center gap-2 bg-red-500 border-[1px] py-1 px-3 rounded-md hover:cursor-pointer'>
                    <i className="ph ph-trash"></i>
                    <p>Delete Account</p>
                </div>
            </div>

            {isEdit ?
                <div className="text-white w-full md:w-[80%] mx-auto justify-between gap-[5rem] bg-[#1F213A] p-8 rounded-md mb-10 relative">
                    <div className="w-full px-0 lg:px-12 py-12">
                        <div className="flex items-center justify-between mt-3 gap-2 relative">
                            <h1 className="text-start text-xl font-bold">Personal Information</h1>
                            <div className="h-0.5 bg-slate-200 w-2/5"></div>
                        </div>

                        {vendorData &&
                            <>
                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>First Name</h1>
                                        <input onChange={(e) => setFname(e.target.value)} value={vendorDetails.vendor.fName} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>Last Name</h1>
                                        <input onChange={(e) => setLname(e.target.value)} value={vendorDetails.vendor.lName} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>

                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Email</h1>
                                        <input onChange={(e) => setEmail(e.target.value)} value={vendorDetails.vendor.email} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>Phone Number</h1>
                                        <input onChange={(e) => setLname(e.target.value)} value={"081"} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-[5rem] gap-2 relative">
                                    <h1 className="text-start text-xl font-bold">Business Information</h1>
                                    <div className="h-0.5 bg-slate-200 w-2/5"></div>
                                </div>

                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Business Name</h1>
                                        <input onChange={(e) => setBusinessName(e.target.value)} value={vendorDetails.vendor.businessName} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>Business Owners Name</h1>
                                        <input onChange={(e) => setBusinessOwnersName(e.target.value)} value={vendorDetails.vendor.businessOwnersName} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>
                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Business Type</h1>
                                        <input onChange={(e) => setBusinessType(e.target.value)} value={vendorDetails.vendor.businessType} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>Business Website</h1>
                                        <input onChange={(e) => setBusinessWesite(e.target.value)} value={vendorDetails.vendor.businessWesite} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-[5rem] gap-2 relative">
                                    <h1 className="text-start text-xl font-bold">Business Location</h1>
                                    <div className="h-0.5 bg-slate-200 w-2/5"></div>
                                </div>
                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Country</h1>
                                        <input onChange={(e) => setCountry(e.target.value)} value={vendorDetails.vendor.country} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>City</h1>
                                        <input onChange={(e) => setCity(e.target.value)} value={vendorDetails.vendor.city} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>

                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Street Address</h1>
                                        <input onChange={(e) => setStreetAddress(e.target.value)} value={vendorDetails.vendor.streetAddress} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>Postal Code</h1>
                                        <input onChange={(e) => setPostalCode(e.target.value)} value={vendorDetails.vendor.postalCode} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>
                            </>
                        }

                        <div className="flex justify-between items-center flex-col lg:flex-row">
                            <button className="flex items-center border-gray-300 rounded-[4px] border-[1px] px-3 py-1 hover:bg-slate-500 hover:text-white transition">
                                <p>Update</p>
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
                :
                <form onSubmit={deleteAccount} className="text-white w-full md:w-[80%] mx-auto justify-between gap-[5rem] bg-[#1F213A] p-8 rounded-md mb-10">
                    <div className="block my-3 w-full relative">
                        {error && <p className="text-white text-center bg-red-600 py-1 px-2 mb-3">{error}</p>}
                        <h1>Type your password to continue with the operation</h1>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type={inputType} placeholder='******' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                        <div className='absolute md:top-[40px] top-[63px] right-5 cursor-pointer'>
                            {showPassword ? <i className="ri-eye-fill" onClick={toggleInput}></i> : <i className="ri-eye-off-fill" onClick={toggleInput}></i>}
                        </div>
                        <button className='mt-3 w-full bg-red-500 border-[1px] py-1 px-3 rounded-md cursor-pointer'>I understand the operation, continue</button>
                    </div>
                </form>
            }

        </div>
    )
}

export default VendorSettings