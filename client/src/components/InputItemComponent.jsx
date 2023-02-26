import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementItemListArray } from '../redux/ItemListSlice';
import Alert from '../components/Alert';
// import { v2 as uuidv4 } from 'uuid';

const InputItemComponent = () => {
    const [itemName, setItemName] = useState("")
    const [itemQuantity, setItemQuantity] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [total, setTotal] = useState()
    const [message, setMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [itemId, setItemId] = useState()
    const dispatch = useDispatch()


    useEffect(() => {
        // console.log(new Date().getTime())
        setItemId(new Date().getTime())
        setTotal(Number(itemQuantity * itemPrice))
        if (itemPrice < 0) {
            setItemPrice(0)
        }
        if (itemQuantity < 0) {
            setItemQuantity(0)
        }
    }, [total, itemQuantity, itemPrice])

    function addItem() {
        if (!itemName || !itemPrice || !itemQuantity || !total) {
            setAlertType("Danger")
            setMessage("Please fill in all fields")
            setTimeout(() => {
                setMessage("")
                setAlertType("")
            }, 3000)
            return
        } else {
            // setItemId(new Date().getTime())
            setItemName("")
            setItemPrice("")
            setItemQuantity("")
            dispatch(incrementItemListArray({ itemName, itemPrice, itemQuantity, total, itemId }))
            console.log({ itemName, itemId })
        }
    }

    return (
        <div className='relative'>
            {message && <Alert message={message} alertType={alertType} />}
            <h1 className='text-center text-white text-2xl font-bold mt-[5rem] mb-3'>Enter Purchased Item Details</h1>
            <div className="flex items-center w-[70%] mx-auto justify-center gap-4 bg-[#1F213A] py-4 rounded-md text-white">
                <div className="block ">
                    <h1>Item Name</h1>
                    <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} className="w-[100%] focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 bg-[#141625]" />
                </div>
                <div className="block  w-[10%]">
                    <h1>Item Qty.</h1>
                    <input type="number" value={itemQuantity} onChange={e => setItemQuantity(e.target.value)} className="focus:outline-none border-gray-800 rounded-[4px] w-[100%] border-[1px] px-3 py-2 bg-[#141625]" />
                </div>
                <div className="block  w-[15%]">
                    <h1>Unit Price</h1>
                    <input type="number" value={itemPrice} onChange={e => setItemPrice(e.target.value)} className="focus:outline-none border-gray-800 rounded-[4px] w-[100%] border-[1px] px-3 py-2 bg-[#141625]" />
                </div>
                <div className="block w-[10%]">
                    <h1>Total Price</h1>
                    <p className="cursor-not-allowed  focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 bg-[#141625]">{total}</p>
                </div>
                <button className='mt-5 rounded-[4px] bg-green-600 px-3 py-2' onClick={addItem} >Add Item</button>
            </div>
        </div>
    )
}

export default InputItemComponent