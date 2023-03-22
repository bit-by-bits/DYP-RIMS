import React, { useState, useEffect } from "react";

import styles from "../../styles/common.module.css";

const Loader = props => {
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
