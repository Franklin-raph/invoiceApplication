import { useSelector, useDispatch } from 'react-redux';
import ItemListCard from './ItemListCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ItemListContainer = () => {


    const items = useSelector((state) => state.itemList)
    const clientBill = JSON.parse(localStorage.getItem('clientBill'))
    const { vendorData } = useSelector((state) => state.vendorAuth)

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
    const [itemList, setItemList] = useState(items)
    const [message, setMessage] = useState("")
    const [alertType, setAlertType] = useState("")

    const updatedClientBillInfo = {
        clientName, clientEmail, clientCountry,
        clientCity, clientStreetAddress, clientPostalCode,
        invoiceDate, paymentTerms, productDescription,
        status, itemList
    }

    async function updateClintBillInfo() {
        const res = await fetch(`http://localhost:5000/api/v1/clienbillinfo/updatebillinfo/${billId}`, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${vendorData.token}`
            },
            body: JSON.stringify(updatedClientBillInfo)
        })
        console.log(res)
        //     const res = await fetch("http://localhost:5000/api/v1/clienbillinfo/updatebillinfo/63fd4132c2025f60bfe42019", {
        //         method: "PATCH",
        //         headers: {
        //             'Content-type': "application/json",
        //             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjJjYWE2NGM1OGE3MGU0YTBjMGIxYiIsImlhdCI6MTY3Njg5MjUwNywiZXhwIjoxNjc5NDg0NTA3fQ.Biav40UuiyTOJdswgUkhKMEL7Iikoz_7GG7llQ6dJCM'
        //         },
        //         body: JSON.stringify({
        //             "itemName": "Play Station 5",
        //             "itemQuantity": 3,
        //             "itemPrice": 30,
        //             "total": 90
        //         }, {
        //             "itemName": "Play Station 4",
        //             "itemQuantity": 3,
        //             "itemPrice": 30,
        //             "total": 90
        //         })
        //     })
        //     const data = await res.json()
        //     if (res.ok) {
        //         console.log(data)
        //     }
        //     if (!res.ok) {
        //         console.log("Un Successful")
        //     }
    }

    return (
        <div className="w-[70%] mx-auto my-[4rem]">
            <h1 className='text-left text-white text-2xl font-bold'>Item List <span className='text-[16px] font-normal'>({items.length})</span> </h1>
            {items.map((item) =>
                <div key={item.itemId}>
                    <ItemListCard item={item} />
                </div>
            ).reverse()}
            <div className='text-right'>
                {items.length === 0 ? "" : <button className='ml-[5rem] text-white bg-green-500 px-3 py-2' onClick={updateClintBillInfo}>Submit</button>}
            </div>
        </div>
    )
}

export default ItemListContainer