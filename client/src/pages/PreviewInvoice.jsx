import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

const PreviewInvoice = () => {
    const items = useSelector((state) => state.itemList)
    const clientBill = JSON.parse(localStorage.getItem('clientBill'))
    const { vendorData } = useSelector((state) => state.vendorAuth)
    const navigate = useNavigate()

    console.log(items)

    const { billId } = useParams()

    const [clientName, setClientName] = useState(clientBill.clientName)
    const [clientEmail, setClientEmail] = useState(clientBill.clientEmail)
    const [clientCountry, setClientCountry] = useState(clientBill.clientCountry)
    const [clientCity, setClientCity] = useState(clientBill.clientCity)
    const [clientStreetAddress, setClientStreetAddress] = useState(clientBill.clientStreetAddress)
    const [clientPostalCode, setClientPostalCode] = useState(clientBill.clientPostalCode)
    const [invoiceDate, setInvoiceDate] = useState(clientBill.invoiceDate)
    const [paymentTerms, setPaymentTerms] = useState(clientBill.paymentTerms)
    const [productDescription, setProductDescription] = useState(clientBill.productDescription)
    const [status, setStatus] = useState(clientBill.status)
    const [itemList, setItemList] = useState(items)
    const [message, setMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [confirmModal, setConfirmModal] = useState(false)

    const [billIssuedBy, setBillIssuedBy] = useState()
    const [billInfo, setBillInfo] = useState()

    const updatedClientBillInfo = {
        clientName, clientEmail, clientCountry,
        clientCity, clientStreetAddress, clientPostalCode,
        invoiceDate, paymentTerms, productDescription,
        status, itemList
    }

    useEffect(() => {
        getCurrentBillInfo()
    }, [])

    function navigateHome() {
        navigate('/')
        location.reload()
    }

    async function getCurrentBillInfo() {
        const res = await fetch(`http://localhost:5000/api/v1/clienbillinfo/billInfo/${billId}`, {
            headers: {
                Authorization: `Bearer ${vendorData.token}`
            },
        })
        const data = await res.json()
        if (res.ok) {
            setBillIssuedBy(data.billWasGivenBy)
            setBillInfo(data.billInfo)
        }
    }

    async function deleteClientBillInfo() {
        const res = await fetch(`http://localhost:5000/api/v1/clienbillinfo/deleteBill/${billId}`, {
            method: "DELETE",
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${vendorData.token}`
            }
        })
        if (res.ok) {
            navigateHome()
        }
    }

    function confirmDelete() {
        setConfirmModal(true)
    }

    async function updateClintBillInfo() {
        // const res = await fetch(`http://localhost:5000/api/v1/clienbillinfo/updatebillinfo/${billId}`, {
        //     method: "PUT",
        //     headers: {
        //         'Content-type': "application/json",
        //         Authorization: `Bearer ${vendorData.token}`
        //     },
        //     body: JSON.stringify(updatedClientBillInfo)
        // })
        // const data = await res.json()
        // if (res.ok) {
        //     setMessage("Success")
        //     setAlertType("Success")
        //     console.log(data)
        // }
        // if (!res.ok) {
        //     console.log("Un Successful")
        //     setMessage("Un Successful")
        //     setAlertType("Danger")
        // }
    }



    return (
        <div className='text-white w-[80%] mx-auto mt-[3rem]'>
            <div className="flex items-center justify-between gap-[5rem] bg-[#1F213A] py-5 px-6 rounded-md">
                <div className='flex items-center gap-4'>
                    <p>Status</p>
                    <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                        <span className="p-[4px] bg-green-800 rounded-full"></span>
                        <p className="font-[600] text-green-400">Paid</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <button className="py-[5px] px-3 bg-[#202B3F] rounded-md">Edit</button>
                    <button className="py-[5px] px-3 bg-red-500 rounded-md" onClick={confirmDelete}>Delete</button>
                    <button className="py-[5px] px-3 bg-green-500 rounded-md">Mark as Paid</button>
                </div>
            </div>

            <div className=" bg-[#1F213A] py-5 px-6 rounded-md mt-8">
                <div className='flex items-start justify-between gap-[5rem]'>
                    <div className='flex items-start flex-col'>
                        <p className="font-bold text-xl">#{billId.toString().substring(0, 6).toUpperCase()}</p>
                        <p className="text-gray-500 text-[18px]">Web Design</p>
                    </div>
                    <div className='flex items-start flex-col text-gray-500'>
                        {billIssuedBy &&
                            <>
                                <p>{billIssuedBy.streetAddress}</p>
                                <p>{billIssuedBy.city}</p>
                                <p>{billIssuedBy.postalCode}</p>
                                <p>{billIssuedBy.country}</p>
                            </>
                        }
                    </div>
                </div>

                {billInfo &&
                    <div className='flex items-start justify-between gap-[5rem] mt-9'>
                        <div className='flex items-start flex-col'>
                            <div className='mb-5'>
                                <p className='text-gray-500'>Invoice Date</p>
                                <p className="font-bold text-lg">{billInfo.invoiceDate}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Payment Due</p>
                                <p className="font-bold text-lg">{billInfo.paymentTerms}</p>
                            </div>
                        </div>
                        <div className='flex items-start flex-col text-gray-500'>
                            <p className='text-gray-500'>Bill to</p>
                            <p className="font-bold text-lg my-2 text-white">{billInfo.clientName}</p>
                            <p>{billInfo.clientStreetAddress}</p>
                            <p>{billInfo.clientCity}</p>
                            <p>{billInfo.clientPostalCode}</p>
                            <p>{billInfo.clientCountry}</p>
                        </div>
                        <div className='flex items-start flex-col'>
                            <p className='text-gray-500'>Send to</p>
                            <p className="font-bold text-lg">{billInfo.clientEmail}</p>

                        </div>
                    </div>
                }
                <div className="text-gray-500 flex items-start flex-col w-full justify-between gap-[2rem] bg-[#202B3F] mt-10 py-4 px-4 rounded-md">
                    <div className="flex justify-between items-center w-full">
                        <p>Item Name</p>
                        <p>Quantity</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div className="flex justify-between items-start flex-col w-full gap-2">
                        {billInfo &&
                            billInfo.itemList.map((item) => (
                                <div key={item._id} className="flex justify-between items-center w-full">
                                    <p className="font-bold text-white">{item.itemName}</p>
                                    <p>{item.itemQuantity}</p>
                                    <p>{item.itemPrice}</p>
                                    <p className="font-bold text-white">{item.total}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex items-center w-full justify-between gap-[2rem] bg-[#0f141d] mt-7 py-4 px-4 rounded-md">
                    <p>Grand Total</p>
                    {billInfo &&
                        <p>{billInfo.grandTotal}</p>
                    }
                </div>
            </div>
            {message && <Alert message={message} alertType={alertType} />}
            <button className='w-full my-[2rem] text-white bg-green-500 px-3 py-2 rounded-sm' onClick={navigateHome}>Confirm</button>

            {confirmModal &&
                <ConfirmModal setConfirmModal={setConfirmModal} performAction={deleteClientBillInfo} header="Confirm Delete" body="Are you sure you want to delete this invoice data?" />
            }
        </div>
    )
}

export default PreviewInvoice