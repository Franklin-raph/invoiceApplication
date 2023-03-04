import React from 'react'

const SearchBar = ({ setSearchWord }) => {
    return (
        <div className='searchDiv'>
            <label className="flex justify-end items-center">
                <input onChange={e => setSearchWord(e.target.value)} type="text" className="focus:outline-none border-gray-800 rounded-l-[4px] border-[1px] pl-3 py-2 w-[30%] bg-[#141625]" />
                <i class="ri-search-line bg-[#1F213A] py-[9px] px-3 rounded-r-[4px]"></i>
            </label>
        </div>
    )
}

export default SearchBar