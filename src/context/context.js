import React, { useContext, useReducer } from 'react';
import { TokenReducer, initialState } from './reducer';

const TokenStateContext = React.createContext();
const TokenDispatchContext = React.createContext();

export const useTokenState = () => {
    const context = useContext(TokenStateContext);

    if (context === undefined) {
        throw new Error('useTokenState must be used within a TokenProvider');
    }

    return context;
}

export const useTokenDispatch = () => {
    const context = React.useContext(TokenDispatchContext);

    if (context === undefined) {
        throw new Error("useTokenDispatch must be used within a AuthProvider")
    }

    return context;
}

export const TokenProvider = ({ children }) => {
    const [token, dispatch] = useReducer(TokenReducer, initialState);

    return (
        <TokenStateContext.Provider value={token}>
            <TokenDispatchContext.Provider value={dispatch}>
                {children}
            </TokenDispatchContext.Provider>
        </TokenStateContext.Provider>
    );
}