import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest, ingredientsApiPath } from '../utils/api';

const loadData = createAsyncThunk('ingredients/loadData', async () => {
    const result = await apiRequest(ingredientsApiPath);
    return result.data;
});

const slice = createSlice({
    name: 'ingredients',
    initialState: {
        list: []
    },
    reducers: {
        incrementCount(state, action) {
            state.list.find(ingredient => ingredient._id === action.payload)
                .count++;
        },
        decrementCount(state, action) {
            state.list.find(ingredient => ingredient._id === action.payload)
                .count--;
        },
        clearCounters(state) {
            state.list.forEach(ingredient => (ingredient.count = 0));
        }
    },
    extraReducers: builder => {
        builder.addCase(loadData.pending, state => {
            state.list = [];
        });
        builder.addCase(loadData.fulfilled, (state, action) => {
            state.list = action.payload;
            state.list.forEach(ingredient => (ingredient.count = 0));
        });
        builder.addCase(loadData.rejected, (state, action) => {
            alert('Не удалось загрузить данные');
            console.error(action.error);
        });
    }
});

export { loadData };
export const { incrementCount, decrementCount, clearCounters } = slice.actions;
export default slice.reducer;
