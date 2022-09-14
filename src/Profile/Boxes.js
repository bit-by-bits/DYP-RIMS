import React from "react";
import styles from "../../styles/Profile.module.css";

export default function Boxes(props) {
  const box = [];
  for (let a = 0; a < 4; a++) {
    box.push(
      <div key={a} className={styles.profile_body}>
        <div className={styles.profile_topic}>{props.data[a].what}</div>
        <div className={styles.profile_time}>{props.data[a].when}</div>
      </div>
    );
  }

  return (
    <>
      <div id={props.title} className={styles.profile_box}>
        <div className={styles.profile_head}>{props.title}</div>
        <div className={styles.profile_bodygrid}>{box}</div>
      </div>
    </>
  );
}
