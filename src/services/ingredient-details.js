import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'ingredientDetails',
    initialState: {
        detailsOpened: false,
        ingredient: null
    },
    reducers: {
        showIngredientInfo(state, action) {
            state.detailsOpened = true;
            state.ingredient = action.payload;
        },
        hideIngredientInfo(state) {
            state.detailsOpened = false;
            state.ingredient = null;
        }
    }
});

export const { showIngredientInfo, hideIngredientInfo } = slice.actions;

export default slice.reducer;
