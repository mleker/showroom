import { cancelablePromise } from './cancelablePromise';

describe('cancelablePromise', () => {
    it('should be fulfilled', () => {
        expect.assertions(1);
        return cancelablePromise(() => 'foo').then((data) => {
            expect(data).toEqual('foo');
        });
    });

    it('should fail with "Aborted" error while aborted', (done) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const errorObj = new Error('Aborted');

        expect.assertions(1);
        expect(cancelablePromise(() => { }, signal)).rejects.toEqual(errorObj);
        controller.abort();
        done();
    });

    it('should not resolve after abortion', (done) => {
        const controller = new AbortController();
        const signal = controller.signal;

        expect.assertions(1);
        const mockCallback = jest.fn();
        cancelablePromise(mockCallback, signal).catch(e => {
            expect(mockCallback).toBeCalledTimes(0);
        });
        controller.abort();
        done();
    });
});