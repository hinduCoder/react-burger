import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest, registerApiPath, loginApiPath } from '../utils/api';

const register = createAsyncThunk('auth/register', async data => {
    const response = await apiRequest(registerApiPath, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
});

const login = createAsyncThunk('auth/login', async data => {
    const response = await apiRequest(loginApiPath, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
});

const slice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(register.pending, state => {});
        builder.addCase(register.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
        builder.addCase(register.rejected, (state, action) => {
            alert('Ошибка при регистрации пользователя');
            console.error(action.error);
            state.currentUser = null;
        });

        builder.addCase(login.pending, state => {});
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            alert('Не удалось залогиниться');
            console.error(action.error);
            state.currentUser = null;
        });
    }
});

export { register, login };
export const {} = slice.actions;
export default slice.reducer;
