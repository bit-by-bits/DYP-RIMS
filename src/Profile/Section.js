import Link from "next/link";
import styles from "../../styles/profile.module.css";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";

const Section = ({ user, lengths }) => {
  const [hindex, setHindex] = useState("N/A");
  const [SJR, setSJR] = useState({
    Q1: "N/A",
    Q2: "N/A",
    Q3: "N/A",
    Q4: "N/A",
  });

  useEffect(() => {
    if (user.name) {
      axios({
        method: "GET",
        url: `${URLObj.base}/publication/${user.name}/quartiles`,
      })
        .then(res => setSJR(res.data))
        .catch(err => setSJR({ Q1: "N/A", Q2: "N/A", Q3: "N/A", Q4: "N/A" }));
    }

    if (user.id) {
      let data = new FormData();
      data.append("id", user.id);

      axios({
        method: "POST",
        url: `${URLObj.base}/citation-count/author/`,
        data: data,
      })
        .then(res => setHindex(res.data.h_index))
        .catch(err => setHindex("N/A"));
    }
  }, [user]);

  const edit = () => message.error("Edit functionality is still unavailable");

  return (
    <>
      <div className={styles.profile_section}>
        <div className={styles.profile_grid}>
          <div className={styles.profile_personal}>
            <div className={styles.img_wrapper}>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img alt="user" src={user.picture} />
              }
              <svg className={styles.img_border1} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
              <svg className={styles.img_border2} viewBox="0 0 100 100">
                <path d="M95,50 A45,45 0 0,1 5,50 A45,45 0 0,1 50,5" />
              </svg>
            </div>

            <div className={styles.profile_text}>
              <div className={styles.profile_name}>{user.name}</div>

              <div className={styles.profile_degree}>MBBS, M.D.</div>

              <div className={styles.profile_post}>{user.role}</div>

              <div className={styles.profile_dept}>
                Department of {user.dept}
              </div>

              <div className={styles.profile_clg}>
                Dr. D. Y. Patil Medical College
              </div>

              <div onClick={edit} className={styles.profile_edit}>
                Edit Profile
              </div>
            </div>
          </div>

          <Link href="/upload">
            <div className={styles.profile_btn}>Add Publications</div>
          </Link>
        </div>

        <div className={styles.profile_feats}>
          <a href="#awards" className={styles.profile_feat}>
            <span>Awards: {lengths[0] ?? 0}</span>
          </a>

          <a href="#patents" className={styles.profile_feat}>
            <span>Patents: {lengths[1] ?? 0}</span>
          </a>

          <a href="#conferences" className={styles.profile_feat}>
            <span>Conferences: {lengths[2] ?? 0}</span>
          </a>

          <a href="#publications" className={styles.profile_feat}>
            <span>Publications: {lengths[3] ?? 0}</span>
          </a>

          <a href="#citations" className={styles.profile_feat}>
            <span>Total Citations: 0</span>
          </a>

          <a href="#publications" className={styles.profile_feat}>
            <span>H-Index: {hindex}</span>
          </a>

          <a
            href="#publications"
            style={{ gridColumn: "span 3" }}
            className={styles.profile_feat}
          >
            <span>Cumulative IF: 0 | Average IF: 0</span>
          </a>

          <a
            href="#publications"
            style={{ gridColumn: "span 3" }}
            className={styles.profile_feat}
          >
            <span>
              Q1: {SJR.Q1} | Q2: {SJR.Q2} | Q3: {SJR.Q3} | Q4: {SJR.Q4}
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Section;
