
// export const logout = async (dispatch, signal) => {
//     try {
//         await cancelablePromise(() => { }, signal);
//         dispatch({ type: 'LOGOUT' });
//         localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
//     } catch (error) {
//         dispatch({ type: 'ERROR', error });
//     }
// }

// export const login = async (dispatch, payload, signal) => {
//     try {
//         dispatch({ type: 'LOGIN' });
//         let token = await cancelablePromise(() => ({ token: 'token' }), signal);

//         if (token) {
//             dispatch({ type: 'SUCCESS', payload: token });
//             localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(token));
//             return token;
//         }

//         dispatch({ type: 'ERROR', error: '' });
//         return;

//     } catch (error) {
//         dispatch({ type: 'ERROR', error });
//     }
// }
import {render} from '@testing-library/react'
import { TokenProvider, useTokenDispatch, useTokenState } from "./context";
import { initialState } from "./reducer";

describe('TokenProvider', () => {
    it('provides state and dispatch via context to its children', () => {

        const TestComponent = () => {
            const state = useTokenState();
            const dispatch = useTokenDispatch();

            expect(dispatch).toBeInstanceOf(Function);
            expect(state).toEqual(initialState);
        };

        render(
            <TokenProvider>
                <TestComponent />
            </TokenProvider>,
        );
    });
});