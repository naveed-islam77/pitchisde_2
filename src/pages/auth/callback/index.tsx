import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/supabase/supabaseClient";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function AuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setStatus("error");
        return;
      }
      if (data?.session) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          localStorage.setItem("user", JSON.stringify(user?.user_metadata));
        }
        setStatus("success");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setStatus("error");
        setTimeout(() => router.push("/"), 2000);
      }
    };
    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 mx-auto text-indigo-500 animate-spin" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Confirming your email...
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Please wait while we verify your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Email confirmed!
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              You’ll be redirected to your dashboard shortly.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-12 h-12 mx-auto text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              Something went wrong
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Please try logging in again.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
