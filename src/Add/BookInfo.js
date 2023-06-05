import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Avatar, Badge, Card, Image, message } from "antd";

const BookInfo = ({ user, setv, ISBN }) => {
  // STATES

  const { Meta } = Card;
  const { Ribbon } = Badge;

  const [data, setData] = useState({});

  // EFFECTS

  useEffect(() => {
    if (ISBN) {
      axios({
        method: "GET",
        url: `${URLObj.base}/books/?isbn=${ISBN}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
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
  }, [ISBN, setv]);

  // FUNCTIONS

  return (
    <>
      <div className={styles.file_text}>
        <div className={styles.file_tags}>
          <div className={styles.file_tag1}>
            {data?.printType ?? "Unknown Type"}
          </div>

          <div className={styles.file_tag2}>
            {data?.imageLinks?.thumbnail
              ? "PDF Available"
              : "PDF Not Available"}
          </div>
        </div>

        <div
          className={styles.file_title}
          dangerouslySetInnerHTML={{
            __html: data?.title ?? "- Not Available -",
          }}
        />

        <div
          className={styles.file_subtitle}
          dangerouslySetInnerHTML={{
            __html: data?.subtitle ?? "- Not Available -",
          }}
        />

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>ISBN</span>
                <span className={styles.info_body}>
                  {ISBN ?? "- Not Available -"}
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

            <Image
              style={{ margin: "10px 0", maxHeight: 400 }}
              alt={data?.title ?? "- Not Available -"}
              src={data?.imageLinks?.thumbnail}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookInfo;
