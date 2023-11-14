import { AxiosError, AxiosResponse } from "axios";

// util
import { HTTP_STATUS } from "../HttpStatus/HttpStatus";

export class HttpError<T = unknown> extends Error implements AxiosError<T> {
  config;

  code?: string;

  // eslint-disable-next-line
  request?: any;

  response?: AxiosResponse<T>;

  isAxiosError: boolean;

  toJSON: () => object;

  constructor(error: AxiosError<T>, msg?: string) {
    super(msg ?? error.message);

    const errorStatus = error.response?.status ?? 0;

    const errorName: string = (() => {
      switch (errorStatus) {
        case HTTP_STATUS.BAD_REQUEST: {
          return "API Bad Request";
        }

        case HTTP_STATUS.UNAUTHORIZED: {
          return "API Unauthorized Error";
        }

        case HTTP_STATUS.FORBIDEN: {
          return "API Forbidden Error";
        }

        case HTTP_STATUS.NOT_FOUND: {
          return "API NotFound Error";
        }

        case HTTP_STATUS.INTERNAL_SERVER_ERROR: {
          return "API Internal Server Error";
        }

        case HTTP_STATUS.TIME_OUT: {
          return "API Time Out Error";
        }

        default: {
          return "ApiError";
        }
      }
    })();

    this.name = errorName;

    this.stack = error.stack;
    this.config = error.config || undefined;
    this.code = error.code;
    this.request = error.request;
    this.response = error.response;
    this.isAxiosError = error.isAxiosError;

    this.toJSON = error.toJSON;
  }
}
