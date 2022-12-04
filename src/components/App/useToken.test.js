import { renderHook, act } from "@testing-library/react";
import { useToken } from "./useToken";
import { LOCAL_STORAGE_KEY } from '../../local-storage';

const TEST_VALUE = { token: "test" };

describe("useToken", () => {
    it("should save token to localStorage", () => {
        const { result } = renderHook(() => useToken());
        const { saveToken } = result.current;

        act(() => saveToken(TEST_VALUE));
        expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN))).toEqual(TEST_VALUE);
    });

    it("should remove token from localStorage", () => {
        const { result } = renderHook(() => useToken());
        const { saveToken, removeToken } = result.current;

        act(() => saveToken(TEST_VALUE));
        act(() => removeToken());

        expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN))).toBeNull;
    });
});