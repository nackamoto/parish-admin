"use client"; // Error boundaries must be Client Components

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    if (session.data?.user?.id) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, session.data?.user?.id]);

  return null;
}
