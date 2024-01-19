import { useState } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      !newPassword ||
      newPassword.trim() === "" ||
      !oldPassword ||
      oldPassword.trim() === ""
    ) {
      // simple field validation
      alert("Wrong inputs!");
    }

    props.onChangePassword({ newPassword, oldPassword });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          value={oldPassword}
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
        />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
