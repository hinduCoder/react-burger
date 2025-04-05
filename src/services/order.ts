import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderApiPath, apiRequest } from '../utils/api';
import { OrderApiResponse } from '../utils/types';

const makeOrder = createAsyncThunk(
    'order/submit',
    async (ids: Array<string>) => {
        const result = await apiRequest<OrderApiResponse>(orderApiPath, {
            method: 'POST',
            body: JSON.stringify({
                ingredients: ids
            })
        });
        return result.order.number;
    }
);

const slice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        showOrderInfo: false,
        number: null as number | null
    },
    reducers: {
        closeOrderInfo(state) {
            state.showOrderInfo = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(makeOrder.pending, state => {
            state.showOrderInfo = true;
            state.loading = true;
            state.number = null;
        });
        builder.addCase(
            makeOrder.fulfilled,
            (state, action: PayloadAction<number>) => {
                state.number = action.payload;
                state.showOrderInfo = true;
                state.loading = false;
            }
        );
        builder.addCase(makeOrder.rejected, (state, action) => {
            alert('Не удалось создать заказ');
            console.error(action.error);
            state.loading = false;
            state.showOrderInfo = false;
        });
    }
});

export { makeOrder };
export const { closeOrderInfo } = slice.actions;
export default slice.reducer;
