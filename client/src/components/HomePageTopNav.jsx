import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePageTopNav = ({ billData }) => {

    const [loggedInVendor, setLoggedInVendor] = useState("")

    useEffect(() => {
        setLoggedInVendor(JSON.parse(localStorage.getItem("vendorInfo")))
    }, [])

    return (
        <div className="text-white w-[100%] lg:w-[85%] ml-0 lg:ml-[10rem] px-[4rem] mt-[8rem] lg:mt-[4rem] mb-10">
            <div className='flex items-center justify-between mb-3'>
                {loggedInVendor &&
                    <p>Welcome, <span className='font-bold'>{loggedInVendor.vendor.fName} {loggedInVendor.vendor.lName}</span>!</p>
                }
                <p className='flex items-center gap-2'>Help center <i className="ri-question-line"></i> </p>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col md:flex-row justify-between items-center w-full gap-10'>
                    <div className='items-center justify-between p-5 flex bg-[#7B5EF8] w-full rounded-lg'>
                        <div className='flex items-center justify-between flex-col'>
                            <p>Total Invoice(s)</p>
                            <p className='font-bold text-2xl'>{billData.data.length}</p>
                        </div>
                        <Link to="/newinvoice">
                            <div className="flex items-center justify-between bg-[#1F213A] rounded-full gap-2 py-1 px-2 hover:cursor-pointer">
                                <i className="ri-add-circle-fill text-xl"></i>
                                <p className="hidden lg:block">New Invoice</p>
                            </div>
                        </Link>
                    </div>
                    <div className='items-center justify-between p-5 flex bg-[#7B5EF8] w-full rounded-lg'>
                        <div className='flex items-center justify-between flex-col'>
                            <p>Total Income</p>
                            <p className='font-bold text-xl flex gap-[1px] items-center'><i className="ph ph-currency-gbp"></i>100 million</p>
                        </div>
                        <Link to="#">
                            <div className="flex items-center justify-between bg-[#1F213A] rounded-full gap-2 py-1 px-2 hover:cursor-pointer">
                                <i className="ri-eye-fill text-xl"></i>
                                <p className="hidden lg:block">View Transactions</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageTopNav