import { useState } from 'react'
import InputItemComponent from '../components/InputItemComponent'
import ItemListContainer from '../components/ItemListContainer'

const Itemlist = () => {
    const [itemName, setItemName] = useState("Bag of Rice")
    const [itemQuantity, setItemQuantity] = useState(2)
    const [itemPrice, setItemPrice] = useState(5000)
    const [total, setTotal] = useState(itemQuantity * itemPrice)
    return (
        <div>
            <InputItemComponent setItemName={setItemName} setItemQuantity={setItemQuantity} setItemPrice={setItemPrice} setTotal={setTotal} />
            <ItemListContainer />
        </div>
    )
}

export default Itemlist