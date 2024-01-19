import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AppAuth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth");
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return children;
}

export default AppAuth;
