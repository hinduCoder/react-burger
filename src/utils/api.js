export const apiUrl = 'https://norma.nomoreparties.space/api/';
export const ingredientsApiPath = 'ingredients';
export const orderApiPath = 'orders';
export const registerApiPath = 'auth/register';
export const loginApiPath = 'auth/login';
export const userApiPath = 'auth/user';
export const tokenApiPath = 'auth/token';
export const startResetPasswordApiPath = 'password-reset';
export const confirmResetPasswordApiPath = 'password-reset/reset';

const hasTokenExpired = content => {
    return content.message === 'jwt expired';
};

const checkResponse = response => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 403) {
        return response.json().then(json => Promise.reject(json));
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

export const apiRequest = async (endpoint, options, withAuth = false) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            ...options,
            headers: {
                ...options?.headers,
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: withAuth
                    ? localStorage.getItem('accessToken')
                    : null
            }
        });
        const content = await checkResponse(response);
        return await checkSuccess(content);
    } catch (e) {
        if (hasTokenExpired(e)) {
            const tokenResponse = await apiRequest(tokenApiPath, {
                method: 'POST',
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken')
                })
            });
            saveTokens(tokenResponse);
            return await apiRequest(endpoint, options, withAuth);
        }
    }
};

export const saveTokens = tokenResponse => {
    localStorage.setItem('accessToken', tokenResponse.accessToken);
    localStorage.setItem('refreshToken', tokenResponse.refreshToken);
};
