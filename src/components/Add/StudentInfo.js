import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { message } from "antd";
import useCaps from "../../utils/useCaps";

const StudentInfo = ({ user, setv, ID }) => {
  // STATES

  const { capitalize } = useCaps();
  const [data, setData] = useState({});

  // EFFECTS

  useEffect(() => {
    if (ID && user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/research/student/?id=${ID}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      })
        .then(res => {
          setv(false);
          setData(res?.data?.data?.[0]);
        })
        .catch(err => {
          console.log(err);
          message.error("Could not fetch file data");
        });
    }
  }, [ID, setv, user]);

  // FUNCTIONS

  return (
    <>
      <div className={styles.file_text}>
        <div
          className={styles.file_title}
          dangerouslySetInnerHTML={{
            __html: data?.student_name ?? "- Not Available -",
          }}
        />

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Degree</span>
                <span className={styles.info_body}>
                  {capitalize(data?.student_degree)}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Thesis Topic</span>
                <span className={styles.info_body}>
                  {capitalize(data?.thesis_topic)}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Year</span>
                <span className={styles.info_body}>
                  {capitalize(data?.year)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentInfo;
