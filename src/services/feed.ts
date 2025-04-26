import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderHistoryResponse } from '../utils/types';

const slice = createSlice({
    name: 'feed',
    initialState: {
        isLoading: false,
        orders: [] as Array<Order>,
        total: 0,
        totalToday: 0
    },
    reducers: {
        connect(state) {
            state.isLoading = true;
        },
        onOpen(state) {
            state.isLoading = false;
        },
        onClose(state) {},
        onError(state) {
            state.isLoading = false;
        },
        sendMessage(state) {},
        onMessage(state, action: PayloadAction<OrderHistoryResponse>) {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
});

export default slice.reducer;

export const actions = slice.actions;

export const { connect } = slice.actions;
