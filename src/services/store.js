import { configureStore } from '@reduxjs/toolkit';
import order from './order';
import ingredients from './ingredients';
import burgerConstructor from './burger-constructor';
import auth from './auth';
import route from './route';

export default configureStore({
    reducer: {
        burgerConstructor,
        ingredients,
        order,
        auth,
        route
    },
    devTools: true
});
