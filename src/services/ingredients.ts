import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest, ingredientsApiPath } from '../utils/api';
import { Ingredient, IngredientsApiResponse } from '../utils/types';

const loadData = createAsyncThunk('ingredients/loadData', async () => {
    const result = await apiRequest<IngredientsApiResponse>(ingredientsApiPath);
    return result.data;
});

const slice = createSlice({
    name: 'ingredients',
    initialState: {
        list: [] as Array<Ingredient>
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadData.pending, state => {
            state.list = [];
        });
        builder.addCase(loadData.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(loadData.rejected, (state, action) => {
            alert('Не удалось загрузить данные');
            console.error(action.error);
        });
    }
});

export { loadData };
export default slice.reducer;
