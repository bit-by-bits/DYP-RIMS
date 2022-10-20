import React from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/profile.module.css";
import { useRouter } from "next/router";

export default function Section(props) {
  const router = useRouter();
  const item = localStorage.getItem("auth_token");

  function add() {
    router.push("/upload");
  }

  function download() {
    axios({
      method: "GET",
      url: `https://rimsapi.journalchecker.com/api/v1/user/download_cv`,
      headers: { Authorization: `Bearer ${item}` },
    }).then(function (response) {
      console.log(response.data);
    });
  }

  return (
    <>
      <div className={styles.profile_section}>
        <div className={styles.profile_grid}>
          <div className={styles.profile_personal}>
            <img
              src="https://source.boringavatars.com/"
              className={styles.profile_img}
            ></img>
            <div className={styles.profile_text}>
              <div className={styles.profile_name}>{localStorage.getItem("name")}</div>

              <div className={styles.profile_degree}>MBBS, M.D.</div>

              <div className={styles.profile_post}>Associate Professor</div>

              <div className={styles.profile_dept}>
                Department of Dermatology
              </div>

              <div className={styles.profile_clg}>
                Dr. D. Y. Patil Medical College
              </div>

              <div className={styles.profile_edit}>Edit Profile Details</div>
            </div>
          </div>

          <div onClick={add} className={styles.profile_btn}>
            Add a file
          </div>

          <div onClick={download} className={styles.profile_btn}>
            Download CV
          </div>
        </div>

        <div className={styles.profile_feats}>
          <Link href="#Publications">
            <div className={styles.profile_feat}>
              <span>49 Publications</span>
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
              <span>12 Awards</span>
            </div>
          </Link>
          <Link href="#Awards & Achievements">
            <div className={styles.profile_feat}>
              <span>12 Awards</span>
            </div>
          </Link>
          <Link href="#Awards & Achievements">
            <div className={styles.profile_feat}>
              <span>12 Awards</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
