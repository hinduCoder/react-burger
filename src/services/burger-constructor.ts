import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v7 as uuid } from 'uuid';
import { Ingredient } from '../utils/types';

const slice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: null as Ingredient | null,
        fillings: [] as Array<Ingredient>
    },
    reducers: {
        setBun(state, action: PayloadAction<Ingredient>) {
            state.bun = action.payload;
        },
        addFilling: {
            reducer(state, action: PayloadAction<Ingredient>) {
                state.fillings.push({
                    ...action.payload
                });
            },
            prepare(payload: Ingredient) {
                const id = uuid();
                return { payload: { ...payload, localId: id } };
            }
        },
        removeFilling(state, action: PayloadAction<string>) {
            state.fillings = state.fillings.filter(
                item => item.localId !== action.payload
            );
        },
        moveFilling(
            state,
            action: PayloadAction<{ fromId: string; toId: string }>
        ) {
            const { fromId, toId } = action.payload;
            const sourceIndex = state.fillings.findIndex(
                ingredient => ingredient.localId === fromId
            );
            const targetIndex = state.fillings.findIndex(
                ingredient => ingredient.localId === toId
            );
            const [movingFilling] = state.fillings.splice(sourceIndex, 1);
            state.fillings.splice(targetIndex, 0, movingFilling);
        },
        clear(state) {
            state.fillings = [];
            state.bun = null;
        }
    }
});

export const { setBun, addFilling, removeFilling, moveFilling, clear } =
    slice.actions;
export default slice.reducer;
