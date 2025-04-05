import { configureStore } from '@reduxjs/toolkit';
import order from './order';
import ingredients from './ingredients';
import burgerConstructor from './burger-constructor';
import auth from './auth';

const store = configureStore({
    reducer: {
        burgerConstructor,
        ingredients,
        order,
        auth
    },
    devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
