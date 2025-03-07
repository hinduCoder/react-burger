import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderApiUrl } from '../utils/api';

const makeOrder = createAsyncThunk(
    'order/submit',
    async (ids, { rejectWithValue }) => {
        try {
            const response = await fetch(orderApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    ingredients: ids
                })
            });
            const result = await response.json();
            if (!result.success) {
                return rejectWithValue(result);
            }
            return result.order.number;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

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
            console.error(action.payload);
        });
    }
});

export { makeOrder };
export const { closeOrderInfo } = slice.actions;
export default slice.reducer;
