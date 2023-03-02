import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { decrementItemListArray, editItemListArray } from '../redux/ItemListSlice';

const PreviousItemList = ({ previousItem }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editItemName, setEditItemName] = useState(previousItem.itemName);
    const [editItemQuantity, setEditItemQuantity] = useState(previousItem.itemQuantity);
    const [editItemPrice, setEditItemPrice] = useState(previousItem.itemPrice);
    const [editTotal, setEditTotal] = useState(previousItem.total);

    const dispatch = useDispatch()
    const editItemId = previousItem.itemId

    function updateItem(e) {
        e.preventDefault()
        dispatch(editItemListArray({ editTotal, editItemPrice, editItemQuantity, editItemName, editItemId }))
        cancelEdit()
    }

    function cancelEdit() {
        setIsEdit(false);
    }

    useEffect(() => {
        setEditTotal(Number(editItemQuantity * editItemPrice))
        if (editItemPrice < 0) {
            setEditItemPrice(0)
        }
        if (editItemQuantity < 0) {
            setEditItemQuantity(0)
        }
    }, [editTotal, editItemPrice, editItemQuantity])

    return isEdit ?
        (
            <form onSubmit={updateItem} className="flex items-center w-[100%] mx-auto justify-center gap-4 bg-[#1F213A] py-4 rounded-md text-white">
                <div className="block ">
                    <h1>Item Name</h1>
                    <input type="text" value={editItemName} onChange={e => setEditItemName(e.target.value)} className="w-[100%] focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 bg-[#141625]" />
                </div>
                <div className="block  w-[10%]">
                    <h1>Item Qty.</h1>
                    <input type="number" value={editItemQuantity} onChange={e => setEditItemQuantity(e.target.value)} className="focus:outline-none border-gray-800 rounded-[4px] w-[100%] border-[1px] px-3 py-2 bg-[#141625]" />
                </div>
                <div className="block  w-[15%]">
                    <h1>Unit Price</h1>
                    <input type="number" value={editItemPrice} onChange={e => setEditItemPrice(e.target.value)} className="focus:outline-none border-gray-800 rounded-[4px] w-[100%] border-[1px] px-3 py-2 bg-[#141625]" />
                </div>
                <div className="block w-[10%]">
                    <h1>Total Price</h1>
                    <p className="cursor-not-allowed  focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 bg-[#141625]">{editTotal}</p>
                </div>
                <button className='mt-5 rounded-[4px] bg-green-600 px-3 py-2'>Update Item</button>
                <button className='mt-5 rounded-[4px] bg-red-600 px-3 py-2' onClick={cancelEdit}>Cancel</button>
            </form>
        ) : (
            <>
                <div className="my-[1rem] flex items-center justify-center gap-4 bg-[#1F213A] py-4 rounded-md text-white">
                    <div className="block ">
                        <h1>Item Name</h1>
                        <p className="cursor-not-allowed  focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 bg-[#141625]">{previousItem.itemName}</p>
                    </div>
                    <div className="block  w-[10%]">
                        <h1>Item Qty.</h1>
                        <p className="cursor-not-allowed  focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 bg-[#141625]">{previousItem.itemQuantity}</p>
                    </div>
                    <div className="block  w-[15%]">
                        <h1>Unit Price</h1>
                        <p className="cursor-not-allowed  focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 bg-[#141625]">{previousItem.itemPrice}</p>
                    </div>
                    <div className="block w-[10%]">
                        <h1>Total Price</h1>
                        <p className="cursor-not-allowed  focus:outline-none border-gray-800 rounded-[4px] border-[1px] px-3 py-2 bg-[#141625]">{previousItem.total}</p>
                    </div>
                    <div className='flex items-center justify-center gap-4 mt-1'>
                        {/* <i className="ri-edit-box-fill mt-4 rounded-full text-[#1F213A] bg-yellow-500 px-3 py-2 cursor-pointer" onClick={() => setIsEdit(true)}></i>
                        <i onClick={() => dispatch(decrementItemListArray(previousItem.itemId))} className="ri-delete-bin-fill mt-4 rounded-full text-[#1F213A] bg-red-600 px-3 py-2 cursor-pointer"></i> */}
                    </div>
                </div>
            </>
        )
}

export default PreviousItemList