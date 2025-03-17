import { configureStore } from '@reduxjs/toolkit';
import order from './order';
import ingredients from './ingredients';
import ingredientDetails from './ingredient-details';
import burgerConstructor from './burger-constructor';
import auth from './auth';

export default configureStore({
    reducer: {
        burgerConstructor,
        ingredients,
        ingredientDetails,
        order,
        auth
    },
    devTools: true
});
