import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'

const NewInvioce = () => {

    const [clientName, setClientName] = useState("Frank")
    const [clientEmail, setClientEmail] = useState("frank@gmail.com")
    const [clientCountry, setClientCountry] = useState("Nigeria")
    const [clientCity, setClientCity] = useState("Anambra Awka")
    const [clientStreetAddress, setClientStreetAddress] = useState("Ifite School Gate")
    const [clientPostalCode, setClientPostalCode] = useState("14210")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [paymentTerms, setPaymentTerms] = useState("")
    const [productDescription, setProductDescription] = useState("Web Development")
    const [error, setError] = useState("")
    const [alertType, setAlertType] = useState("")

    const { vendorData } = useSelector((state) => state.vendorAuth)

    const clientBillInfo = {
        clientName, clientEmail, clientCountry,
        clientCity, clientStreetAddress, clientPostalCode,
        invoiceDate, paymentTerms, productDescription,
        status: "Draft"
    }

    async function handleClientDetailSubmission(e) {
        e.preventDefault();
        if (!clientName || !clientEmail || !clientCountry || !clientCity || !clientStreetAddress || !clientPostalCode || !invoiceDate || !paymentTerms || !productDescription) {
            setError("Update all client's details")
            setTimeout(() => {
                setError("")
            }, 2000)
        }

        const response = await fetch("http://localhost:5000/api/v1/clienbillinfo/registerClientPurchaseInfo", {
            method: "POST",
            body: JSON.stringify(clientBillInfo),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${vendorData.token}`
            }
        })
        const data = await response.json();
        console.log(data)
    }

    return (
        <div className="text-white mt-20 w-[50%] mx-auto justify-between gap-[5rem] bg-[#1F213A] p-8 rounded-md mb-10 relative">
            {error && <Alert message={error} alertType={alertType} />}
            <h1 className='text-xl font-bold'>Create #RT3080</h1>
            <div className='mt-9'>
                <p className='font-bold text-[#7B5EF8]'>Bill From</p>
                <div className='flex items-center gap-4'>
                    <div className="block my-3 w-full">
                        <h1>Country</h1>
                        <p className='text-white bg-[#141625] py-[7px] mt-1 px-2 rounded-[4px]'>{vendorData.vendor.country}</p>
                    </div>
                    <div className="block my-3 w-full">
                        <h1>City</h1>
                        <p className='text-white bg-[#141625] py-[7px] mt-1 px-2 rounded-[4px]'>{vendorData.vendor.city}</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 mt-3'>
                    <div className="block my-3 w-full">
                        <h1>Street Address</h1>
                        <p className='text-white bg-[#141625] py-[7px] mt-1 px-2 rounded-[4px]'>{vendorData.vendor.streetAddress}</p>
                    </div>
                    <div className="block my-3 w-full">
                        <h1>Postal Code</h1>
                        <p className='text-white bg-[#141625] py-[7px] mt-1 px-2 rounded-[4px]'>{vendorData.vendor.postalCode}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleClientDetailSubmission}>
                <div className='mt-20'>
                    <p className='font-bold text-[#7B5EF8]'>Bill To</p>
                    <label className="block my-7 w-full">
                        <h1>Client's Name</h1>
                        <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder='Frank' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                    </label>
                    <div className="block my-3 w-full">
                        <h1>Client's Email</h1>
                        <input type="text" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder='client@gmail.com' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className="block my-3 w-full">
                            <h1>Client's Country</h1>
                            <input type="text" value={clientCountry} onChange={e => setClientCountry(e.target.value)} placeholder='Nigeria' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                        </div>
                        <div className="block my-3 w-full">
                            <h1>Client's City</h1>
                            <input type="text" value={clientCity} onChange={e => setClientCity(e.target.value)} placeholder='Anambra Awka' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                        </div>
                    </div>

                    <div className='flex items-center gap-4 mt-1'>
                        <div className="block my-3 w-full">
                            <h1>Client's Street Address</h1>
                            <input type="text" value={clientStreetAddress} onChange={e => setClientStreetAddress(e.target.value)} placeholder='Ifite School Gate' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                        </div>
                        <div className="block my-3 w-full">
                            <h1>Client's Postal Code</h1>
                            <input type="text" value={clientPostalCode} placeholder='141270' onChange={e => setClientPostalCode(e.target.value)} className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                        </div>
                    </div>

                    <div className='flex items-center gap-4 mt-1'>
                        <div className="block my-3 w-full">
                            <h1>Invioce Date</h1>
                            <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 w-full bg-[#141625]" />
                        </div>
                        <div className="block my-3 w-full">
                            <h1>Payment Terms</h1>
                            <select name="paymentTerms" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]">
                                <option value="">-- Select Payment Terms --</option>
                                <option value="Next 10 Days">Next 10 Days</option>
                                <option value="Next 20 Days">Next 20 Days</option>
                                <option value="Next 30 Days">Next 30 Days</option>
                            </select>
                        </div>
                    </div>

                    <div className="block my-7 w-full">
                        <h1>Product Description</h1>
                        <input type="text" value={productDescription} onChange={e => setProductDescription(e.target.value)} placeholder='Web Development' className="focus:outline-none border-gray-800 rounded-[4px] border-[1px] pl-3 py-2 w-full bg-[#141625]" />
                    </div>
                </div>
                <div className="flex items-center justify-end gap-1">
                    <div className="flex items-center justify-between bg-[#141625] rounded-full gap-2 py-3 px-5 hover:cursor-pointer">
                        <Link to='/' className='text-[12px]'>Cancel</Link>
                    </div>
                    <input type="submit" className="text-[12px] flex items-center justify-between bg-[#7B5EF8] rounded-full gap-2 py-3 px-5 hover:cursor-pointer" value="Save Changes and Continue" />
                </div>
            </form>
        </div>
    )
}

export default NewInvioce