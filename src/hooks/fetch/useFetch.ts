import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig } from "axios";

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
export const useFetch = <Params extends string, FetchResult>(
  fetch: (params: Params, config?: AxiosRequestConfig) => Promise<FetchResult>,
  params: Params,
  config?: AxiosRequestConfig,
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
    _setPromise(
      fetch(params, config)
        .then(resolve)
        .catch((e) => throwAsyncError(e)),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Promise의 상태가 pending이라면 _promise를 Throw
  if (_status === "pending" && _promise) {
    throw _promise;
  }

  return _result;
};
