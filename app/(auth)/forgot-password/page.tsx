import React, { Suspense } from "react";
import { ForgotPassword } from "./components/forgot-password";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Suspense>
        <ForgotPassword />
      </Suspense>
    </div>
  );
}
