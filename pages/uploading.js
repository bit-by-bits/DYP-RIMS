import Head from "next/head";
import styles from "../styles/uploading.module.css";
import React from "react";
import Navbar from "./navbar";

const upload = () => {
  return (
    <>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="icon.png" />
      </Head>

      <main className={styles.wrapper}>
        <Navbar />
        <div className={styles.uploading_wrapper}>
          <img src="uploading.png" className={styles.uploading_img}></img>
          <div className={styles.uploading_head}>
            <span>Your file is being uploaded to RIMS.</span>
            <span>Kindly confirm and edit the follwing details.</span>
          </div>
          <div className={styles.uploading_msg}>
            <img src="alert.png" className={styles.uploading_alert} />
            <span>You are uploading abcde.pdf</span>
          </div>
          <div className={styles.uploading_flex}>
            <div className={styles.uploading_info}>
              <div className={styles.uploading_title}>Title</div>
              <div className={styles.uploading_box}>
                Quality of life in acne vulgaris: Relationship to clinical
                severity and demographic data
              </div>
            </div>

            <div className={styles.uploading_info}>
              <div className={styles.uploading_title}>Authors</div>
              <div className={styles.uploading_box}>
                Aayush Gupta, Yugal Kishore Sharma, Kedar Nath Dash, Nitin
                Dinkar Chaudhari, Sumit Jethani
              </div>
            </div>

            <div className={styles.uploading_info}>
              <div className={styles.uploading_title}>DOI</div>
              <div className={styles.uploading_box}>10.5590zzz123456789</div>
            </div>
          </div>
          <div className={styles.uploading_btns}>
            <div className={styles.uploading_btn1}>Cancel</div>
            <div className={styles.uploading_btn2}>Upload</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default upload;
