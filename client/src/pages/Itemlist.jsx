import { useState, useEffect } from 'react'
import InputItemComponent from '../components/InputItemComponent'
import ItemListContainer from '../components/ItemListContainer'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Itemlist = () => {

    const { billId } = useParams()

    const [itemName, setItemName] = useState("Bag of Rice")
    const [itemQuantity, setItemQuantity] = useState(2)
    const [itemPrice, setItemPrice] = useState(5000)
    const [total, setTotal] = useState(itemQuantity * itemPrice)
    const [previousItemList, setPreviousItemList] = useState([])

    const { vendorData } = useSelector((state) => state.vendorAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!vendorData) {
            navigate('/')
        } else {
            getClintBillInfo()
        }
    }, [])

    async function getClintBillInfo() {
        const res = await fetch(`https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/billinfo/${billId}`, {
            headers: {
                'Content-type': "application/json",
                Authorization: `Bearer ${vendorData.token}`
            }
        })
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            setPreviousItemList(data.billInfo.itemList)
        }
    }

    return (
        <div>
            <InputItemComponent setItemName={setItemName} setItemQuantity={setItemQuantity} setItemPrice={setItemPrice} setTotal={setTotal} />
            <ItemListContainer previousItemList={previousItemList} />
        </div>
    )
}

export default Itemlist