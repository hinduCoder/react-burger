import { configureStore } from '@reduxjs/toolkit';
import order from './order';
import ingredients from './ingredients';
import burgerConstructor from './burger-constructor';
import auth from './auth';
import { socketMiddleware } from './socket-middleware';
import orderHistory, { actions as orderHistoryActions } from './order-history';
import feed, { actions as feedActions } from './feed';

const store = configureStore({
    reducer: {
        burgerConstructor,
        ingredients,
        order,
        orderHistory,
        feed,
        auth
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            socketMiddleware(
                'https://norma.nomoreparties.space/orders/all',
                feedActions
            ),
            socketMiddleware(
                'https://norma.nomoreparties.space/orders',
                orderHistoryActions,
                true
            )
        ),
    devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
