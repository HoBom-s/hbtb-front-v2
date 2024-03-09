import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  HttpStatusCode,
  isAxiosError,
} from "axios";

import type { HttpBase } from "./HttpBase";

const RETRY_TIME_COUNT: number = 500;
const AXIOS_TIMEOUT: number = 8000;

export class Http implements HttpBase {
  readonly _instance = Symbol.for("Http");

  private fetcher: AxiosInstance;

  private retryMaxCount: number = 3;

  private retryCount: number = 0;

  constructor() {
    this.fetcher = axios.create({
      baseURL: import.meta.env.VITE_APP_SERVER_HOST,
      timeout: AXIOS_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.fetcher.interceptors.request.use(
      (req) => {
        if (req.data && req.data instanceof FormData) {
          req.headers["Content-Type"] = "multipart/form-data";
        }

        return req;
      },
      (err) => {
        if (isAxiosError(err)) {
          if (err.status === HttpStatusCode.NotFound) {
            alert(
              `Cannot find endpoint :: ${err.config?.baseURL} ${err.config?.url}`,
            );
          }
        } else {
          throw err;
        }
      },
    );

    this.fetcher.interceptors.response.use(
      (res) => {
        this.retryCount = 3;
        return res.data.data;
      },
      (err) => {
        if (isAxiosError(err) && err.response) {
          switch (err.response.status) {
            case HttpStatusCode.BadRequest:
              console.error(`Bad request :: ${err.config?.data}`);
              break;

            case HttpStatusCode.NotFound:
              while (this.retryCount++ < this.retryMaxCount)
                this.backoffRequest(
                  RETRY_TIME_COUNT * this.retryCount,
                  err.config as AxiosRequestConfig,
                );
              break;

            case HttpStatusCode.Unauthorized:
              console.error(`Unauthorized :: ${err.config?.headers}`);
              break;

            case HttpStatusCode.Forbidden:
              console.error(`Forbidden :: ${err.config?.headers}`);
              break;

            case HttpStatusCode.BadGateway:
              while (this.retryCount++ < this.retryMaxCount)
                this.backoffRequest(
                  RETRY_TIME_COUNT * this.retryCount,
                  err.config as AxiosRequestConfig,
                );
              break;

            default:
              console.error(
                `Error :: status: ${err.status} message: ${err.message}`,
              );
              break;
          }
        } else {
          throw err;
        }
      },
    );
  }

  async get<Response>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = await this.fetcher.get(url, config);

      return response as Response;
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async post<Request, Response>(
    url: string,
    body: Request,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = await this.fetcher.post(url, body, config);

      return response as Response;
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async patch<Request, Response>(
    url: string,
    body: Request,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = await this.fetcher.patch(url, body, config);

      return response as Response;
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async del<Response>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = await this.fetcher.delete(url, config);

      return response as Response;
    } catch (err) {
      throw this.handleError(err);
    }
  }

  private handleError(e: unknown): Promise<never> {
    if (isAxiosError(e)) {
      return Promise.reject(new AxiosError(e.message).toJSON());
    }

    return Promise.reject(e);
  }

  private async backoffRequest(times: number, config: AxiosRequestConfig) {
    setTimeout(async () => {
      await this.fetcher.request(config);
    }, times);
  }
}
