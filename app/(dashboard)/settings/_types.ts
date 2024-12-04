export type ResetPasswordErrorType = {
  status: string;
  status_code: number;
  message: string;
  errors: {
    detail: {
      [key: string]: string[];
    };
  };
};
