import Invoicecard from './Invoicecard'
import { useState } from 'react'


const InvoiceCardContainer = ({ billData }) => {

    return (
        <>

            <div className="text-white grid gap-5 pb-9">
                {billData && <Invoicecard billData={billData} />}
            </div>
        </>
    )
}

export default InvoiceCardContainer