import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from "axios";
import * as Sentry from "@sentry/react";

// http
import { HttpError } from "../HttpError/HttpError";

// type
import type { HttpBase } from "./HttpBase";

export class Http implements HttpBase {
  private fetcher: AxiosInstance;

  constructor() {
    this.fetcher = this.initializeAxios();
  }

  async get<Response>(url: string): Promise<Response> {
    try {
      const response = this.fetcher.get(url);

      return response as Response;
    } catch (error) {
      return this.handlePromiseError(error);
    }
  }

  async post<Request, Response>(
    url: string,
    data: Request,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = this.fetcher.post(url, data, config);

      return response as Response;
    } catch (error) {
      return this.handlePromiseError(error);
    }
  }

  async patch<Request, Response>(
    url: string,
    data: Request,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = this.fetcher.patch(url, data, config);

      return response as Response;
    } catch (error) {
      return this.handlePromiseError(error);
    }
  }

  async del<Response>(url: string): Promise<Response> {
    try {
      const response = this.fetcher.delete(url);

      return response as Response;
    } catch (error) {
      return this.handlePromiseError(error);
    }
  }

  private initializeAxios(): AxiosInstance {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 3000,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers["Content-Type"] = "application/json";

        return config;
      },
      (error) => {
        if (isAxiosError(error)) {
          Sentry.captureException(new HttpError(error).toJSON());
        }

        return Promise.reject(error);
      },
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const { status } = error.response;

        if (status === 401) {
          error.config.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer `,
          };

          const response = await axiosInstance.request(error.config);
          const { data } = response;

          return data;
        }

        if (isAxiosError(error)) {
          Sentry.captureException(new HttpError(error).toJSON());
        }

        return Promise.reject(error);
      },
    );

    return axiosInstance;
  }

  private handlePromiseError(e: unknown): Promise<never> {
    if (isAxiosError(e)) {
      Sentry.captureException(new HttpError(e).toJSON());
    }

    return Promise.reject(e);
  }
}
