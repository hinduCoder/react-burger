import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsApiUrl } from '../utils/api';

const loadData = createAsyncThunk(
    'ingredients/loadData',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await fetch(ingredientsApiUrl);
            const result = await response.json();
            if (!result.success) {
                return rejectWithValue(result);
            }
            return result.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

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
            console.error(action.payload);
        });
    }
});

export { loadData };
export const { incrementCount, decrementCount } = slice.actions;
export default slice.reducer;
