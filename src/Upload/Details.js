import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/uploading.module.css";
import Modal from "../Common/Modal";

export default function Details(props) {
  const router = useRouter();

  const [visible, setVisible] = React.useState(false);
  const [modal, setModal] = React.useState({
    text: "",
    title: "",
  });

  function submit() {
    axios({
      method: "POST",
      url: `https://rimsapi.journalchecker.com/api/v1/publication/upload_2/${localStorage.getItem(
        "up_id"
      )}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      data: {
        doi: props.doi,
        authors: localStorage.getItem("up_auth").split(","),
      },
    })
      .then(function (response) {
        props.check(false);
      })
      .catch(function (error) {
        console.log(error);
        const stext = error.response.statusText;

        setVisible(true);
        setModal({
          text: `${error.message}. Please try again.`,
          title: stext != "" ? stext : "An error occurred",
        });
      });
  }

  function cancel() {
    router.push("/upload");
  }

  return (
    <>
      <Modal
        setVisible={setVisible}
        visible={visible}
        text={modal.text}
        title={modal.title}
      />

      <div className={styles.uploading_msg}>
        <img src={props.alert} className={styles.uploading_alert} />
        <span>You are uploading abcde.pdf</span>
      </div>

      <div className={styles.uploading_flex}>
        <div className={styles.uploading_info}>
          <div className={styles.uploading_title}>Authors</div>
          <div className={styles.uploading_box}>
            {localStorage.getItem("up_auth") == null
              ? "NA"
              : localStorage.getItem("up_auth")}
          </div>
        </div>

        <div className={styles.uploading_info}>
          <div className={styles.uploading_title}>Department</div>
          <div className={styles.uploading_box}>
            {localStorage.getItem("up_dept") == null
              ? "NA"
              : localStorage.getItem("up_dept")}
          </div>
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
