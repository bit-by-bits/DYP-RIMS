import React from "react";
import Link from "next/link";
import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";

export default function Section(props) {
  const router = useRouter();

  function add() {
    router.push("/upload");
  }

  console.log(props.data);
  return (
    <>
      <div className={styles.profile_section}>
        <div className={styles.profile_grid}>
          <div className={styles.profile_personal}>
            <img src="doctah.png" className={styles.profile_img}></img>
            <div className={styles.profile_text}>
              <div className={styles.profile_name}>Dr Aayush Gupta</div>

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

          <div className={styles.profile_btn}>Download CV</div>
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
