import React, { Suspense } from "react";
import { VerifyOTPForm } from "./components/verify-otp";

export default async function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Suspense>
        <VerifyOTPForm />
      </Suspense>
    </div>
  );
}
