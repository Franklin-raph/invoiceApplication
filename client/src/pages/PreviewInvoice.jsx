import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
// import 'boxicons'

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
    const [warningModal, setWarningModal] = useState(false)
    const [paidState, setPaidState] = useState(false)

    const [billIssuedBy, setBillIssuedBy] = useState()
    const [billInfo, setBillInfo] = useState()
    const [fileGenerateModal, setFileGenerateModal] = useState(false)

    const updatedClientBillInfo = {
        clientName, clientEmail, clientCountry,
        clientCity, clientStreetAddress, clientPostalCode,
        invoiceDate, paymentTerms, productDescription,
        status, itemList
    }

    useEffect(() => {
        if (!vendorData) {
            console.log("Not logged in")
            navigate('/login')
        } else {
            getCurrentBillInfo()
        }
    }, [])

    function navigateHome() {
        navigate('/')
        location.reload()
    }

    function generatePDF() {
        const invoice = new JsPDF('portrait', 'pt', 'a2');
        invoice.html(document.querySelector('#bill'))
            .then(() => {
                invoice.save('report.pdf');
                setFileGenerateModal(false)
            })
    }

    function generateImg() {
        const input = document.getElementById('bill');
        html2canvas(input)
            .then(function (canvas) {
                let anchorTag = document.createElement("a");
                anchorTag.download = "invoice.png";
                anchorTag.href = canvas.toDataURL();
                anchorTag.click();
            });
        setFileGenerateModal(false)
    }

    async function getCurrentBillInfo() {
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/billInfo/${billId}`, {
            headers: {
                Authorization: `Bearer ${vendorData.token}`
            },
        })
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            setBillIssuedBy(data.billWasGivenBy)
            setBillInfo(data.billInfo)
        }
    }

    async function deleteClientBillInfo() {
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/deleteBill/${billId}`, {
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

    async function confirmBill() {
        setFileGenerateModal(true)
        // console.log()
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/updatebillinfo/${billId}`, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${vendorData.token}`
            },
            body: JSON.stringify({ ...billInfo, status: "Paid" })
        })
        const data = await res.json()
        if (res.ok) {
            // setMessage("Success")
            // setAlertType("Success")
            // console.log(data)
        }
        if (!res.ok) {
            // console.log("Un Successful")
            // setMessage("Un Successful")
            // setAlertType("Danger")
        }
    }

    function confirmBillPaid() {
        setWarningModal(true)
    }

    async function updatePaid() {
        setPaidState(true)
        console.log({ ...billInfo, status: "Paid" })
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
            {billInfo && billInfo.status === "Paid" ?
                <div className="flex items-center justify-between gap-[5rem] bg-[#1F213A] py-5 px-6 rounded-md">
                    <div className='flex items-center gap-4'>
                        <p>Status</p>
                        <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                            <span className="p-[4px] bg-green-800 rounded-full"></span>
                            <p className="font-[600] text-green-400">Paid</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <button className="py-[5px] px-3 bg-red-500 rounded-md" onClick={confirmDelete}>Delete</button>
                    </div>
                </div>
                :
                <div className="flex items-center justify-between gap-[5rem] bg-[#1F213A] py-5 px-6 rounded-md">
                    <div className='flex items-center gap-4'>
                        <p>Status</p>
                        <>
                            {!paidState ?
                                <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                                    <span className="p-[4px] bg-yellow-600 rounded-full"></span>
                                    <p className="font-[600] text-yellow-400">Pending</p>
                                </div> :
                                <div className="py-[5px] px-3 bg-[#202B3F] rounded-md flex items-center gap-2">
                                    <span className="p-[4px] bg-green-800 rounded-full"></span>
                                    <p className="font-[600] text-green-400">Paid</p>
                                </div>
                            }
                        </>
                    </div>
                    <div className='flex items-center gap-4'>
                        {!paidState && <button className="py-[5px] px-3 bg-[#202B3F] rounded-md" onClick={() => navigate(`/itemlist/${billId}`)}>Edit</button>}
                        <button className="py-[5px] px-3 bg-red-500 rounded-md" onClick={confirmDelete}>Delete</button>
                        {!paidState && <button className="py-[5px] px-3 bg-green-500 rounded-md" onClick={updatePaid}>Mark as Paid</button>}
                    </div>
                </div>
            }


            <div className=" bg-[#1F213A] py-5 px-6 rounded-md mt-8" id='bill'>
                <div className='flex items-start justify-between gap-[5rem]'>
                    <div className='flex items-start flex-col'>
                        <p className="font-bold text-xl text-white">#{billId.toString().substring(0, 6).toUpperCase()}</p>
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
                                <p className="font-bold text-lg text-white">{billInfo.invoiceDate}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Payment Due</p>
                                <p className="font-bold text-lg text-white">{billInfo.paymentTerms}</p>
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
                            <p className="font-bold text-lg text-white">{billInfo.clientEmail}</p>

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
                    <p className='text-white'>Grand Total</p>
                    {billInfo &&
                        <p className='text-white'>{billInfo.grandTotal}</p>
                    }
                </div>
            </div>
            {message && <Alert message={message} alertType={alertType} />}

            {billInfo && billInfo.status === "Paid" ?
                <div className="flex items-center w-full">
                    <button className='my-[2rem] text-white bg-green-500 px-3 py-2 rounded-md' onClick={confirmBill}>Confirm Payment</button>
                </div> :
                <>
                    {paidState ?
                        <div className="flex items-center w-full">
                            <button className='my-[2rem] text-white bg-green-500 px-3 py-2 rounded-md' onClick={confirmBill}>Confirm Payment</button>
                        </div>
                        :
                        <div className="flex items-center w-full">
                            <button className='my-[2rem] text-white bg-green-500 px-3 py-2 rounded-md' onClick={confirmBillPaid}>Confirm Bill</button>
                        </div>
                    }
                </>

            }


            {confirmModal &&
                <ConfirmModal setConfirmModal={setConfirmModal} performAction={deleteClientBillInfo} header="Confirm Delete" body="Are you sure you want to delete this invoice data?" />
            }

            {warningModal &&
                <div className="flex items-center justify-center fixed top-0 left-0 h-full w-full bg-black bg-opacity-[90%] z-10">
                    <div className='bg-white flex items-center justify-center py-10 px-5 w-1/3 gap-4 flex-col rounded-lg text-black text-center relative'>
                        <i className="ri-close-circle-fill absolute top-2 right-2 text-2xl text-[#0f141d] cursor-pointer" onClick={() => setWarningModal(!warningModal)}></i>
                        <i className="ri-error-warning-fill text-7xl text-yellow-500"></i>
                        <p>Please Mark the bill as <span className='px-1 py-[1px] bg-green-500 text-white rounded-sm'>Paid</span> before you can confirm this purchase</p>
                    </div>
                </div>
            }


            {fileGenerateModal &&
                <div className="flex items-center justify-center fixed top-0 left-0 h-full w-full bg-black bg-opacity-[90%] z-10">
                    <div className='bg-white flex items-center justify-center py-10 px-5 w-1/3 gap-4 flex-col rounded-lg text-black text-center relative'>
                        <i className="ri-close-circle-fill absolute top-2 right-2 text-2xl text-[#0f141d] cursor-pointer" onClick={() => setFileGenerateModal(!fileGenerateModal)}></i>
                        <i className="ri-checkbox-circle-fill text-7xl text-green-600"></i>
                        <p>Bill and Payment has been confirmed</p>
                        <p>Export Invoice as</p>
                        <div className='flex items-center justify-center gap-[3rem]'>
                            <div className='flex items-center justify-center flex-col cursor-pointer' onClick={generateImg}>
                                <box-icon size="40px" type='solid' name='file-image' color="#202B3F"></box-icon>
                                <p>Image</p>
                            </div>
                            <p>OR</p>
                            <div className='flex items-center justify-center gap-2 flex-col cursor-pointer' onClick={generatePDF}>
                                <box-icon size="40px" type='solid' name='file-pdf' color="#202B3F"></box-icon>
                                <p>PDF</p>
                            </div>
                        </div>
                        <div>
                            <p onClick={() => print()}>Print</p>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default PreviewInvoice