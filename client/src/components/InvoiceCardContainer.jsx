import Invoicecard from './Invoicecard'
import { useState } from 'react'


const InvoiceCardContainer = ({ billData }) => {

    return (
        <>

            <div className='w-[100%] lg:w-[85%] ml-0 lg:ml-[10rem] px-[1rem] lg:px-[4rem] md:mb-2 mb-[5rem]'>
                {billData && <Invoicecard billData={billData} />}
            </div>
        </>
    )
}

export default InvoiceCardContainer