import { useState, useRef, useEffect } from "react";
import classes from "./auth-form.module.css";
import Notification from "../../ui/notification";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

const getNotificationObject = (requestStatus, requestError) => {
  let notification;

  switch (requestStatus) {
    case "pending":
      notification = {
        status: "pending",
        title: "Sending request...",
        message: "Your request is on the way!",
      };
      break;
    case "success":
      notification = {
        status: "success",
        title: "Success!",
        message: "Request sent successfully!",
      };
      break;
    case "error":
      notification = {
        status: "error",
        title: "Error!",
        message: requestError,
      };
      break;
  }

  return notification;
};

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const formRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [requestStatus, setRequestStatus] = useState(); // "pending", "success", "error"
  const [requestError, setRequestError] = useState();

  const router = useRouter();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus("");
        setRequestError("");
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Possible to add client side validation

    if (isLogin) {
      // log user in
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        // formRef.current.reset();
        router.replace("/profile");
      } else {
        setRequestError(`${result.error} Wrong credentials!`);
        setRequestStatus("error");
      }
    } else {
      // create a new user
      setRequestStatus("pending");
      try {
        const userData = await createUser(enteredEmail, enteredPassword);
        setRequestStatus("success");
        formRef.current.reset();
      } catch (error) {
        setRequestError(error.message);
        setRequestStatus("error");
      }
    }
  };

  const notification = getNotificationObject(requestStatus, requestError);

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler} ref={formRef}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" disabled={requestStatus === "pending"}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      {notification && <Notification notification={notification} />}
    </section>
  );
}

export default AuthForm;
