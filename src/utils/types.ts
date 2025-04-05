export type Ingredient = {
    _id: string;
    localId?: string;
    name: string;
    type: IngredientType;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    count: number;
};

export type IngredientType = 'bun' | 'main' | 'sauce';

export type User = {
    email: string;
    name: string;
};

export type UserWithPassword = {
    password?: string;
} & User;

export type RegisterApiRequest = UserWithPassword;
export type LoginApiRequest = {
    email: string;
    password: string;
};
export type EditUserApiRequest = UserWithPassword;

export interface ApiResponseContent {
    success: boolean;
    message: string;
}

export interface TokenResponse extends ApiResponseContent {
    accessToken: string;
    refreshToken: string;
}

export interface IngredientsApiResponse extends ApiResponseContent {
    data: Array<Ingredient>;
}

export interface OrderApiResponse extends ApiResponseContent {
    order: {
        number: number;
    };
}

export interface RegisterApiResponse extends TokenResponse {
    user: User;
}

export interface LoginApiResponse extends TokenResponse {
    user: User;
}

export interface UserResponse extends ApiResponseContent {
    user: User;
}
