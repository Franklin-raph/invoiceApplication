import React from 'react'

const HomePageTopNav = () => {
    return (
        <div className="text-white flex items-center justify-between w-2/3 my-20">
            <div>
                <h1 className="text-3xl font-[600]">Invoces</h1>
                <p>There are 7 total invoices</p>
            </div>
            <div className="flex items-center justify-between gap-10">
                <div className="flex items-center justify-between gap-3">
                    <p>Filter by status</p>
                    <i className="ri-arrow-down-s-line text-[#7B5EF8] hover:cursor-pointer"></i>
                </div>
                <div className="flex items-center justify-between bg-[#7B5EF8] rounded-full gap-2 py-1 px-2 hover:cursor-pointer">
                    <i className="ri-add-circle-fill text-xl"></i>
                    <p>New Invoice</p>
                </div>
            </div>
        </div>
    )
}

export default HomePageTopNav