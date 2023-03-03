import React from 'react'
import { Link } from 'react-router-dom';

const Invoicecard = ({ billData }) => {
    console.log(billData.data)
    return (
        <>
            {billData.data.map((bill) => (
                <Link to={`/invoicepreview/${bill._id}`} key={bill._id} className="flex items-center w-full justify-between gap-[5rem] bg-[#1F213A] py-4 px-4 rounded-md hover:cursor-pointer">
                    <h1>#{bill._id.toString().substring(0, 6).toUpperCase()}</h1>
                    <p>Due {bill.invoiceDate}</p>
                    <p>{bill.clientName}</p>
                    <h1>#{bill.grandTotal}</h1>
                    <div className="flex items-center gap-3">
                        <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                            <span className="p-[4px] bg-green-800 rounded-full"></span>
                            <p className="font-[600] text-green-400">{bill.status}</p>
                        </div>
                        <i className="ri-arrow-right-s-line text-[#7B5EF8]"></i>
                    </div>
                </Link>
            ))}
        </>
    )
}

export default Invoicecard