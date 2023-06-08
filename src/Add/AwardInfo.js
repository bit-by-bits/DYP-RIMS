import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Avatar, Card, Image, Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const AwardInfo = ({ user, setv, ID }) => {
  // STATES

  const { Meta } = Card;
  const { Dragger } = Upload;

  const [data, setData] = useState({});
  const [fileData, setFileData] = useState({ modal: false, file: null });

  // EFFECTS

  useEffect(() => {
    if (ID) {
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
  }, [ID, user, setv]);

  useEffect(() => {
    if (fileData?.file) {
      const formData = new FormData();
      formData.append("file", fileData?.file);

      axios({
        method: "POST",
        url: `${URLObj.base}/research/project/?id=${ID}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
        data: formData,
      })
        .then(res => {
          message.success("File uploaded successfully");
          setFileData({ ...fileData, modal: false });
        })
        .catch(err => {
          console.log(err);
          message.error("Could not upload file");
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  // FUNCTIONS

  return (
    <>
      <div className={styles.file_text}>
        <div className={styles.file_tags}>
          <div className={styles.file_tag1}>{data?.type ?? "Unknown Type"}</div>

          {data?.certificate ? (
            <div className={styles.file_tag2}>PDF Available</div>
          ) : (
            <>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setFileData({ ...fileData, modal: true })}
                className={styles.file_tag2}
              >
                PDF Not Available
              </div>

              <Modal
                title="Upload PDF"
                open={fileData?.modal}
                onCancel={() => setFileData({ ...fileData, modal: false })}
                footer={null}
              >
                <Dragger
                  name="file"
                  multiple={false}
                  onChange={info => {
                    const { status } = info.file;
                    if (status !== "uploading") {
                      console.log(info.file, info.fileList);
                    }
                    if (status === "done") {
                      message.success(`${info.file.name} file uploaded.`);

                      setFileData({ ...fileData, file: info.file });
                    } else if (status === "error") {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  }}
                >
                  <InboxOutlined
                    style={{ fontSize: 60, margin: "10px 0", color: "#9a2827" }}
                  />
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </Dragger>
              </Modal>
            </>
          )}
        </div>

        <div
          className={styles.file_title}
          dangerouslySetInnerHTML={{
            __html: data?.project_name ?? "- Not Available -",
          }}
        />

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Date</span>
                <span className={styles.info_body}>
                  {(data?.date ||
                    `${data?.starting_date} to ${data?.end_date}`) ??
                    "- Not Available -"}
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
                  {data?.funds ?? "- Not Available -"}
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

export default AwardInfo;
