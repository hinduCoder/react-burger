import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    apiRequest,
    registerApiPath,
    loginApiPath,
    userApiPath,
    saveTokens,
    logoutApiPath,
    startResetPasswordApiPath,
    confirmResetPasswordApiPath
} from '../utils/api';

const register = createAsyncThunk('auth/register', async data => {
    const response = await apiRequest(registerApiPath, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    saveTokens(response);
    return response.user;
});

const login = createAsyncThunk('auth/login', async data => {
    const response = await apiRequest(loginApiPath, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    saveTokens(response);
    return response.user;
});

const loadUser = createAsyncThunk('auth/loadUser', async () => {
    const response = await apiRequest(userApiPath, {}, true);
    return response.user;
});

const editUser = createAsyncThunk('auth/editUser', async data => {
    const response = await apiRequest(
        userApiPath,
        {
            method: 'PATCH',
            body: JSON.stringify(data)
        },
        true
    );
    return response.user;
});

const startResetPassword = createAsyncThunk(
    'auth/forgotPassword',
    async email => {
        await apiRequest(startResetPasswordApiPath, {
            method: 'POST',
            body: JSON.stringify({
                email
            })
        });
    }
);

const confirmResetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ password, confirmationCode }) => {
        await apiRequest(confirmResetPasswordApiPath, {
            method: 'POST',
            body: JSON.stringify({
                password,
                token: confirmationCode
            })
        });
    }
);

const logout = createAsyncThunk('auth/logout', async () => {
    await apiRequest(logoutApiPath, {
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
});

const slice = createSlice({
    name: 'auth',
    initialState: {
        userLoaded: false,
        currentUser: null,
        resettingPassword: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(register.pending, state => {});
        builder.addCase(register.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.userLoaded = true;
            state.resettingPassword = false;
        });
        builder.addCase(register.rejected, (state, action) => {
            alert('Ошибка при регистрации пользователя');
            console.error(action.error);
            state.currentUser = null;
        });

        builder.addCase(login.pending, state => {});
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.userLoaded = true;
            state.resettingPassword = false;
        });
        builder.addCase(login.rejected, (state, action) => {
            alert('Не удалось залогиниться');
            console.error(action.error);
            state.currentUser = null;
        });

        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.userLoaded = true;
        });
        builder.addCase(loadUser.rejected, (state, action) => {
            state.currentUser = null;
            state.userLoaded = true;
        });

        builder.addCase(editUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });

        builder.addCase(startResetPassword.fulfilled, state => {
            state.resettingPassword = true;
        });

        builder.addCase(confirmResetPassword.fulfilled, state => {
            state.resettingPassword = false;
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            state.currentUser = null;
        });
    }
});

export {
    register,
    login,
    loadUser,
    editUser,
    startResetPassword,
    confirmResetPassword,
    logout
};
export const {} = slice.actions;
export default slice.reducer;
