import { useState } from "react";

interface ThrowAsyncError {
  /**
   * API 통신 도중에 발생한 Error의 경우 ErrorBoundary에서 Catch가 불가능 하므로
   * State의 상태에 강제로 Error를 심어주도록 한다.
   *
   * @param {Error} e
   */
  throwAsyncError: (e: Error) => void;
}

/**
 * Use Throw Async Error Hook
 *      Async Error Boundary에서 Error를 Catch할 수 있도록 하기 위한 Hook
 *
 * Ex) useThrowAsyncError 사용 예시
 *  axios
 *      .get("URL")
 *      .then((data) => ...)
 *      .catch((e) => throwAsyncError(e));
 *
 * @returns {ThrowAsyncError}
 */
export const useThrowAsyncError = (): ThrowAsyncError => {
  const [_, setThrowAsync] = useState<Error | null>(null);

  const throwAsyncError = (error: Error) => {
    setThrowAsync(() => {
      throw error;
    });
  };

  return {
    throwAsyncError,
  };
};
