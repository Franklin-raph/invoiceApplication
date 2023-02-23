import { configureStore } from '@reduxjs/toolkit'
import vendorAuthReducer from './vendorAuthSlice'
import clientBillReducer from './clientBillSlice'

export default configureStore({
    reducer: {
        vendorAuth: vendorAuthReducer,
        clientBill: clientBillReducer
    }
})