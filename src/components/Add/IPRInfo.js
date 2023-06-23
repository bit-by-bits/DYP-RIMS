import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Image, message } from "antd";

const IPRInfo = ({ user, setv, ID }) => {
  // STATES

  const [data, setData] = useState({});

  // EFFECTS

  useEffect(() => {
    if (ID && user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/research/IPR/?id=${ID}`,
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
            __html: data?.title_of_ipr ?? "- Not Available -",
          }}
        />

        <div
          className={styles.file_subtitle}
          dangerouslySetInnerHTML={{
            __html: data?.IPR_awarded ?? "- Not Available -",
          }}
        />

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Awarding Agency</span>
                <span className={styles.info_body}>
                  {data?.awarding_agency ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Status</span>
                <span className={styles.info_body}>
                  {data?.status ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Date</span>
                <span className={styles.info_body}>
                  {data?.date_of_publication ?? "- Not Available -"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IPRInfo;
