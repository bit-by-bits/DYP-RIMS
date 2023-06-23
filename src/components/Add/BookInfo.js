import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Image, message } from "antd";

const BookInfo = ({ user, setv, ID }) => {
  // STATES

  const [data, setData] = useState({});

  // EFFECTS

  useEffect(() => {
    if (ID && user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/books/?id=${ID}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      })
        .then(res => {
          setv(false);
          setData(res?.data?.volumeInfo);
        })
        .catch(err => {
          console.log(err);
          message.error("Could not fetch file data");
        });
    }
  }, [ID, user, setv]);

  // FUNCTIONS

  return (
    <>
      <div className={styles.file_text}>
        <div className={styles.file_tags}>
          <div className={styles.file_tag1}>
            {data?.printType ?? "Unknown Type"}
          </div>

          {data?.imageLinks?.thumbnail ? (
            <div className={styles.file_tag2}>Image Available</div>
          ) : (
            <div
              className={styles.file_tag2}
              style={{
                cursor: "pointer",
                backgroundColor: "#f5222d",
                borderColor: "#d80b16",
              }}
            >
              Image Not Available
            </div>
          )}
        </div>

        <div
          className={styles.file_title}
          dangerouslySetInnerHTML={{
            __html: data?.title ?? "- Not Available -",
          }}
        />

        {data?.subtitle && (
          <div
            className={styles.file_subtitle}
            dangerouslySetInnerHTML={{
              __html: data?.subtitle ?? "- Not Available -",
            }}
          />
        )}

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>ID</span>
                <span className={styles.info_body}>
                  {ID ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Publisher</span>
                <span className={styles.info_body}>
                  {data?.publisher ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Language</span>
                <span className={styles.info_body}>
                  {data?.language ?? "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Pages</span>
                <span className={styles.info_body}>
                  {data?.pageCount ?? "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Published</span>
                <span className={styles.info_body}>
                  {data?.publishedDate ?? "- NA -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Authors</span>
                <span className={styles.info_body}>
                  {data?.authors?.map(e => e).join(", ") ?? "- NA -"}
                </span>
              </div>
            </div>

            {data?.imageLinks?.thumbnail && (
              <Image
                style={{ margin: "10px 0", maxHeight: 400 }}
                alt={data?.title ?? "- Not Available -"}
                src={data?.imageLinks?.thumbnail}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookInfo;
