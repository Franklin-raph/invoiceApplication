import Invoicecard from './Invoicecard'
import { useState } from 'react'


const InvoiceCardContainer = ({ billData }) => {

    return (
        <>

            <div className='w-full'>
                {billData && <Invoicecard billData={billData} />}
            </div>
        </>
    )
}

export default InvoiceCardContainer