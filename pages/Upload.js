import Head from "next/head";
import styles from "../styles/Upload.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";

const Upload = () => {
  return (
    <>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="icon.png" />
      </Head>

      <main className={styles.wrapper}>
        <Navbar />
        <div className={styles.upload_section}>
          <div className={styles.upload_left}>
            <img src="upload.png" className={styles.upload_img}></img>
            <div className={styles.upload_title}>Add a file</div>
            <div className={styles.upload_msg}>Kindly upload a .pdf file.</div>
            <label htmlFor="file" className={styles.label}>
              <input
                className={styles.upload_input1}
                type="file"
                id="file"
                accept="application/pdf"
              />
              <div className={styles.upload_btn}>Select File</div>
              <div className={styles.upload_text}>No File Selected</div>
            </label>
            <div className={styles.upload_msg}>Or add a file using DOI</div>
            <input
              type="text"
              placeholder="Enter DOI"
              className={styles.upload_input2}
            ></input>
          </div>
          <div className={styles.upload_right}>
            <div className={styles.upload_filters}>
              <div className={styles.upload_filter}>
                <div className={styles.heading}>Faculty</div>
                <div className={styles.option}>
                  <span>Dr. Ayush Gupta</span>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className={styles.down_arr}
                  />
                </div>
              </div>
              <div className={styles.upload_filter}>
                <div className={styles.heading}>Type of Publication</div>
                <div className={styles.option}>
                  <span>Select Type</span>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className={styles.down_arr}
                  />
                </div>
              </div>
            </div>
            <div className={styles.upload_btn}>Upload</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Upload;
