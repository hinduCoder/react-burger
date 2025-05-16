import 'jest';
import reducer, { makeOrder, closeOrderInfo } from '../order';

describe('order reducer tests', () => {
    it('resets state while loading', () => {
        const previousState = {
            loading: false,
            showOrderInfo: false,
            number: 777
        };
        const newState = reducer(previousState, {
            type: makeOrder.pending.type
        });

        expect(newState.loading).toBe(true);
        expect(newState.showOrderInfo).toBe(true);
        expect(newState.number).toBeNull();
    });

    it('sets order number if loaded successfully', () => {
        const previousState = {
            loading: true,
            showOrderInfo: false,
            number: null
        };
        const newState = reducer(previousState, {
            type: makeOrder.fulfilled.type,
            payload: 12345
        });

        expect(newState.loading).toBe(false);
        expect(newState.showOrderInfo).toBe(true);
        expect(newState.number).toBe(12345);
    });

    it('resets state if order fails', () => {
        window.alert = jest.fn();
        console.error = jest.fn();

        const previousState = {
            loading: true,
            showOrderInfo: true,
            number: null
        };
        const newState = reducer(previousState, {
            type: makeOrder.rejected.type
        });

        expect(newState.loading).toBe(false);
        expect(newState.showOrderInfo).toBe(false);
        expect(newState.number).toBeNull();
    });

    it('resets showOrderInfo flag', () => {
        const previousState = {
            loading: false,
            showOrderInfo: true,
            number: 100
        };
        const newState = reducer(previousState, closeOrderInfo());

        expect(newState.showOrderInfo).toBe(false);
        expect(newState.loading).toBe(false);
        expect(newState.number).toBe(100);
    });
});
