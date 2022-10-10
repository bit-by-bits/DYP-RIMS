import Head from "next/head";
import styles from "../styles/upload.module.css";
import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Navbar from "../src/Common/Navbar";

const Upload = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!localStorage.auth_token) router.push("/");
    else {
      const item = localStorage.getItem("auth_token");

      function upload() {
        if (document.getElementById("doi_text").value == "")
          alert("Please enter a DOI first.");
        else
          router.push(
            `/uploading/${document.getElementById("doi_text").value}`
          );
      }

      axios({
        method: "GET",
        url: `https://rimsapi.journalchecker.com/api/v1/publication/upload`,
        headers: { Authorization: `Bearer ${item}` },
      }).then(function (response) {
        localStorage.setItem(
          "authors",
          response.data.authors.substr(2, response.data.authors.length - 4)
        );
      });

      return (
        <>
          <Head>
            <title>Upload</title>
            <link rel="icon" href="logos/qtanea.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />
            <div className={styles.upload_wrapper}>
              <div className={styles.upload_left}>
                <img
                  src="upload/upload.png"
                  className={styles.upload_img}
                ></img>
                <div className={styles.upload_title}>Add a file</div>

                <div className={styles.upload_msg}>
                  Kindly upload a .pdf file.
                </div>

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
                  type="number"
                  id="doi_text"
                  placeholder="Enter DOI"
                  className={styles.upload_input2}
                />
              </div>

              <div className={styles.upload_right}>
                <div className={styles.upload_filters}>
                  <div className={styles.upload_filter}>
                    <div className={styles.heading}>Faculty</div>

                    <div className={styles.option}>
                      <span id="author_text">Dr. Ayush Gupta</span>
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

                <div onClick={upload} className={styles.upload_btn}>
                  Upload
                </div>
              </div>
            </div>
          </main>
        </>
      );
    }
  }
};

export default Upload;
