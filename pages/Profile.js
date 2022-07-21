import Head from "next/head";
import styles from "../styles/Profile.module.css";
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="icon.png" />
      </Head>
      <main className={styles.wrapper}>
        <Navbar />
      </main>
    </>
  );
};

export default Profile;
