import { useState } from 'react'
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";


const Invoicecard = ({ billData }) => {
    const [searchWord, setSearchWord] = useState("")

    console.log(billData.data)
    return (
        <div className="text-white grid gap-5 pb-9 px-5 w-full mx-auto relative">
            <SearchBar setSearchWord={setSearchWord} />
            {billData.data.filter((bill) => {
                if (searchWord === "") return bill
                else if (bill.clientName.toLowerCase().includes(searchWord.toLowerCase()) || bill.status.toLowerCase().includes(searchWord.toLowerCase())) return bill
            }).map((bill) => (
                <>
                    <Link to={`/invoicepreview/${bill._id}`} key={bill._id} className="hidden md:flex items-center justify-between gap-[5rem] bg-[#1F213A] py-4 px-4 rounded-md hover:cursor-pointer mx-auto">
                        <h1>#{bill._id.toString().substring(0, 6).toUpperCase()}</h1>
                        <p>Due {bill.invoiceDate}</p>
                        <p>{bill.clientName}</p>
                        <h1>#{bill.grandTotal}</h1>
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
                    </Link>

                    <Link to={`/invoicepreview/${bill._id}`} key={bill._id} className="w-[100%] md:hidden flex flex-col gap-[5rem] bg-[#1F213A] py-4 px-4 rounded-md hover:cursor-pointer mx-auto">
                        <div className="flex justify-between items-center">
                            <h1>#{bill._id.toString().substring(0, 6).toUpperCase()}</h1>
                            <p>{bill.clientName}</p>
                        </div>
                        <div className="flex justify-between items-center gap-20">
                            <div>
                                <p className='text-sm'>Due {bill.invoiceDate}</p>
                                <h1>#{bill.grandTotal}</h1>
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
                    </Link>
                </>
            ))}

            {/* {billData.data.map((bill) => (
                
            ))} */}
        </div>
    )
}

export default Invoicecard