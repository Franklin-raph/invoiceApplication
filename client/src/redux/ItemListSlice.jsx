import { createSlice } from '@reduxjs/toolkit'

export const itemListSlice = createSlice({
    name: "itemList",
    initialState: [],
    reducers: {
        incrementItemListArray: (state, action) => {
            state.push(action.payload)
        },
        editItemListArray: (state, action) => {
            console.log(action.payload)
            const { editItemName, editItemPrice, editItemQuantity, editTotal, editItemId } = action.payload;

            const item = state.find((item) => item.itemId === editItemId);
            console.log(item)
            item.itemName = editItemName;
            item.itemPrice = editItemPrice;
            item.itemQuantity = editItemQuantity;
            item.total = editTotal;
        },
        decrementItemListArray: (state, action) => {
            return state.filter((item) => item.itemId !== action.payload);
        },
    },
})

export const { incrementItemListArray, decrementItemListArray, editItemListArray } = itemListSlice.actions

export default itemListSlice.reducer