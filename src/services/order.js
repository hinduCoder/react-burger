import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderApiUrl, apiRequest } from '../utils/api';

const makeOrder = createAsyncThunk('order/submit', async ids => {
    const result = await apiRequest(orderApiUrl, {
        method: 'POST',
        body: JSON.stringify({
            ingredients: ids
        })
    });
    return result.order.number;
});

const slice = createSlice({
    name: 'order',
    initialState: {
        showOrderInfo: false,
        number: null
    },
    reducers: {
        closeOrderInfo(state) {
            state.showOrderInfo = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(makeOrder.pending, state => {
            state.showOrderInfo = false;
            state.number = null;
        });
        builder.addCase(makeOrder.fulfilled, (state, action) => {
            state.number = action.payload;
            state.showOrderInfo = true;
        });
        builder.addCase(makeOrder.rejected, (state, action) => {
            alert('Не удалось создать заказ');
            console.error(action.error);
        });
    }
});

export { makeOrder };
export const { closeOrderInfo } = slice.actions;
export default slice.reducer;
