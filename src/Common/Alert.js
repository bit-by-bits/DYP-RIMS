import React from "react";
import styles from "../../styles/common.module.css";

const Alert = (props) => {
  const type = [
    styles.simple_alert,
    styles.simple_alert,
    styles.danger_alert,
    styles.warning_alert,
  ];

  return (
    <>
      <div
        style={{ display: props.display }}
        className={`${styles.alert} ${type[props.type]}`}
      >
        <h3 className={styles.head}>{props.text}</h3>
        <a
          onClick={
            (document.querySelector(`.${styles.alert}`).style.display = "none")
          }
          className={styles.close}
        >
          <div>&times;</div>
        </a>
      </div>
    </>
  );
};

export default Alert;
