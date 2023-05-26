import Head from "next/head";
import React from "react";
import Navbar from "../../src/Common/Navbar";
import Side from "../../src/Common/Side";
import Image from "next/image";
import styles from "../styles/download.module.css";

const Download = () => {
  return (
    <>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <Side />

        <a href="https://www.qtanea.com/" rel="noreferrer" target="_blank">
          <Image
            alt="Q"
            width={60}
            height={60}
            src="/logos/qtanea-colour.png"
          />
        </a>
      </div>
    </>
  );
};

export default Download;
