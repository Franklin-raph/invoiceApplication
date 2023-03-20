import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar";


const Invoicecard = ({ billData }) => {
    const [searchWord, setSearchWord] = useState("")
    const navigate = useNavigate()

    return (
        <div className="text-white grid gap-5 pb-9 w-full mx-auto relative">
            <div className='searchAndText'>
                <p className='w-full'>Recent Invoices</p>
                <SearchBar setSearchWord={setSearchWord} />
            </div>

            <>
                <div className="md:hidden flex items-center gap-3">
                    <p>Keys : </p>
                    <div className="flex items-center gap-3">
                        <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center">
                            <i className="ri-time-line p-[3px] text-yellow-600"></i>
                            <p className="font-[600] text-yellow-400">Pending</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                            <i className="ri-checkbox-circle-line p-[3px] text-green-800"></i>
                            <p className="font-[600] text-green-400">Paid</p>
                        </div>
                    </div>
                </div>
                {billData.data.filter((bill) => {
                    if (searchWord === "") return bill
                    else if (bill.clientName.toLowerCase().includes(searchWord.toLowerCase()) || bill.status.toLowerCase().includes(searchWord.toLowerCase())) return bill
                }).map((bill) => (
                    <Link to={`/invoicepreview/${bill._id}`} key={bill._id} className="w-full md:hidden flex flex-col gap-[5rem] bg-[#1F213A] py-4 px-4 rounded-lg hover:cursor-pointer mx-auto border-gray-600 border-[1px]">
                        <div className="flex justify-between items-center">
                            <h1>#{bill._id.toString().substring(0, 6).toUpperCase()}</h1>
                            <p>{bill.clientName}</p>
                        </div>
                        <div className="flex justify-between items-center gap-20">
                            <div>
                                <p className='text-sm'>Due {bill.invoiceDate}</p>
                                <div className='flex items-center'>
                                    <i className="ph-currency-ngn"></i>
                                    {bill.grandTotal ?
                                        <p className='font-bold'>
                                            {bill.grandTotal.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'NGN',
                                            }).toString().slice(4)}
                                        </p> :
                                        <p>0</p>
                                    }
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {bill.status === "Pending" ?
                                    <div className="flex items-center gap-3">
                                        <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center">
                                            <i className="ri-time-line p-[3px] text-yellow-600"></i>
                                            {/* <p className="font-[600] text-yellow-400">Pend</p> */}
                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center gap-3">
                                        <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                                            <i className="ri-checkbox-circle-line p-[3px] text-green-800"></i>
                                            {/* <p className="font-[600] text-green-400">{bill.status}</p> */}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                ))}
            </>

            <div className="hidden text-gray-500 md:flex items-start flex-col w-full justify-between gap-[2rem] bg-[#1F213A] rounded-t-lg">
                <table className="styled-table">
                    <thead className='py-[30px] my-[30px] rounded-md'>
                        <tr className='py-[30px] my-[30px] bg-[#202B3F]'>
                            <th>Item ID</th>
                            <th>Due Date</th>
                            <th>Client's Name</th>
                            <th>Grand Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {billData.data.filter((bill) => {
                        if (searchWord === "") return bill
                        else if (bill.clientName.toLowerCase().includes(searchWord.toLowerCase()) || bill.status.toLowerCase().includes(searchWord.toLowerCase())) return bill
                    }).map((bill) => (
                        <tbody key={bill._id}>
                            <tr onClick={() => navigate(`/invoicepreview/${bill._id}`)} className="hover:cursor-pointer">
                                <td className="text-white">#{bill._id.toString().substring(0, 6).toUpperCase()}...</td>
                                <td>{bill.invoiceDate}</td>
                                <td>{bill.clientName}</td>
                                <td className='text-white flex items-center justify-center mt-2'>
                                    <i className="ph-currency-ngn"></i>
                                    {bill.grandTotal ?
                                        <p className='font-bold'>
                                            {bill.grandTotal.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'NGN',
                                            }).toString().slice(4)}
                                        </p> :
                                        <p>0</p>
                                    }
                                </td>
                                <td>
                                    {bill.status === "Pending" ?
                                        <div className="flex items-center gap-3">
                                            <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                                                <i className="ri-time-line p-[3px] text-yellow-600"></i>
                                                <p className="font-[600] text-yellow-400">{bill.status}</p>
                                            </div>
                                        </div>
                                        :
                                        <div className="flex items-center gap-3">
                                            <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                                                <i className="ri-checkbox-circle-line p-[3px] text-green-400"></i>
                                                <p className="font-[600] text-green-600">{bill.status}</p>
                                            </div>
                                        </div>
                                    }
                                </td>
                                <td>
                                    <i className="ri-function-fill text-xl text-[#7B5EF8]"></i>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Invoicecard

{/* <Link to={`/invoicepreview/${bill._id}`} key={bill._id} className="hidden md:flex items-center justify-between gap-[5rem] bg-[#1F213A] py-4 px-4 rounded-md hover:cursor-pointer mx-auto">
                        <h1>#{bill._id.toString().substring(0, 6).toUpperCase()}...</h1>
                        <p>Due {bill.invoiceDate}</p>
                        <p>{bill.clientName}</p>
                        <div className='flex items-center'>
                            <i className="ph-currency-ngn"></i>
                            <p className='font-bold'>{bill.grandTotal.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'NGN',
                            }).toString().slice(4)}</p>
                        </div>
                        {bill.status === "Pending" ?
                            <div className="flex items-center gap-3">
                                <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                                    <span className="p-[4px] bg-yellow-600 rounded-full"></span>
                                    <p className="font-[600] text-yellow-400">{bill.status}</p>
                                </div>
                                <i className="ri-arrow-right-s-line text-[#7B5EF8]"></i>
                            </div>
                            :
                            <div className="flex items-center gap-3">
                                <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                                    <span className="p-[4px] bg-green-800 rounded-full"></span>
                                    <p className="font-[600] text-green-400">{bill.status}</p>
                                </div>
                                <i className="ri-arrow-right-s-line text-[#7B5EF8]"></i>
                            </div>
                        }
                    </Link> */}



{/* <Link to={`/invoicepreview/${bill._id}`} key={bill._id} className="w-[100%] md:hidden flex flex-col gap-[5rem] bg-[#1F213A] py-4 px-4 rounded-md hover:cursor-pointer mx-auto">
                        <div className="flex justify-between items-center">
                            <h1>#{bill._id.toString().substring(0, 6).toUpperCase()}</h1>
                            <p>{bill.clientName}</p>
                        </div>
                        <div className="flex justify-between items-center gap-20">
                            <div>
                                <p className='text-sm'>Due {bill.invoiceDate}</p>
                                <div className='flex items-center'>
                                    <i className="ph-currency-ngn"></i>
                                    <p className='font-bold'>{bill.grandTotal.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'NGN',
                                    }).toString().slice(4)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {bill.status === "Pending" ?
                                    <div className="flex items-center gap-3">
                                        <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                                            <span className="p-[4px] bg-yellow-600 rounded-full"></span>
                                            <p className="font-[600] text-yellow-400">{bill.status}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center gap-3">
                                        <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                                            <span className="p-[4px] bg-green-800 rounded-full"></span>
                                            <p className="font-[600] text-green-400">{bill.status}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </Link> */}