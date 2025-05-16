import 'jest';
import reducer, {
    setBun,
    addFilling,
    removeFilling,
    moveFilling,
    clear
} from '../burger-constructor';
import { Ingredient } from '../../utils/types';

describe('burger constructor reducer tests', () => {
    it('sets bun', () => {
        const bun: Ingredient = { name: 'Bread' } as Ingredient;
        const previousState = {
            bun: null,
            fillings: []
        };
        const newState = reducer(previousState, setBun(bun));
        expect(newState.bun).toEqual(bun);
    });

    it('adds a filling with localId', () => {
        const filling: Ingredient = { name: 'Fish' } as Ingredient;
        const previousState = {
            bun: null,
            fillings: []
        };
        const newState = reducer(previousState, addFilling(filling));
        expect(newState.fillings).toHaveLength(1);
        expect(newState.fillings[0].name).toBe('Fish');
        expect(newState.fillings[0].localId).toBeDefined();
    });

    it('removes a filling by localId', () => {
        const previousState = {
            bun: null,
            fillings: [{ name: 'Cheese', localId: '123' } as Ingredient]
        };
        const newState = reducer(previousState, removeFilling('123'));
        expect(newState.fillings).toHaveLength(0);
    });

    it('moves a filling from one position to another', () => {
        const previousState = {
            bun: null,
            fillings: [
                { name: 'A', localId: '1' },
                { name: 'B', localId: '2' },
                { name: 'C', localId: '3' }
            ] as Ingredient[]
        };
        const newState = reducer(
            previousState,
            moveFilling({ fromId: '1', toId: '3' })
        );
        expect(newState.fillings[0].localId).toEqual('2');
        expect(newState.fillings[0].name).toEqual('B');
        expect(newState.fillings[1].localId).toEqual('3');
        expect(newState.fillings[1].name).toEqual('C');
        expect(newState.fillings[2].localId).toEqual('1');
        expect(newState.fillings[2].name).toEqual('A');
    });

    it('clears bun and fillings', () => {
        const previousState = {
            bun: { name: 'Bread' } as Ingredient,
            fillings: [{ name: 'Sauce', localId: '123' } as Ingredient]
        };
        const newState = reducer(previousState, clear());
        expect(newState.bun).toBeNull();
        expect(newState.fillings).toHaveLength(0);
    });
});
