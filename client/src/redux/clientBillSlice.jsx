import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllBillInfo = createAsyncThunk(
    'getAllBillThunk',
    async (payload, thunkAPI) => {
        const response = await fetch('https://invoice-application-0qd7.onrender.com/api/v1/clienbillinfo/allBillInfo');
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            console.log(data);
            return null
        }
        if (response.ok) {
            console.log(data);
            return { data }
        }
    }
)

const initialState = {
    billData: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
}

export const clientBillSlice = createSlice({
    name: "clientBill",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBillInfo.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getAllBillInfo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.billData = action.payload
            })
            .addCase(getAllBillInfo.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
            })
    }
})

export default clientBillSlice.reducer