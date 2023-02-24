import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NewInvioce = () => {

    const { vendorData } = useSelector((state) => state.vendorAuth)
    console.log(vendorData.vendor.streetAddress)

    return (
        <div className="text-white mt-20 w-[50%] mx-auto justify-between gap-[5rem] bg-[#1F213A] p-8 rounded-md mb-10">
            <h1 className='text-xl font-bold'>Create #RT3080</h1>
            <div className='mt-9'>
                <p className='font-bold text-[#7B5EF8]'>Bill From</p>
                <div className='flex items-center gap-4'>
                    <div className="block my-3 w-full">
                        <h1>Country</h1>
                        <p className='text-white bg-[#141625] py-[7px] mt-1 px-2 rounded-[4px]'>{vendorData.vendor.country}</p>
                    </div>
                    <div className="block my-3 w-full">
                        <h1>City</h1>
                        <p className='text-white bg-[#141625] py-[7px] mt-1 px-2 rounded-[4px]'>{vendorData.vendor.city}</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 mt-3'>
                    <div className="block my-3 w-full">
                        <h1>Street Address</h1>
                        <p className='text-white bg-[#141625] py-[7px] mt-1 px-2 rounded-[4px]'>{vendorData.vendor.streetAddress}</p>
                    </div>
                    <div className="block my-3 w-full">
                        <h1>Postal Code</h1>
                        <p className='text-white bg-[#141625] py-[7px] mt-1 px-2 rounded-[4px]'>{vendorData.vendor.postalCode}</p>
                    </div>
                </div>
            </div>

            <div className='mt-20'>
                <p className='font-bold text-[#7B5EF8]'>Bill To</p>
                <label className="block my-7 w-full">
                    <h1>Client's Name</h1>
                    <input type="text" placeholder='Frank' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                </label>
                <div className="block my-3 w-full">
                    <h1>Client's Email</h1>
                    <input type="text" placeholder='client@gmail.com' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                </div>
                <div className='flex items-center gap-4'>
                    <div className="block my-3 w-full">
                        <h1>Client's Country</h1>
                        <input type="text" placeholder='Nigeria' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                    </div>
                    <div className="block my-3 w-full">
                        <h1>Client's City</h1>
                        <input type="text" placeholder='Anambra Awka' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                    </div>
                </div>

                <div className='flex items-center gap-4 mt-1'>
                    <div className="block my-3 w-full">
                        <h1>Client's Street Address</h1>
                        <input type="text" placeholder='Ifite School Gate' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                    </div>
                    <div className="block my-3 w-full">
                        <h1>Client's Postal Code</h1>
                        <input type="text" placeholder='141270' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                    </div>
                </div>

                <div className='flex items-center gap-4 mt-1'>
                    <div className="block my-3 w-full">
                        <h1>Invioce Date</h1>
                        <input type="date" className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 w-full bg-[#141625]" />
                    </div>
                    <div className="block my-3 w-full">
                        <h1>Payment Terms</h1>
                        <input type="text" placeholder='Email' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                    </div>
                </div>

                <div className="block my-7 w-full">
                    <h1>Product Description</h1>
                    <input type="text" placeholder='Web Development' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                </div>
            </div>
            <div className="flex items-center justify-end gap-1">
                <div className="flex items-center justify-between bg-[#141625] rounded-full gap-2 py-3 px-5 hover:cursor-pointer">
                    <Link to='/' className='text-[12px]'>Cancel</Link>
                </div>
                <button>
                    <div className="flex items-center justify-between bg-[#7B5EF8] rounded-full gap-2 py-3 px-5 hover:cursor-pointer">
                        <p className='text-[12px]'>Save Changes</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default NewInvioce