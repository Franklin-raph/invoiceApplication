import Invoicecard from './Invoicecard'
import { useState } from 'react'


const InvoiceCardContainer = ({ billData }) => {

    return (
        <>

            <div>
                {billData && <Invoicecard billData={billData} />}
            </div>
        </>
    )
}

export default InvoiceCardContainer