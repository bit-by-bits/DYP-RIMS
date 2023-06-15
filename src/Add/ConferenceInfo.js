import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { InboxOutlined } from "@ant-design/icons";
import ListSection from "../Common/ListSection";
import { Avatar, Card, Modal, Upload, message } from "antd";

const ConferenceInfo = ({ user, setv, ID }) => {
  // STATES

  const { Meta } = Card;
  const { Dragger } = Upload;

  const [data, setData] = useState({});
  const [fileData, setFileData] = useState({ modal: false, file: null });

  const [authors, setAuthors] = useState([]);
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
    getAuthors();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // FUNCTIONS

  const capitalize = str =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "- Not Available -";

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

  const getAuthors = () => {
    setAuthors([
      <Card
        key={0}
        hoverable
        bodyStyle={{ padding: 15, minWidth: 250 }}
        style={{ border: "1px solid #d9d9d9" }}
      >
        <Meta
          title={
            <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
              {user?.name}
            </div>
          }
          description={
            <div style={{ fontSize: "0.8rem" }}>{`${user?.level?.slice(
              0,
              -1
            )} · ${user?.department}`}</div>
          }
          avatar={
            <Avatar
              src={
                user?.picture ??
                "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
              }
            />
          }
        />
      </Card>,
    ]);
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

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Type</span>
                <span className={styles.info_body}>
                  {capitalize(data?.type)}
                </span>
              </div>
            </div>

            <ListSection data={authors} head="Author" />

            {data?.is_paper_presented ? (
              <ListSection data={papers} head="Papers" />
            ) : (
              <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                No Papers Presented
              </div>
            )}

            {data?.is_poster_presented ? (
              <ListSection data={posters} head="Posters" />
            ) : (
              <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                No Posters Presented
              </div>
            )}

            {data?.certificate && (
              <object
                data={data?.certificate}
                type="application/pdf"
                width="100%"
                height="500px"
              >
                <p>
                  Unable to display PDF file.{" "}
                  <a href={data?.certificate}>Download</a> instead.
                </p>
              </object>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConferenceInfo;
