import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const VendorSettings = () => {

    const vendorDetails = JSON.parse(localStorage.getItem('vendorInfo'))

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

    function handleVendorDetailSettings() {
        console.log("Hi settings!!!")
    }

    return (
        <div className="md:px-[100px] px-5 mx-auto w-full md:w-[90%] md:mt-2 mt-[6rem] md:mb-2 mb-[10rem]">
            <div className="text-white mt-20 w-full md:w-[80%] mx-auto justify-between gap-[5rem] bg-[#1F213A] p-8 rounded-md mb-10 relative">
                <div className="w-full px-0 lg:px-12 py-12">
                    <div className="flex items-center justify-between mt-3 gap-2 relative">
                        <h1 className="text-start text-xl font-bold">Personal Information</h1>
                        <div className="h-0.5 bg-slate-200 w-2/5"></div>
                        {/* <p className="absolute text-xl px-3 py-1 text-white right-0 rounded-full bg-[#141625]">1</p> */}
                    </div>
                    {error && <p className="text-white text-center bg-red-600 py-1 px-2">{error}</p>}

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
                        {/* <p className="absolute text-xl px-3 py-1 text-white right-0 rounded-full bg-[#141625]">1</p> */}
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
                        {/* <p className="absolute text-xl px-3 py-1 text-white right-0 rounded-full bg-[#141625]">1</p> */}
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

                    <div className="flex justify-between items-center flex-col lg:flex-row">
                        <button className="flex items-center border-gray-300 rounded-[4px] border-[1px] px-3 py-1 hover:bg-slate-500 hover:text-white transition">
                            <p>Update</p>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorSettings