import { LOCAL_STORAGE_TOKEN_KEY } from './local-storage';

let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)).token
    : '';

export const initialState = {
    token: '' || token,
    isLoading: false,
    error: null
}

export const TokenReducer = (initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            console.log('LOGIN');
            return { ...initialState, isLoading: true };
        case "SUCCESS":
            console.log('SUCCESS');
            return { ...initialState, token: action.payload.token, isLoading: false };
        case "LOGOUT":
            console.log('LOGOUT');
            return { ...initialState, token: '' };
        case "ERROR":
            console.log('ERROR');
            return { ...initialState, isLoading: false, error: action.error };
        default:
            throw new Error(`no ${action.type} action`)
    }
}