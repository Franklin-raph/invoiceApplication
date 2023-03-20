import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateVendor = createAsyncThunk(
    'vendorUpdateThunk',
    async (payload, thunkAPI) => {
        console.log(...payload)
        // const response = await fetch(`http://localhost:5000/api/v1/auth/updateAccount/${payload._id}`, {
        //     method: "PATCH",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: payload.email,
        //         password: payload.password
        //     })
        // });
        // console.log(response)
        // const data = await response.json();
        // if (!response.ok) {
        //     console.log(data);
        //     return null
        // }
        // if (response.ok) {
        //     localStorage.setItem('vendorInfo', JSON.stringify(data))
        //     location.reload()
        //     console.log(data);
        //     return { data }
        // }
    }
)

export const logoutVendor = () => {
    console.log("logout")
    location.href = '/login'
    localStorage.clear()
}

let logedInVendor = JSON.parse(localStorage.getItem('vendorInfo'))

const initialState = {
    vendorData: logedInVendor ? logedInVendor : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const vendorAuthSlice = createSlice({
    name: "vendorAuth",
    initialState,

    reducers: {
        reset: (state) => {
            state.isError = false,
                state.isSuccess = false,
                state.isLoading = false,
                state.message = ""
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(updateVendor.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateVendor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.vendorData = action.payload
            })
            .addCase(updateVendor.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.vendorData = null
            })
    }
})

export default vendorAuthSlice.reducer
export const { reset } = vendorAuthSlice.actions