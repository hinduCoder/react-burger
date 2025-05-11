import 'jest';
import reducer, { loadData } from '../ingredients';
import { Ingredient } from '../../utils/types';

describe('ingredients reducer tests', () => {
    it('loads ingredients', () => {
        const previousState = {
            list: []
        };
        const newState = reducer(previousState, {
            type: loadData.fulfilled.type,
            payload: [
                {
                    name: 'BestBun'
                }
            ]
        });
        expect(newState.list).toHaveLength(1);
        expect(newState.list[0].name).toEqual('BestBun');
    });

    it('resets ingredients', () => {
        const previousState = {
            list: [{ name: 'old' }] as Ingredient[]
        };
        const newState = reducer(previousState, {
            type: loadData.pending.type
        });

        expect(newState.list).toHaveLength(0);
    });
});
