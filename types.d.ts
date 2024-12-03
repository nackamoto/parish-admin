import { AxiosRequestHeaders } from "axios";

type ServicesType<SData = unknown> = {
  method: `GET` | `POST` | `PUT` | `DELETE`;
  url: string;
  data?: SData;
  headers?: AxiosRequestHeaders;
};

type SuccessResponseType<Data = unknown> = {
  status: "success";
  status_code: 200;
  message: string;
  data: Data; // The actual data returned by the API
};

type ErrorResponseType<Error = unknown> = {
  status: "error";
  status_code: 400 | 401 | 403 | 404 | 500;
  message: string;
  data: Error; // The actual data returned by the API
};

interface GenericType {
  success: boolean;
}
