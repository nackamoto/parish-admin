export type TErrorForgotPassword = {
  email_or_phone_number: {
    invalid_email_or_phone: string;
  };
};
export type TSuccessForgotPassword = {
  status: string;
};
