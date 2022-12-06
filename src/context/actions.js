import { LOCAL_STORAGE_TOKEN_KEY } from "./local-storage";
import { cancelablePromise } from "./cancelablePromise";

export const logout = async (dispatch, signal) => {
    try {
        await cancelablePromise(() => { }, signal);
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    } catch (error) {
        dispatch({ type: 'ERROR', error });
    }
}

export const login = async (dispatch, payload, signal) => {
    try {
        dispatch({ type: 'LOGIN' });
        let token = await cancelablePromise(() => ({ token: 'token' }), signal);

        if (token) {
            dispatch({ type: 'SUCCESS', payload: token });
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(token));
            return token;
        }

        dispatch({ type: 'ERROR', error: '' });
        return;

    } catch (error) {
        dispatch({ type: 'ERROR', error });
    }
}