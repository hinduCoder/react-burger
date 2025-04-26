import { ApiResponseContent, TokenResponse } from './types';

export const apiUrl = 'https://norma.nomoreparties.space/api/';
export const ingredientsApiPath = 'ingredients';
export const orderApiPath = 'orders';
export const registerApiPath = 'auth/register';
export const loginApiPath = 'auth/login';
export const userApiPath = 'auth/user';
export const tokenApiPath = 'auth/token';
export const logoutApiPath = 'auth/logout';
export const startResetPasswordApiPath = 'password-reset';
export const confirmResetPasswordApiPath = 'password-reset/reset';

const hasTokenExpired = (content: ApiResponseContent) => {
    return content.message === 'jwt expired';
};

const checkResponse = <T extends ApiResponseContent>(
    response: Response
): Promise<T> => {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 403) {
        return response.json().then(json => Promise.reject(json));
    }
    return Promise.reject(`Server responded ${response.status}`);
};

const checkSuccess = <T extends ApiResponseContent>(
    response: T
): Promise<T> => {
    if (response && response.success) {
        return Promise.resolve(response);
    }
    return Promise.reject(
        `The response is marked as unsuccessful: ${response}`
    );
};

export async function apiRequest<T extends ApiResponseContent>(
    endpoint: string,
    options: RequestInit = {},
    withAuth: boolean = false
): Promise<T> {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            ...options,
            headers: {
                ...options?.headers,
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: withAuth
                    ? (localStorage.getItem('accessToken') ?? '')
                    : ''
            }
        });
        const content = await checkResponse<T>(response);
        return checkSuccess(content);
    } catch (e) {
        if (hasTokenExpired(e as ApiResponseContent)) {
            const tokenResponse = await apiRequest<TokenResponse>(
                tokenApiPath,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        token: localStorage.getItem('refreshToken')
                    })
                }
            );
            saveTokens(tokenResponse);
            return await apiRequest<T>(endpoint, options, withAuth);
        } else {
            throw e;
        }
    }
}

export const getAccessToken = () => {
    return localStorage.getItem('accessToken')?.replace('Bearer ', '');
};

export const saveTokens = (tokenResponse: TokenResponse) => {
    localStorage.setItem('accessToken', tokenResponse.accessToken);
    localStorage.setItem('refreshToken', tokenResponse.refreshToken);
};
