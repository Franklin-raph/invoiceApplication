import { configureStore } from '@reduxjs/toolkit'
import vendorAuthReducer from './vendorAuthSlice'
import clientBillReducer from './clientBillSlice'
import ItemListReducer from './ItemListSlice'

export default configureStore({
    reducer: {
        vendorAuth: vendorAuthReducer,
        clientBill: clientBillReducer,
        itemList: ItemListReducer
    },
    extraReducers:{
        
    }
})