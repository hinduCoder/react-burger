import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

const loadData = createAsyncThunk('ingredients/loadData', async (arg, { rejectWithValue }) => {
    try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        if (!result.success) {
            alert('Не удалось загрузить данные');
            console.error(result);
            return rejectWithValue();
        }
        return result.data;
    } catch (e) {
        alert('Не удалось загрузить данные');
        console.error(e);
        return rejectWithValue();
    }
})

const slice = createSlice({
    name: 'ingredients',
    initialState: {
        list: []
    },
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(loadData.fulfilled, (state, action) => {
            state.list = action.payload;            
        })
    }
})

export { loadData };
export default slice.reducer;