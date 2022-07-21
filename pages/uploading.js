import Head from "next/head";
import styles from "../styles/uploading.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import navbar from "./navbar";

const upload = () => {
  return (
    <>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="icon.png" />
      </Head>

      <main className={styles.wrapper}>
        <navbar />
        <div className={styles.upload_section}></div>
      </main>
    </>
  );
};

export default upload;
