import Head from "next/head";
import styles from "../styles/file.module.css";
import Link from "next/link";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const file = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="icon.png" />
      </Head>
      <main className={styles.wrapper}>
        <Navbar />
        <div className={styles.file_wrapper}></div>
        <Footer />
      </main>
    </>
  );
};

export default file;
