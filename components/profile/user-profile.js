import { useSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { redirect } from "next/navigation";

function UserProfile() {
  // const router = useRouter();
  // Redirect away if NOT auth
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/auth");
  //   }
  // }, [session]);

  // if (!session) {
  //   redirect("/auth");
  // }

  // if (status === "loading") {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
