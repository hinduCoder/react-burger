import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'route',
    initialState: {
        redirectedFrom: null
    },
    reducers: {
        saveRoute(state, action) {
            state.redirectedFrom = action.payload;
        },
        clearRoute(state) {
            state.redirectedFrom = null;
        }
    }
});

export const { saveRoute, clearRoute } = slice.actions;
export default slice.reducer;
