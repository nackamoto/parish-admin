export type OTPResponse = {
  success?: boolean;
  status: string;
  tokens: {
    access: string;
    refresh: string;
  };
  user_id: string;
};
