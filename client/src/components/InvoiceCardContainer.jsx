import Invoicecard from './Invoicecard'
import { useState } from 'react'


const InvoiceCardContainer = ({ billData }) => {

    return (
        <>

            <div className='w-[100%] lg:w-[85%] ml-0 lg:ml-[10rem] px-[4rem]'>
                {billData && <Invoicecard billData={billData} />}
            </div>
        </>
    )
}

export default InvoiceCardContainer