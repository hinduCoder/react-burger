import 'jest';
import reducer, { actions } from '../order-history';
import { Order, OrderHistoryResponse } from '../../utils/types';

describe('order history reducer tests', () => {
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
            orders: []
        };
        const newState = reducer(previousState, actions.onMessage(message));
        expect(newState.orders).toHaveLength(2);
        expect(newState.orders[0].name).toBe('Order1');
        expect(newState.orders[1].name).toBe('Order2');
    });
});
