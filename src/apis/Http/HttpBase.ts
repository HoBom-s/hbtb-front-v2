// type
import type { AxiosRequestConfig } from "axios";

export interface HttpBase {
  get<Response>(url: string): Promise<Response>;
  post<Request, Response>(
    url: string,
    data: Request,
    config?: AxiosRequestConfig,
  ): Promise<Response>;
  patch<Request, Response>(
    url: string,
    data: Request,
    config?: AxiosRequestConfig,
  ): Promise<Response>;
  del<Response>(url: string): Promise<Response>;
}
