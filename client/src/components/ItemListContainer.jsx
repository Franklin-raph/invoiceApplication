import { useSelector, useDispatch } from 'react-redux';
import ItemListCard from './ItemListCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

const ItemListContainer = () => {


    const items = useSelector((state) => state.itemList)
    const clientBill = JSON.parse(localStorage.getItem('clientBill'))
    const { vendorData } = useSelector((state) => state.vendorAuth)
    const navigate = useNavigate()

    console.log(items)

    const billId = localStorage.getItem('billId')

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
    const [itemList, setItemList] = useState([])
    const [message, setMessage] = useState("")
    const [confirmModal, setConfirmModal] = useState(false)

    const updatedClientBillInfo = {
        clientName, clientEmail, clientCountry,
        clientCity, clientStreetAddress, clientPostalCode,
        invoiceDate, paymentTerms, productDescription,
        status, itemList
    }

    function confirmGoods() {
        setItemList(items)
        setConfirmModal(true)
    }


    async function updateClintBillInfo() {
        const res = await fetch(`http://localhost:5000/api/v1/clienbillinfo/updatebillinfo/${billId}`, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${vendorData.token}`
            },
            body: JSON.stringify({ ...updatedClientBillInfo, itemList })
        })
        const data = await res.json()
        if (res.ok) {
            navigate(`/invoicepreview/${billId}`)
            console.log(updatedClientBillInfo)
        }
        console.log(data)
    }

    return (
        <div className="w-[70%] mx-auto my-[4rem] relative">
            <h1 className='text-left text-white text-2xl font-bold'>Item List <span className='text-[16px] font-normal'>({items.length})</span> </h1>
            {items.map((item) =>
                <div key={item.itemId}>
                    <ItemListCard item={item} />
                </div>
            ).reverse()}
            <div className='text-right'>
                {/* <button onClick={confirmGoods}>Confirm</button> */}
                {items.length === 0 ? "" : <button className='text-white bg-green-500 px-3 py-2' onClick={confirmGoods}>Confirm</button>}
            </div>

            {confirmModal &&
                <ConfirmModal setConfirmModal={setConfirmModal} performAction={updateClintBillInfo} header="Confirm" body="Are you sure you want to proceed with payment?" />
            }

        </div>
    )
}

export default ItemListContainer