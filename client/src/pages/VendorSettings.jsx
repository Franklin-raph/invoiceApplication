import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/LoaderComponent'
import Alert from '../components/Alert'
import { useDispatch } from 'react-redux'
import { reset, logoutVendor } from '../redux/vendorAuthSlice'

const VendorSettings = ({ baseUrl }) => {

    const token = localStorage.getItem('token')
    const [vendorDetails, setVendorDetails] = useState({})
    const { vendorData } = useSelector((state) => state.vendorAuth)
    // console.log(vendorData)
    const navigate = useNavigate();
    const [alertType, setAlertType] = useState("")

    let logedInVendor = JSON.parse(localStorage.getItem('vendorInfo'))
    const dispatch = useDispatch()


    const [fName, setFname] = useState("")
    const [lName, setLname] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [businessContact, setBusinessContact] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [businessType, setBusinessType] = useState("")
    const [businessOwnersName, setBusinessOwnersName] = useState("")
    const [businessWesite, setBusinessWesite] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")



    useEffect(() => {
        console.log(token)
        console.log(logedInVendor)
        if (vendorData) {
            navigate('/settings')
        }
        if (logedInVendor === null) {
            navigate('/login')
        } else {
            getMyAccount()
        }
    }, [])

    async function getMyAccount() {
        const response = await fetch("http://localhost:5000/api/v1/auth/myaccount", {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        const data = await response.json()
        if (response.ok) {
            setVendorDetails(data)
            setFname(data.fName)
            setLname(data.lName)
            setProfilePic(data.profilePic)
            setBusinessContact(data.businessContact)
            setBusinessName(data.businessName)
            setBusinessType(data.businessType)
            setBusinessOwnersName(data.businessOwnersName)
            setBusinessWesite(data.businessWesite)
            setCountry(data.country)
            setCity(data.city)
            setStreetAddress(data.streetAddress)
            setPostalCode(data.postalCode)
        }
    }


    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")
    const [isEdit, setIsEdit] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState('password');
    const [loading, setLoading] = useState("")
    const [alertLocation, setAlertLocation] = useState("settings")

    async function updateVendorAccount(e) {
        console.log(vendorDetails._id, fName, lName, businessContact, country)
        e.preventDefault()
        if (!fName || !lName || !businessName || !businessType || !businessOwnersName
            || !businessContact || !country || !city || !streetAddress || !postalCode) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
            return
        }
        setLoading(true)
        const response = await fetch(`${baseUrl}/auth/updateAccount/${vendorDetails._id}`, {
            method: "PATCH",
            body: JSON.stringify({
                fName, lName, businessName, businessType, businessOwnersName,
                businessContact, country, city, streetAddress, postalCode, profilePic, businessWesite
            }),
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${token}`
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
            console.log(data)
            localStorage.setItem('vendorInfo', JSON.stringify(data))

            setMessage("Account Update was successful")
            setAlertType("Success")
            setTimeout(() => {
                setMessage("")
                setAlertType("")
            }, 3000)
        }
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
        const response = await fetch(`${baseUrl}/auth/deleteAccount/${vendorDetails._id}`, {
            method: "POST",
            body: JSON.stringify({
                password, email: vendorDetails.email
            }),
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${token}`
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
    }

    return (
        <div className="md:px-[100px] px-5 mx-auto w-full md:w-[90%] md:mt-2 mt-[6rem] md:mb-2 mb-[10rem] relative">
            {/* {loading && <LoadingSpinner />} */}
            {error && <Alert message={"Please fill in the required field"} alertType={"Danger"} alertLocation={alertLocation} />}
            {message && <Alert message={message} alertType={alertType} alertLocation={alertLocation} />}
            <div className='flex mb-5 w-full md:w-[80%] mx-auto justify-start mt-20'>
                <h1 className='text-white font-bold text-2xl'>Account Settings</h1>
            </div>
            <div className="settingsTopNav text-white mt-5 flex-col mb-5 w-full md:w-[80%] mx-auto justify-start gap-[3rem] bg-[#1F213A] p-4 rounded-md relative">
                <div onClick={() => setIsEdit(true)} className="flex items-center gap-2 bg-[#FFBD03] border-[1px] py-1 px-3 rounded-md hover:cursor-pointer">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <p>Update Account</p>
                </div>
                <div onClick={() => setIsEdit(false)} className='flex items-center gap-2 bg-red-500 border-[1px] py-1 px-3 rounded-md hover:cursor-pointer'>
                    <i className="fa-solid fa-trash"></i>
                    <p>Delete Account</p>
                </div>
            </div>

            {isEdit ?
                <div className="text-white w-full md:w-[80%] mx-auto justify-between gap-[5rem] bg-[#1F213A] p-8 rounded-md mb-10 relative">
                    <div className="w-full px-0 lg:px-12 py-12">
                        {message && <p className="text-white text-center bg-green-600 py-1 px-2 mb-3">{message}</p>}
                        <div className="flex items-center justify-between mt-3 gap-2 relative">
                            <h1 className="text-start text-xl font-bold">Personal Information</h1>
                            <div className="h-0.5 bg-slate-200 w-2/5"></div>
                        </div>

                        {vendorDetails &&
                            <>
                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>First Name *</h1>
                                        <input autoComplete="off" onChange={(e) => setFname(e.target.value)} value={fName} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>Last Name *</h1>
                                        <input onChange={(e) => setLname(e.target.value)} value={lName} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>

                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Phone Number *</h1>
                                        <input onChange={(e) => setBusinessContact(e.target.value)} value={businessContact} type="number" placeholder='081222222222' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>

                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Profile Picture url</h1>
                                        <input onChange={(e) => setProfilePic(e.target.value)} value={profilePic} type="text" placeholder='https://google.com/my_picture.jpeg' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-[5rem] gap-2 relative">
                                    <h1 className="text-start text-xl font-bold">Business Information</h1>
                                    <div className="h-0.5 bg-slate-200 w-2/5"></div>
                                </div>

                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Business Name *</h1>
                                        <input onChange={(e) => setBusinessName(e.target.value)} value={businessName} type="text" placeholder='FrankdotDev' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>Business Owners Name *</h1>
                                        <input onChange={(e) => setBusinessOwnersName(e.target.value)} value={businessOwnersName} type="text" placeholder='Franklin' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>
                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Business Type *</h1>
                                        <input onChange={(e) => setBusinessType(e.target.value)} value={businessType} type="text" placeholder='ICT Services' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>Business Website</h1>
                                        <input onChange={(e) => setBusinessWesite(e.target.value)} value={businessWesite} type="text" placeholder='www.mybusiness.com' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-[5rem] gap-2 relative">
                                    <h1 className="text-start text-xl font-bold">Business Location</h1>
                                    <div className="h-0.5 bg-slate-200 w-2/5"></div>
                                </div>
                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Country *</h1>
                                        <input onChange={(e) => setCountry(e.target.value)} value={country} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>City *</h1>
                                        <input onChange={(e) => setCity(e.target.value)} value={city} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>

                                <div className='flex items-center flex-col md:flex-row md:gap-4 mt-3'>
                                    <div className="block my-3 w-full">
                                        <h1>Street Address *</h1>
                                        <input onChange={(e) => setStreetAddress(e.target.value)} value={streetAddress} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                    <div className="block my-3 w-full">
                                        <h1>Postal Code *</h1>
                                        <input onChange={(e) => setPostalCode(e.target.value)} value={postalCode} type="text" placeholder='Name' className="focus:outline-none border-gray-300 rounded-[4px] border-[1px] pl-3 py-2 w-full mt-2 bg-[#141625]" />
                                    </div>
                                </div>
                            </>
                        }

                        <div className="flex justify-between items-center flex-col lg:flex-row">
                            <div></div>
                            {!loading ?
                                <button onClick={updateVendorAccount} className="flex items-center border-gray-300 rounded-[4px] border-[1px] px-3 py-1 bg-[#7B5EF8] hover:text-white transition">
                                    <p>Update Account</p>
                                </button>
                                :
                                <button disabled className="buttonload cursor-not-allowed flex items-center justify-center gap-3 border-gray-300 rounded-[4px] border-[1px] px-3 py-1 bg-[#beafff] text-white">
                                    <i className="fa fa-spinner fa-spin"></i>
                                    <p>Update Account</p>
                                </button>
                            }

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