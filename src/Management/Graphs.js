import React, { useState, useEffect } from "react";
import styles from "../../styles/management.module.css";

export default function Graphs() {
  return (
    <>
      <div className={styles.graphs}>
        <div className={styles.graph}></div>
        <div className={styles.graph}></div>
      </div>
    </>
  );
}
