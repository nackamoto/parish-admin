import { Suspense } from "react";
import { ResetPasswordForm } from "./_components/set-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
