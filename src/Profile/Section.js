import React from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/profile.module.css";
import { useRouter } from "next/router";
import Modal from "../Common/Modal";

export default function Section(props) {
  const router = useRouter();
  const item = localStorage.getItem("auth_token");

  const [visible, setVisible] = React.useState(false);
  const [modal, setModal] = React.useState({
    text: "",
    title: "",
  });

  function edit() {
    setVisible(true);
    setModal({
      text: "It appears that this feature is still unavailable.",
      title: "OOPS!",
    });
  }

  function download() {
    axios({
      method: "GET",
      url: `https://rimsapi.journalchecker.com/api/v1/user/download_cv`,
      headers: { Authorization: `Bearer ${item}` },
    }).then(function (response) {
      setVisible(true);
      setModal({
        text: "Perhaps you haven't posted your CV yet.",
        title: "THERE SEEMS TO be an error",
      });
    });
  }

  return (
    <>
      <div className={styles.profile_section}>
        <Modal
          setVisible={setVisible}
          visible={visible}
          text={modal.text}
          title={modal.title}
        />

        <div className={styles.profile_grid}>
          <div className={styles.profile_personal}>
            <div className={styles.img_wrapper}>
              <img
                className={styles.profile_img}
                src={localStorage.getItem("user_pic")}
              />
              <svg className={styles.img_border1} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
              <svg className={styles.img_border2} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
            </div>

            <div className={styles.profile_text}>
              <div className={styles.profile_name}>
                {localStorage.getItem("user_name")}
              </div>

              <div className={styles.profile_degree}>MBBS, M.D.</div>

              <div className={styles.profile_post}>
                {localStorage.getItem("user_role")}
              </div>

              <div className={styles.profile_dept}>
                Department of {localStorage.getItem("user_dept")}
              </div>

              <div className={styles.profile_clg}>
                Dr. D. Y. Patil Medical College
              </div>

              <div onClick={edit} className={styles.profile_edit}>
                Edit Profile
              </div>
            </div>
          </div>

          <Link href="/journal">
            <div className={styles.profile_btn}>View Journals</div>
          </Link>

          <div onClick={download} className={styles.profile_btn}>
            Download CV
          </div>
        </div>

        <div className={styles.profile_feats}>
          <Link href="#Publications">
            <div className={styles.profile_feat}>
              <span>{props.publs} Publications</span>
            </div>
          </Link>
          <Link href="#Patents">
            <div className={styles.profile_feat}>
              <span>3 Patents</span>
            </div>
          </Link>
          <Link href="#Conferences">
            <div className={styles.profile_feat}>
              <span>17 Conferences</span>
            </div>
          </Link>
          <Link href="#Awards & Achievements">
            <div className={styles.profile_feat}>
              <span>{props.awards} Awards</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
