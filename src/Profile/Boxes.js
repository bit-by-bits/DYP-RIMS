import React from "react";
import styles from "../../styles/profile.module.css";

export default function Boxes(props) {
  const box = [];
  for (let a = 0; a < props.data.length; a++) {
    box.push(
      <div key={a} className={styles.profile_body}>
        <div className={styles.profile_topic}>{props.data[a].title}</div>
        <div className={styles.profile_time}>{props.data[a].year}</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.profile_box}>
        <div className={styles.profile_head}>{props.title}</div>
        <div className={styles.profile_bodygrid}>{box.length ? box : "N/A"}</div>
      </div>
    </>
  );
}
