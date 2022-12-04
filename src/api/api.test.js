import api from "./api";

describe('getToken', () => {
    it('getToken returns token object', () => {
        expect.assertions(1);
        return api.getToken().then((data) => {
            expect(data).toMatchObject({ token: expect.any(String) });
        });
    })
})

describe('cancelablePromise', () => {
    it('should be fulfilled', () => {
        expect.assertions(1);
        return api.cancelablePromise(() => 'foo').then((data) => {
            expect(data).toEqual('foo');
        });
    });

    it('should fail with "Aborted" error while aborted', (done) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const errorObj = new Error('Aborted');

        expect.assertions(1);
        expect(api.cancelablePromise(() => { }, signal)).rejects.toEqual(errorObj);
        controller.abort();
        done();
    });

    it('should not resolve after abortion', (done) => {
        const controller = new AbortController();
        const signal = controller.signal;

        expect.assertions(1);
        const mockCallback = jest.fn();
        api.cancelablePromise(mockCallback, signal).catch(e => {
            expect(mockCallback).toBeCalledTimes(0);
        });
        controller.abort();
        done();
    });
});