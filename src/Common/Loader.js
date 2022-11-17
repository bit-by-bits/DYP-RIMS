import React from "react";
import styles from "../../styles/moader.module.css";

const Loader = (props) => {
  document.querySelector("body").style.overflowY = props.visible
    ? "hidden"
    : "auto";

  return (
    <div
      className={styles.loader_bg}
      style={props.visible ? { display: "flex" } : { display: "none" }}
    >
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
