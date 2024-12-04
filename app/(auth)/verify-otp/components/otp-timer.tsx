import { useState, useEffect, useCallback, useMemo } from "react";
import ResendOTP from "./resend-otp";

export function OTPTimer({ otpGeneratedAt }: { otpGeneratedAt: string }) {
  const MemoizedResendOTP = useMemo(() => <ResendOTP />, []);

  const otpDuration = 5 * 60 * 1000;
  const otpExpiresTime = Number(otpGeneratedAt) + otpDuration;

  const [timeLeft, setTimeLeft] = useState(otpExpiresTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(otpExpiresTime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [otpExpiresTime]);

  const formatTime = useCallback(
    (milliseconds: number) => {
      if (milliseconds < 0) {
        return `00:00`;
      }
      const minutes = Math.floor(
        (milliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeLeft]
  );

  if (timeLeft > 0) {
    return (
      <p className="text-sm">
        OTP expires in{" "}
        <i className="text-blue-600 font-semibold">{formatTime(timeLeft)}</i>{" "}
        seconds
      </p>
    );
  }
  return <>{MemoizedResendOTP}</>;
}
