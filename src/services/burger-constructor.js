import { createSlice } from "@reduxjs/toolkit";

let lastFillingId = 0;

const slice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: null,
        fillings: []
    },
    reducers: {
        setBun: (state, action) => { 
            state.bun = action.payload;
        },
        addFilling: (state, action) => { 
            state.fillings.push({ ...action.payload, localId: lastFillingId++ });
        },
        removeFilling: (state, action) => {
            state.fillings = state.fillings.filter(item => item.localId !== action.payload); 
        }
    }
})

export const { 
    setBun, 
    addFilling, 
    removeFilling 
} = slice.actions;
export default slice.reducer;