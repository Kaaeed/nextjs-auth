import classes from "./notification.module.css";

function Notification(props) {
  const { title, message, status } = props.notification;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  } else if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses =
    statusClasses !== ""
      ? `${classes.notification} ${statusClasses}`
      : `${classes.notification}`;

  return (
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
