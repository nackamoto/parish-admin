import { LoginForm } from "@/app/(auth)/login/components/login-form";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
