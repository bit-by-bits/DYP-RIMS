import React from "react";
import styles from "../../styles/uploading.module.css";

export default function Status(props) {
  return (
    <>
      <img src={props.img} className={styles.uploading_img}></img>
      <div className={styles.uploading_head}>
        <span>{props.top}</span>
        <span>{props.bottom}</span>
      </div>
    </>
  );
}
