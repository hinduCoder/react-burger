import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderHistoryResponse } from '../utils/types';

const slice = createSlice({
    name: 'orderHistory',
    initialState: {
        orders: [] as Array<Order>
    },
    reducers: {
        connect(state) {},
        onOpen(state) {},
        onClose(state) {},
        onError(state) {},
        sendMessage(state) {},
        onMessage(state, action: PayloadAction<OrderHistoryResponse>) {
            state.orders = action.payload.orders;
        }
    }
});

export default slice.reducer;

export const actions = slice.actions;

export const { connect } = slice.actions;
