import { useState } from 'react';
import { LOCAL_STORAGE_KEY } from '../../local-storage'

export const useToken = () => {
    const getToken = () => {
        const tokenStr = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
        const token = JSON.parse(tokenStr);
        return token?.token;
    }

    const [token, setToken] = useState(getToken);

    const saveToken = (token) => {
        localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, JSON.stringify(token));
        setToken(token.token);
    }

    const removeToken = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
        setToken(null);
    }

    return {
        token,
        saveToken,
        removeToken
    }
}