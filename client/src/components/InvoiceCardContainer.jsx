import React from 'react'
import Invoicecard from './Invoicecard'

const InvoiceCardContainer = ({ billData }) => {
    return (
        <div className="text-white grid gap-5">
            {billData && <Invoicecard billData={billData} />}
        </div>
    )
}

export default InvoiceCardContainer