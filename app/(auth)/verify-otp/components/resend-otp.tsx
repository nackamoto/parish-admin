"use client";

import { useSearchParams } from "next/navigation";
import { authResendOTP } from "../../_actions";
import { decrypt } from "@/lib/utils";
import { useTransition } from "react";

export default function ResendOTP() {
  const queryParams = useSearchParams();
  const [isResendPending, startResendTransition] = useTransition();

  const rawUid = queryParams.get("uid");

  const uid = rawUid?.replace(/ /g, "+").toString();
  const decryptedUid = decrypt(uid);

  async function handleResendOTP() {
    startResendTransition(async () => {
      await authResendOTP({
        phone_number: decryptedUid,
      });
    });
  }

  return (
    <div className="flex space-x-2 items-center">
      <p className="text-sm">OTP expired, </p>
      <button
        type="button"
        disabled={isResendPending}
        className="text-sm font-semibold disabled:text-blue-600/30 text-blue-600 underline"
        onClick={handleResendOTP}
      >
        Resend OTP
      </button>
    </div>
  );
}
