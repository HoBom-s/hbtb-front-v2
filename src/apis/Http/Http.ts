import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from "axios";

// http
import { HttpError } from "../HttpError/HttpError";

// utils
import { AUTH_KEY, SessionStorage } from "@/utils";

// types
import type { HttpBase } from "./HttpBase";
import type { Nullable } from "@/types";

export class Http implements HttpBase {
  // 한 번만 다시 재요청 보냄
  private isRerequest: boolean;

  private fetcher: AxiosInstance;

  constructor() {
    this.isRerequest = false;

    this.fetcher = this.initializeAxios();
  }

  async get<Response>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = await this.fetcher.get(url, config);

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
      const response = await this.fetcher.post(url, data, config);

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
      const response = await this.fetcher.patch(url, data, config);

      return response as Response;
    } catch (error) {
      return this.handlePromiseError(error);
    }
  }

  async del<Response>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    try {
      const response = await this.fetcher.delete(url, config);

      return response as Response;
    } catch (error) {
      return this.handlePromiseError(error);
    }
  }

  private initializeAxios(): AxiosInstance {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_APP_SERVER_HOST,
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
          return Promise.reject(new HttpError(error).toJSON());
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

        if (status === 401 && !this.isRerequest) {
          this.isRerequest = true;

          const authToken: Nullable<string> = SessionStorage.getItem(AUTH_KEY);

          error.config.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          };

          const response = await axiosInstance.request(error.config);
          const { data } = response;

          return data;
        }

        if (isAxiosError(error)) {
          return Promise.reject(new HttpError(error).toJSON());
        }

        return Promise.reject(error);
      },
    );

    return axiosInstance;
  }

  private handlePromiseError(e: unknown): Promise<never> {
    if (isAxiosError(e)) {
      return Promise.reject(new HttpError(e).toJSON());
    }

    return Promise.reject(e);
  }
}
