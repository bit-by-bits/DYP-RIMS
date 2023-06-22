import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { InboxOutlined } from "@ant-design/icons";
import ListSection from "../Common/ListSection";
import { Avatar, Card, Modal, Upload, message } from "antd";
import PDFViewer from "../Common/PDFViewer";
import useCapitalize from "../utils/useCapitalize";

const ConferenceInfo = ({ user, setv, ID }) => {
  // STATES

  const { capitalize } = useCapitalize();

  const { Meta } = Card;
  const { Dragger } = Upload;

  const [data, setData] = useState({});
  const [fileData, setFileData] = useState({ modal: false, file: null });

  const [papers, setPapers] = useState([]);
  const [posters, setPosters] = useState([]);

  // EFFECTS

  useEffect(() => {
    if (ID && user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/research/conference/?id=${ID}`,
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

  useEffect(() => {
    if (fileData?.file) {
      const formData = new FormData();
      formData?.append("file", fileData?.file);

      axios({
        method: "POST",
        url: `${URLObj.base}/research/conference/?id=${ID}`,
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
  }, [fileData, user, ID]);

  useEffect(() => {
    getPapers();
    getPosters();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // FUNCTIONS

  const getPapers = () => {
    setPapers(
      data?.papers?.map((e, i) => (
        <Card
          key={i}
          hoverable
          bodyStyle={{ padding: 15 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            title={
              <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                {e.title}
              </div>
            }
            description={<div style={{ fontSize: "0.8rem" }}>{e.date}</div>}
            avatar={<Avatar src={e.paper} />}
          />
        </Card>
      ))
    );
  };

  const getPosters = () => {
    setPosters(
      data?.posters?.map((e, i) => (
        <Card
          key={i}
          hoverable
          bodyStyle={{ padding: 15 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            title={
              <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                {e.title}
              </div>
            }
            description={<div style={{ fontSize: "0.8rem" }}>{e.date}</div>}
            avatar={<Avatar src={e.poster} />}
          />
        </Card>
      ))
    );
  };

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
                style={{
                  cursor: "pointer",
                  backgroundColor: "#f5222d",
                  borderColor: "#d80b16",
                }}
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
            __html: data?.conference_name ?? "- Not Available -",
          }}
        />

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Date</span>
                <span className={styles.info_body}>
                  {`${data?.start_date} to ${data?.end_date}`}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Location</span>
                <span className={styles.info_body}>
                  {capitalize(data?.location)}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Attended As</span>
                <span className={styles.info_body}>
                  {capitalize(data?.attended_as)}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Type</span>
                <span className={styles.info_body}>
                  {capitalize(data?.type)}
                </span>
              </div>
            </div>

            {
              <>
                <br />
                {data?.is_paper_presented ? (
                  <ListSection data={papers} head="Papers" />
                ) : (
                  <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    No Papers Presented
                  </div>
                )}
              </>
            }

            {
              <>
                {data?.is_poster_presented ? (
                  <ListSection data={posters} head="Posters" />
                ) : (
                  <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    No Posters Presented
                  </div>
                )}
                <br />
              </>
            }

            <PDFViewer file={data?.certificate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConferenceInfo;
