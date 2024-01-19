import { useEffect } from "react";
import AuthForm from "../components/auth/auth-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [router, session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
