import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const makeOrder = createAsyncThunk('order/submit', async (ids) => {
    const response = await fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            ingredients: ids
        })});
    const result = await response.json();
    
    return result.order.number;
})

const slice = createSlice({
    name: 'order',
    initialState: {
        showOrderInfo: false,
        number: null
    },
    reducers: {
        closeOrderInfo(state) {
            state.showOrderInfo = false
        }
    },
    extraReducers: builder => {
        builder.addCase(makeOrder.fulfilled, (state, action) => {
            state.number = action.payload;
            state.showOrderInfo = true;
        })
    }
})

export { makeOrder };
export const { closeOrderInfo } = slice.actions;
export default slice.reducer;