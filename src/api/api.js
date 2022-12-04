const postLogout = (signal) => cancelablePromise(() => { }, signal);

const getToken = (credentials, signal) => {
    return cancelablePromise(() => ({ token: 'token' }), signal);
}

const cancelablePromise = (cb, signal) => {
    return new Promise((res, rej) => {
        const listener = () => {
            clearTimeout(timeoutId);
            rej(new Error('Aborted'));
        }

        const timeoutId = setTimeout(() => {
            signal?.removeEventListener('abort', listener);
            res(cb());
        }, 1000);

        signal?.addEventListener('abort', listener);
    });
}

export default {getToken, postLogout, cancelablePromise};