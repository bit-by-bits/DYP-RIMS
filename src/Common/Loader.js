import React from "react";
import styles from "../../styles/common.module.css";

const Loader = ({ visible }) => {
  return (
    <div
      className={styles.loader_bg}
      style={visible ? { display: "flex" } : { display: "none" }}
    >
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
