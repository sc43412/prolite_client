"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-2 text-center">
        <h2>Something went wrong!</h2>
        {loading && <LoaderCircle className="animate-spin" />}
        {!loading && (
          <>
            <Button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => {
                  setLoading(true);
                  reset();
                }
              }
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Try again"
              )}
            </Button>
            <span>or</span>
            <Button
              variant="ghost"
              onClick={() => {
                setLoading(true);
                router.push("/dashboard");
              }}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Go back Home"
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
