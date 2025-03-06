import { createSlice } from "@reduxjs/toolkit";

let lastFillingId = 0;

const slice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: null,
        fillings: []
    },
    reducers: {
        setBun(state, action) { 
            state.bun = action.payload;
        },
        addFilling(state, action) { 
            state.fillings.push({ ...action.payload, localId: lastFillingId++ });
        },
        removeFilling(state, action) {
            state.fillings = state.fillings.filter(item => item.localId !== action.payload);
        },
        moveFilling(state, action) {
            const { fromId, toId } = action.payload;
            const sourceIndex = state.fillings.findIndex(ingredient => ingredient.localId === fromId);
            const targetIndex = state.fillings.findIndex(ingredient => ingredient.localId === toId);
            const [movingFilling] = state.fillings.splice(sourceIndex, 1);
            state.fillings.splice(targetIndex, 0, movingFilling);
        }
    }
})

export const { 
    setBun, 
    addFilling, 
    removeFilling,
    moveFilling
} = slice.actions;
export default slice.reducer;