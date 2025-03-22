export const apiUrl = 'https://norma.nomoreparties.space/api/';
export const ingredientsApiPath = 'ingredients';
export const orderApiPath = 'orders';
export const registerApiPath = 'auth/register';
export const loginApiPath = 'auth/login';
export const userApiPath = 'auth/user';

const checkResponse = response => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Server responded ${response.status}`);
};

const checkSuccess = response => {
    if (response && response.success) {
        return response;
    }
    return Promise.reject(
        `The response is marked as unsuccessful: ${response}`
    );
};

export const apiRequest = (endpoint, options) => {
    return fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers: {
            ...options?.headers,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
        .then(checkResponse)
        .then(checkSuccess);
};
