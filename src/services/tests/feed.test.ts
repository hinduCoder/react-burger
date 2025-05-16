import 'jest';
import reducer, { actions } from '../feed';
import { Order, OrderHistoryResponse } from '../../utils/types';

describe('feed reducer tests', () => {
    it('set loading flag on connect', () => {
        const previousState = {
            isLoading: false,
            orders: [],
            total: 0,
            totalToday: 0
        };
        const newState = reducer(previousState, actions.connect());
        expect(newState.isLoading).toBe(true);
    });

    it('resets loading flag on connection opened', () => {
        const previousState = {
            isLoading: true,
            orders: [],
            total: 0,
            totalToday: 0
        };
        const newState = reducer(previousState, actions.onOpen());
        expect(newState.isLoading).toBe(false);
    });

    it('resets loading flag on connection open error', () => {
        const previousState = {
            isLoading: true,
            orders: [],
            total: 0,
            totalToday: 0
        };
        const newState = reducer(previousState, actions.onError());
        expect(newState.isLoading).toBe(false);
    });

    it('handles messages', () => {
        const message: OrderHistoryResponse = {
            success: true,
            message: '',
            orders: [{ name: 'Order1' }, { name: 'Order2' }] as Order[],
            total: 300,
            totalToday: 20
        };
        const previousState = {
            isLoading: false,
            orders: [],
            total: 0,
            totalToday: 0
        };
        const newState = reducer(previousState, actions.onMessage(message));
        expect(newState.orders).toHaveLength(2);
        expect(newState.orders[0].name).toBe('Order1');
        expect(newState.orders[1].name).toBe('Order2');
        expect(newState.total).toBe(300);
        expect(newState.totalToday).toBe(20);
    });
});
