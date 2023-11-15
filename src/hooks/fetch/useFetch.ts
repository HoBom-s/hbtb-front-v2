import { useState, useEffect, useCallback } from "react";

// hooks
import { useThrowAsyncError } from "..";

// type
import { Nullable } from "@/types";

/**
 * Suspense의 Fallback Component가 동작 하도록 Promise를 Throw
 *
 * @example
 *      const fetchResult = useFetch(apiFunction, "/url");
 *
 * @param {APIFunction} fetch
 * @param {Params} params
 * @returns {Nullable<FetchResult>}
 */
export const useFetch = <Params, FetchResult>(
  fetch: (params: Params) => Promise<FetchResult>,
  params: Params,
): Nullable<FetchResult> => {
  const [_promise, _setPromise] = useState<Promise<void>>();
  const [_status, _setStatus] = useState<"pending" | "fulfilled" | "error">(
    "pending",
  );
  const [_result, _setResult] = useState<Nullable<FetchResult>>(null);

  const { throwAsyncError } = useThrowAsyncError();

  const resolve = useCallback((result: FetchResult) => {
    _setStatus("fulfilled");
    _setResult(result);
  }, []);

  useEffect(() => {
    _setStatus("pending");

    /**
     * API 통신 도중 Error가 발생할 경우
     * Error Boundary에서 잡아줄 수 있도록 Error handling
     */
    _setPromise(
      fetch(params)
        .then(resolve)
        .catch((e) => throwAsyncError(e)),
    );
  }, [params, fetch, resolve, throwAsyncError]);

  // Promise의 상태가 pending이라면 _promise를 Throw
  if (_status === "pending" && _promise) {
    console.log(_promise);
    throw _promise;
  }

  return _result;
};
