import { useSelector, useDispatch } from 'react-redux';
import ItemListCard from './ItemListCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import PreviousItemListComponent from './PreviousItemListComponent';


const ItemListContainer = ({ previousItemList }) => {


    const items = useSelector((state) => state.itemList)
    const clientBill = JSON.parse(localStorage.getItem('clientBill'))
    const { vendorData } = useSelector((state) => state.vendorAuth)
    const navigate = useNavigate()

    // console.log(items)

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
    const [itemList, setItemList] = useState()
    // const [previousItemList, setPreviousItemList] = useState([])
    const [message, setMessage] = useState("")
    const [confirmModal, setConfirmModal] = useState(false)
    const [totalPurchases, setTotalPurchases] = useState(items.length + previousItemList.length)

    const updatedClientBillInfo = {
        clientName, clientEmail, clientCountry,
        clientCity, clientStreetAddress, clientPostalCode,
        invoiceDate, paymentTerms, productDescription,
        status, itemList
    }

    function confirmGoods() {
        setItemList(items.concat(previousItemList))
        setConfirmModal(true)
    }


    // console.log(previousItemList)

    async function updateClintBillInfo() {
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/updatebillinfo/${billId}`, {
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
            // console.log(updatedClientBillInfo)
        }
        // console.log(data)
    }

    return (
        <div className="w-[70%] mx-auto my-[4rem] relative">
            {items &&
                <>
                    <div className='text-white flex items-center justify-between'>
                        <h1 className='text-left text-2xl font-bold'>Item List</h1>
                        <div className='text-[18px] relative flex items-center justify-center'>
                            <i class="ri-shopping-cart-2-fill text-[50px]"></i>
                            <p className="absolute bg-[#7B5EF8] text-[14px] rounded-full py-1 px-2 border-2 border-[#141625] top-0 right-0">{(items.length + previousItemList.length)}</p>
                        </div>
                    </div>
                    <p className='text-white text-lg'>Newly Purchased Items <span className='text-[16px] font-normal'>({items.length})</span></p>
                    {items.map((item) =>
                        <div key={item.itemId}>
                            <ItemListCard item={item} previousItemList={previousItemList} />
                        </div>
                    ).reverse()}
                </>
            }
            {previousItemList &&
                <div className="my-[1rem]">
                    <p className='text-white text-lg'>Previously Purchased Items <span className='text-[16px] font-normal'>({previousItemList.length})</span></p>
                    {previousItemList.map((previousItem) =>
                        <div key={previousItem._id}>
                            <PreviousItemListComponent previousItem={previousItem} previousItemList={previousItemList} />
                        </div>
                    ).reverse()}
                </div>
            }
            <div className='text-right'>
                {items && items.length === 0 ? "" : <button className='text-white bg-green-500 px-3 py-2' onClick={confirmGoods}>Confirm</button>}
            </div>

            {confirmModal &&
                <ConfirmModal setConfirmModal={setConfirmModal} performAction={updateClintBillInfo} header="Confirm" body="Are you sure you want to proceed with payment?" />
            }
        </div>
    )
}

export default ItemListContainer