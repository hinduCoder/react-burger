import { configureStore } from "@reduxjs/toolkit";
import order from './order';
import ingredients from "./ingredients";
import ingredientDetails from "./ingredient-details";
import burgerConstructor from "./burger-constructor";

export default configureStore({
    reducer: {
        burgerConstructor,
        ingredients,
        ingredientDetails,
        order
    },
    devTools: true
})