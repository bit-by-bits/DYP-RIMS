import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../../styles/uploading.module.css";

export default function Status(props) {
  return (
    <>
      <Image
        alt=""
        width={70}
        height={75}
        src={props.img}
        className={styles.uploading_img}
      />
      <div className={styles.uploading_head}>
        <span>{props.top}</span>
        <span>{props.bottom}</span>
      </div>
    </>
  );
}
