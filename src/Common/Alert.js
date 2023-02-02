import { check } from "prettier";
import React from "react";
import styles from "../../styles/common.module.css";

const Alert = props => {
  const type = [
    styles.simple_alert,
    styles.success_alert,
    styles.danger_alert,
    styles.warning_alert,
  ];

  props.visible &&
    setTimeout(() => {
      props.setVisible(false);
    }, 3000);

  function hide() {
    props.setVisible(false);
  }

  return (
    <>
      <div
        id="alert"
        style={props.visible ? { display: "flex" } : { display: "none" }}
        className={`${styles.alert} ${type[props.type]}`}
      >
        <h3 className={styles.head}>{props.text}</h3>
        <a onClick={hide} className={styles.close}>
          <div>&times;</div>
        </a>
      </div>
    </>
  );
};

export default Alert;
