import { useState, useEffect } from 'react'
import InputItemComponent from '../components/InputItemComponent'
import ItemListContainer from '../components/ItemListContainer'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Itemlist = () => {

    const { billId } = useParams()

    const [clientBillInfo, setClientBillInfo] = useState()
    const [itemName, setItemName] = useState("")
    const [itemQuantity, setItemQuantity] = useState()
    const [itemPrice, setItemPrice] = useState()
    const [total, setTotal] = useState(itemQuantity * itemPrice)
    const [previousItemList, setPreviousItemList] = useState()

    const { vendorData } = useSelector((state) => state.vendorAuth)
    const navigate = useNavigate()
    const logedInVendor = localStorage.getItem('vendorInfo')
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!logedInVendor) {
            navigate('/')
        } else {
            getClintBillInfo()
        }
    }, [])

    async function getClintBillInfo() {
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/billinfo/${billId}`, {
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            setPreviousItemList(data.billInfo.itemList)
            setClientBillInfo(data.billInfo)
        }
    }

    return (
        <div>
            <InputItemComponent setItemName={setItemName} setItemQuantity={setItemQuantity} setItemPrice={setItemPrice} setTotal={setTotal} />
            {previousItemList && <ItemListContainer previousItemList={previousItemList} clientBillInfo={clientBillInfo} />}
        </div>
    )
}

export default Itemlist