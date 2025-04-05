import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
import {
    EditUserApiRequest,
    LoginApiRequest,
    LoginApiResponse,
    RegisterApiRequest,
    RegisterApiResponse,
    User,
    UserResponse
} from '../utils/types';

const register = createAsyncThunk(
    'auth/register',
    async (data: RegisterApiRequest) => {
        const response = await apiRequest<RegisterApiResponse>(
            registerApiPath,
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
        saveTokens(response);
        return response.user;
    }
);

const login = createAsyncThunk('auth/login', async (data: LoginApiRequest) => {
    const response = await apiRequest<LoginApiResponse>(loginApiPath, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    saveTokens(response);
    return response.user;
});

const loadUser = createAsyncThunk('auth/loadUser', async () => {
    const response = await apiRequest<UserResponse>(userApiPath, {}, true);
    return response.user;
});

const editUser = createAsyncThunk(
    'auth/editUser',
    async (data: EditUserApiRequest) => {
        const response = await apiRequest<UserResponse>(
            userApiPath,
            {
                method: 'PATCH',
                body: JSON.stringify(data)
            },
            true
        );
        return response.user;
    }
);

const startResetPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string) => {
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
    async ({
        password,
        confirmationCode
    }: {
        password: string;
        confirmationCode: string;
    }) => {
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
        currentUser: null as User | null,
        resettingPassword: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            register.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
                state.userLoaded = true;
                state.resettingPassword = false;
            }
        );
        builder.addCase(register.rejected, (state, action) => {
            alert('Ошибка при регистрации пользователя');
            console.error(action.error);
            state.currentUser = null;
            state.userLoaded = false;
        });

        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
                state.userLoaded = true;
                state.resettingPassword = false;
            }
        );
        builder.addCase(login.rejected, (state, action) => {
            alert('Не удалось залогиниться');
            console.error(action.error);
            state.currentUser = null;
            state.userLoaded = false;
        });

        builder.addCase(
            loadUser.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
                state.userLoaded = true;
            }
        );
        builder.addCase(loadUser.rejected, state => {
            state.currentUser = null;
            state.userLoaded = true; //попытка загрузки юзера была, больше не пытаемся
        });

        builder.addCase(
            editUser.fulfilled,
            (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
            }
        );

        builder.addCase(startResetPassword.fulfilled, state => {
            state.resettingPassword = true;
        });

        builder.addCase(confirmResetPassword.fulfilled, state => {
            state.resettingPassword = false;
        });

        builder.addCase(logout.fulfilled, state => {
            state.currentUser = null;
            state.userLoaded = false;
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

export default slice.reducer;
