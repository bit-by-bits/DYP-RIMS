import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Image, Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const ProjectInfo = ({ user, setv, ID }) => {
  // STATES

  const [data, setData] = useState({});

  // EFFECTS

  useEffect(() => {
    if (ID && user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/research/project/?id=${ID}`,
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
            __html: data?.project_title ?? "- Not Available -",
          }}
        />

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Principal Investigator</span>
                <span className={styles.info_body}>
                  {data?.principal_investigator ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Co Investigator</span>
                <span className={styles.info_body}>
                  {data?.co_investigator ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Date</span>
                <span className={styles.info_body}>
                  {(data?.date ||
                    `${data?.starting_date} to ${data?.end_date}`) ??
                    "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Duration</span>
                <span className={styles.info_body}>
                  {data?.duration ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Type</span>
                <span className={styles.info_body}>
                  {data?.type ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Funding Agency</span>
                <span className={styles.info_body}>
                  {data?.funding_agency ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Country</span>
                <span className={styles.info_body}>
                  {data?.country_funding_agency ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Funds</span>
                <span className={styles.info_body}>
                  {`₹${
                    data?.funds ? (isNaN(data?.funds) ? 0 : data?.funds) : 0
                  } Lakhs`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
