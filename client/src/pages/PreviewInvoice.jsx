import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import LoadingSpinner from '../components/LoaderComponent';
// import 'boxicons'

const PreviewInvoice = () => {

    useEffect(() => {
        if (!vendorData) {
            console.log("Not logged in")
            navigate('/login')
        } else {
            getCurrentBillInfo()
        }
    }, [])

    const items = useSelector((state) => state.itemList)
    // const clientBill = JSON.parse(localStorage.getItem('clientBill'))
    const { vendorData } = useSelector((state) => state.vendorAuth)
    const navigate = useNavigate()

    console.log(items)

    const { billId } = useParams()

    const [clientBill, setClientBill] = useState()

    const [clientName, setClientName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [clientCountry, setClientCountry] = useState("")
    const [clientCity, setClientCity] = useState("")
    const [clientStreetAddress, setClientStreetAddress] = useState("")
    const [clientPostalCode, setClientPostalCode] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [paymentTerms, setPaymentTerms] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [status, setStatus] = useState("")
    const [itemList, setItemList] = useState(items)
    const [message, setMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [confirmModal, setConfirmModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [paidState, setPaidState] = useState(false)
    const [loading, setLoading] = useState(false)

    const [billIssuedBy, setBillIssuedBy] = useState()
    const [billInfo, setBillInfo] = useState()
    const [fileGenerateModal, setFileGenerateModal] = useState(false)

    async function getCurrentBillInfo() {
        setLoading(true)
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/billInfo/${billId}`, {
            headers: {
                Authorization: `Bearer ${vendorData.token}`
            },
        })
        if (res) {
            setLoading(false)
        }
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            setClientName(data.billInfo.clientName)
            setClientCity(data.billInfo.clientCity)
            setClientCountry(data.billInfo.clientCountry)
            setClientEmail(data.billInfo.clientEmail)
            setClientPostalCode(data.billInfo.clientPostalCode)
            setClientStreetAddress(data.billInfo.clientStreetAddress)
            setProductDescription(data.billInfo.productDescription)
            setPaymentTerms(data.billInfo.paymentTerms)
            setInvoiceDate(data.billInfo.invoiceDate)
            setBillIssuedBy(data.billWasGivenBy)
            setBillInfo(data.billInfo)
        }
    }

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

    async function deleteClientBillInfo() {
        setLoading(true)
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/deleteBill/${billId}`, {
            method: "DELETE",
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${vendorData.token}`
            }
        })
        if (res.status === 401) {
            setConfirmModal(false)
            setMessage("This user is Unauthorized to delete this bill information because he/she isn't the one who created it. Please make sure that the current signed in user is the one who created this billing information.")
            setAlertType("Danger")
            setTimeout(() => {
                setMessage("")
                setAlertType("")
            }, 4000)

            clearTimeout()
        }
        if (res) {
            setLoading(false)
            console.log(res)
        }
        if (res.ok) {
            navigateHome()
        }
    }

    function confirmDelete() {
        setConfirmModal(true)
    }

    async function confirmBill() {
        setLoading(true)

        // console.log()
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/updatebillinfo/${billId}`, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${vendorData.token}`
            },
            body: JSON.stringify({ ...billInfo, status: "Paid" })
        })
        if (res) {
            setLoading(false)
            setFileGenerateModal(true)
        }
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
        <div className='text-white w-[90%] md:w-[80%] mx-auto mt-24'>
            {loading && <LoadingSpinner />}
            {billInfo && billInfo.status === "Paid" ?
                <div className="flex flex-col md:flex-row md:items-center items-start justify-between gap-[5rem] bg-[#1F213A] py-5 px-6 rounded-md">
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
                <div className="flex flex-col md:flex-row md:items-center items-start justify-between gap-[5rem] bg-[#1F213A] py-5 px-6 rounded-md">
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
                    <div className='flex items-center gap-3'>
                        {!paidState && <button className="py-[5px] px-3 bg-[#202B3F] rounded-md" onClick={() => navigate(`/itemlist/${billId}`)}>Edit</button>}
                        <button className="py-[5px] px-3 bg-red-500 rounded-md" onClick={confirmDelete}>Delete</button>
                        {!paidState && <button className="py-[5px] text-[14px] px-3 bg-green-500 rounded-md" onClick={updatePaid}>Mark as Paid</button>}
                    </div>
                </div>
            }


            <div className=" bg-[#1F213A] py-5 px-4 md:px-6 rounded-md mt-8" id='bill'>
                <div className='flex md:flex-row flex-col items-start justify-between gap-[2rem] md:gap-[5rem]'>
                    <div className='flex items-start flex-col'>
                        <p className="font-bold text-xl text-white">#{billId.toString().substring(0, 6).toUpperCase()}</p>
                        <p className="text-gray-500 text-[18px]">Web Design</p>
                    </div>
                    <div className='flex items-start flex-col text-gray-500'>
                        {billIssuedBy &&
                            <>
                                <p className='text-white'>Bill From</p>
                                <p>{billIssuedBy.streetAddress}</p>
                                <p>{billIssuedBy.city}</p>
                                <p>{billIssuedBy.postalCode}</p>
                                <p>{billIssuedBy.country}</p>
                            </>
                        }
                    </div>
                </div>

                {billInfo &&
                    <div className='flex md:flex-row flex-col items-start justify-between gap-[2rem] md:gap-[5rem] mt-9'>
                        <div className='flex items-start justify-between flex-row md:flex-col'>
                            <div className='mb-5'>
                                <p className='text-gray-500'>Invoice Date</p>
                                <p className="font-bold text-sm md:text-lg text-white">{billInfo.invoiceDate}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Payment Due</p>
                                <p className="font-bold text-sm md:text-lg text-white">{paymentTerms}</p>
                            </div>
                        </div>
                        <div className='flex items-start flex-col text-gray-500 '>
                            <p className='text-gray-500'>Bill to</p>
                            <p className="font-bold text-lg my-2 text-white">{clientName}</p>
                            <p>{clientStreetAddress}</p>
                            <p>{clientCity}</p>
                            <p>{clientPostalCode}</p>
                            <p>{clientCountry}</p>
                        </div>
                        <div className='flex items-start flex-col'>
                            <p className='text-gray-500'>Send to</p>
                            <p className="font-bold text-lg text-white">{clientEmail}</p>

                        </div>
                    </div>
                }

                <div className="text-gray-500 flex items-start flex-col w-full justify-between gap-[2rem] bg-[#202B3F] mt-10 py-4 px-4 rounded-md">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        {billInfo &&
                            billInfo.itemList.map((item) => (
                                <tbody>
                                    <tr key={item._id} >
                                        <td className="font-bold text-white">{item.itemName}</td>
                                        <td>{item.itemQuantity}</td>
                                        <td>{item.itemPrice}</td>
                                        <td className='text-white flex items-center'>
                                            <i className="ph-currency-ngn"></i>
                                            <p>{item.total.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'NGN',
                                            }).toString().slice(4)}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>
                <div className="flex items-center w-full justify-between gap-[2rem] bg-[#0f141d] mt-7 py-4 px-4 rounded-md">
                    <p className='text-white'>Grand Total</p>
                    {billInfo &&
                        <div className='text-white flex items-center'>
                            <i className="ph-currency-ngn"></i>
                            <p>{billInfo.grandTotal.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'NGN',
                            }).toString().slice(4)}</p>
                        </div>
                    }
                </div>
            </div>
            {message && <Alert message={message} alertType={alertType} />}

            {
                billInfo && billInfo.status === "Paid" ?
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


            {
                confirmModal &&
                <ConfirmModal setConfirmModal={setConfirmModal} performAction={deleteClientBillInfo} header="Confirm Delete" body="Are you sure you want to delete this invoice data?" />
            }

            {
                warningModal &&
                <div className="flex items-center justify-center fixed top-0 left-0 h-full w-full bg-black bg-opacity-[90%] z-10">
                    <div className='bg-white flex items-center justify-center py-10 px-5 w-1/3 gap-4 flex-col rounded-lg text-black text-center relative'>
                        <i className="ri-close-circle-fill absolute top-2 right-2 text-2xl text-[#0f141d] cursor-pointer" onClick={() => setWarningModal(!warningModal)}></i>
                        <i className="ri-error-warning-fill text-7xl text-yellow-500"></i>
                        <p>Please Mark the bill as <span className='px-1 py-[1px] bg-green-500 text-white rounded-sm'>Paid</span> before you can confirm this purchase</p>
                    </div>
                </div>
            }


            {
                fileGenerateModal &&
                <div className="flex items-center justify-center fixed top-0 left-0 h-full w-full bg-black bg-opacity-[90%] z-10">
                    <div className='bg-white flex items-center justify-center py-10 px-5 w-[90%] mt-[80px] md:w-1/3 gap-4 flex-col rounded-lg text-black text-center relative'>
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
                        </div>
                    </div>
                </div>
            }

        </div >
    )
}

export default PreviewInvoice