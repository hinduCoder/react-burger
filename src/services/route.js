import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'route',
    initialState: {
        redirectedFrom: null
    },
    reducers: {
        saveRoute(state, action) {
            state.redirectedFrom = action.payload;
        }
    }
});

export const { saveRoute } = slice.actions;
export default slice.reducer;
