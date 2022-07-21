import Head from "next/head";
import styles from "../styles/profile.module.css";
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import navbar from "./navbar";

const profile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="icon.png" />
      </Head>
      <main className={styles.wrapper}>
        <navbar />
      </main>
    </>
  );
};

export default profile;
