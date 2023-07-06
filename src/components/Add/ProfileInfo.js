import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Image, message } from "antd";
import useCaps from "../../utils/useCaps";

const ProfileInfo = ({ data }) => {
  // STATES

  const { capitalize } = useCaps();

  // EFFECTS

  // FUNCTIONS

  return (
    <>
      <div className={styles.file_text}>
        <div
          className={styles.file_title}
          dangerouslySetInnerHTML={{
            __html:
              data?.user?.first_name + " " + data?.user?.last_name ??
              "- Not Available -",
          }}
        />

        <div
          className={styles.file_subtitle}
          dangerouslySetInnerHTML={{
            __html: data?.user?.username ?? "- Not Available -",
          }}
        />

        {data?.profile_picture && (
          <Image
            style={{ margin: "10px 0", maxHeight: 400 }}
            alt={data?.username ?? "- Not Available -"}
            src={data?.profile_picture}
          />
        )}

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Email</span>
                <span className={styles.info_body}>
                  {data?.user?.email ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Department</span>
                <span className={styles.info_body}>
                  {capitalize(data?.department?.name) ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Gender</span>
                <span className={styles.info_body}>
                  {data?.gender ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Age</span>
                <span className={styles.info_body}>
                  {data?.age ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Mobile</span>
                <span className={styles.info_body}>
                  {data?.mobile ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Designation</span>
                <span className={styles.info_body}>
                  {data?.designation ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Access Level</span>
                <span className={styles.info_body}>
                  {`${data?.access_level?.[0]?.display_text} (${data?.access_level?.[0]?.level_name})` ??
                    "- Not Available -"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
