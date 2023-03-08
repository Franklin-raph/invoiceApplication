import { useSelector, useDispatch } from 'react-redux';
import ItemListCard from './ItemListCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import PreviousItemListComponent from './PreviousItemListComponent';
import LoadingSpinner from '../components/LoaderComponent'


const ItemListContainer = ({ previousItemList, clientBillInfo }) => {
    console.log(clientBillInfo)


    const items = useSelector((state) => state.itemList)
    // const clientBill = JSON.parse(localStorage.getItem('clientBill'))
    const { vendorData } = useSelector((state) => state.vendorAuth)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    // console.log(items)

    const billId = localStorage.getItem('billId')

    const [clientName, setClientName] = useState(clientBillInfo.clientName)
    const [clientEmail, setClientEmail] = useState(clientBillInfo.clientEmail)
    const [clientCountry, setClientCountry] = useState(clientBillInfo.clientCountry)
    const [clientCity, setClientCity] = useState(clientBillInfo.clientCity)
    const [clientStreetAddress, setClientStreetAddress] = useState(clientBillInfo.clientStreetAddress)
    const [clientPostalCode, setClientPostalCode] = useState(clientBillInfo.clientPostalCode)
    const [invoiceDate, setInvoiceDate] = useState(clientBillInfo.invoiceDate)
    const [paymentTerms, setPaymentTerms] = useState(clientBillInfo.paymentTerms)
    const [productDescription, setProductDescription] = useState(clientBillInfo.productDescription)
    const [status, setStatus] = useState(clientBillInfo.status)
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
        setLoading(true)
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/updatebillinfo/${billId}`, {
            method: "PUT",
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${vendorData.token}`
            },
            body: JSON.stringify({ ...updatedClientBillInfo, itemList })
        })
        if (res) {
            setLoading(false)
        }
        const data = await res.json()
        if (res.ok) {
            navigate(`/invoicepreview/${billId}`)
            // console.log(updatedClientBillInfo)
        }
        // console.log(data)
    }

    return (
        <div className="w-[90%] md:w-[80%] mx-auto my-[4rem] relative">
            {loading && <LoadingSpinner />}
            {items &&
                <>
                    <div className='text-white flex items-center justify-between'>
                        <h1 className='text-left text-2xl font-bold'>Item List</h1>
                        <div className='text-[18px] relative flex items-center justify-center'>
                            <i className="ph-shopping-cart text-[35px] md:text-[50px]"></i>
                            <p className="absolute bg-[#7B5EF8] text-[10px] md:text-[14px] rounded-full py-1 px-2 border-2 border-[#141625] top-0 right-0">{(items.length + previousItemList.length)}</p>
                        </div>
                    </div>
                    <p className='text-white text-lg'>Newly Purchased Items <span className='text-[16px] font-normal'>({items.length})</span></p>
                    {items.map((item) =>
                        <div key={item.itemId} className="my-5">
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