import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/Uploading.module.css";

export default function Details(props) {
  const router = useRouter();
  function submit() {
    axios({
      method: "POST",
      url: `http://rimsapi.journalchecker.com/api/v1/publication/upload`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      data: { doi: props.doi, authors: props.authors },
    })
      .then(function (response) {
        props.check(false);
      })
      .catch(function (error) {
        alert("Oops! " + error.message + "\nCheck your DOI again.");
      });
  }

  function cancel() {
    router.push("/upload");
  }

  return (
    <>
      <div className={styles.uploading_msg}>
        <img src="../upload/alert.png" className={styles.uploading_alert} />
        <span>You are uploading abcde.pdf</span>
      </div>

      <div className={styles.uploading_flex}>
        <div className={styles.uploading_info}>
          <div className={styles.uploading_title}>Title</div>
          {/* <input type="text" className={styles.uploading_box} placeholder={'Quality of life in acne vulgaris: Relationship to clinical severity and demographic data'} /> */}
          <div className={styles.uploading_box}>
            Quality of life in acne vulgaris: Relationship to clinical severity
            and demographic data
          </div>
        </div>

        <div className={styles.uploading_info}>
          <div className={styles.uploading_title}>Authors</div>
          <div className={styles.uploading_box}>{props.authors}</div>
        </div>

        <div className={styles.uploading_info}>
          <div className={styles.uploading_title}>DOI</div>
          <div className={styles.uploading_box}>{props.doi}</div>
        </div>
      </div>

      <div className={styles.uploading_btns}>
        <div onClick={cancel} className={styles.uploading_btn1}>
          Cancel
        </div>
        <div onClick={submit} className={styles.uploading_btn2}>
          Upload
        </div>
      </div>
    </>
  );
}
