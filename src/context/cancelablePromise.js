export const cancelablePromise = (cb, signal) => {
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