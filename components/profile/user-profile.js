import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

const sendPasswords = async (passwords) => {
  const response = await fetch("/api/user/change-password", {
    method: "PATCH",
    body: JSON.stringify(passwords),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    // throw new Error(data.message || "Could not send the data to the server.");
    console.log(data);
  }
};

function UserProfile() {
  // COMMENTED THIS BLOCK OF CODE OUT BECAUSE THE REDIRECTION HANDLING WAS MOVED TO THE SERVER SIDE
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
      <ProfileForm onChangePassword={sendPasswords} />
    </section>
  );
}

UserProfile.auth = {};

export default UserProfile;
