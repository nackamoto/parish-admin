import { Separator } from "@/app/components/ui/separator";
// import { AccountForm } from "./_components/account-form";
import { AccountResetPassword } from "./_components/reset-password";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6 flex min-h-svh w-full flex-col">
      <div>
        <h3 className="text-2xl font-bold ">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      {/* <AccountForm /> */}
      <AccountResetPassword />
    </div>
  );
}
