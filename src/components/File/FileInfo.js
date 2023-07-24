import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Avatar, Badge, Card, Modal, Upload, message } from "antd";
import useCaps from "../../utils/useCaps";
import Scite from "../Profile/Scite";
import Altmetric from "../Profile/Altmetric";

import scopus from "../../../public/logos/scopus.svg";
import wos from "../../../public/logos/wos.svg";
import crossref from "../../../public/logos/crossref.jpg";
import pmc from "../../../public/logos/pmc.png";
import doaj from "../../../public/logos/doaj.png";
import medline from "../../../public/logos/medline.jpg";
import ListSection from "../Common/ListSection";
import { InboxOutlined } from "@ant-design/icons";

const FileInfo = ({ user, setv, DOI }) => {
  // STATES

  const { Meta } = Card;
  const { Ribbon } = Badge;
  const { Dragger } = Upload;

  const { capitalize } = useCaps();

  const [data, setData] = useState({});
  const [fileData, setFileData] = useState({ modal: false, file: null });

  const [authors, setAuthors] = useState([]);
  const [citations, setCitations] = useState([]);
  const [ids, setIds] = useState([]);
  const [indices, setIndices] = useState([]);
  const [indexes, setIndexes] = useState([]);

  // EFFECTS

  useEffect(() => {
    if (DOI && user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/publications/?doi=${DOI}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      })
        .then(res => {
          setv(false);
          setData(res?.data?.data[0]);
        })
        .catch(err => {
          console.log(err);
          message.error("Could not fetch file data");
        });
    }
  }, [user, setv, DOI]);

  useEffect(() => {
    data && getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    fileData?.file && uploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  // FUNCTIONS

  const getAuthors = () => {
    const ribbon = (i, e) => (
      <Ribbon
        key={i}
        text={
          e.sequence == "first"
            ? "First"
            : e.sequence == "corresponding"
            ? "Corr"
            : e.sequence == "firstncorr"
            ? "First & Corr"
            : ""
        }
        color="#9a2827"
      >
        <Card
          hoverable
          bodyStyle={{ padding: 15, minWidth: 250 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            title={
              <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                {capitalize(e.given + " " + e.family)}
              </div>
            }
            description={
              e.in_dyp
                ? `DPU · ${
                    e.profile?.[0]?.department?.name ?? "- Not Available -"
                  }`
                : ""
            }
            avatar={
              <Avatar
                src={
                  e.profile?.[0]?.profile_picture ??
                  "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                }
              />
            }
          />
        </Card>
      </Ribbon>
    );

    const noRibbon = (i, e) => (
      <Card
        key={i}
        hoverable
        bodyStyle={{ padding: 15, minWidth: 250 }}
        style={{ border: "1px solid #d9d9d9" }}
      >
        <Meta
          title={
            <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
              {capitalize(e.given + " " + e.family)}
            </div>
          }
          description={
            e.in_dyp
              ? `DPU · ${
                  e.profile?.[0]?.department?.name ?? "- Not Available -"
                }`
              : ""
          }
          avatar={
            <Avatar
              src={
                e.profile?.[0]?.profile_picture ??
                "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
              }
            />
          }
        />
      </Card>
    );

    let AUTHORS = data?.actual_author;

    const FIRST = AUTHORS?.find(e => e.sequence == "first");

    if (FIRST?.in_dyp == false) {
      AUTHORS = AUTHORS?.map(e =>
        e.sequence == "first" ? { ...e, sequence: "additional" } : e
      );

      const FIRST_DYP = AUTHORS?.find(e => e.in_dyp == true);

      if (FIRST_DYP) {
        AUTHORS = AUTHORS?.map(e =>
          e.given + " " + e.family == FIRST_DYP.given + " " + FIRST_DYP.family
            ? { ...e, sequence: "first" }
            : e
        );
      }
    }

    setAuthors(
      AUTHORS?.map((e, i) =>
        e.sequence == "first" ||
        e.sequence == "corresponding" ||
        e.sequence == "firstncorr"
          ? ribbon(i, e)
          : noRibbon(i, e)
      )
    );
  };

  const getCitations = () => {
    setCitations(
      [
        { name: "WOS", image: wos },
        { name: "Scopus", image: scopus },
        { name: "Crossref", image: crossref },
      ].map((e, i) => (
        <Card
          key={i}
          hoverable
          bodyStyle={{ padding: 15 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            title={
              <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                {e.name}
              </div>
            }
            description={`${
              data[`citations_${e.name?.toLowerCase()}`]
            } Citation${
              data[`citations_${e.name?.toLowerCase()}`] > 1 ? "s" : ""
            }`}
            avatar={<Avatar src={e.image?.src} />}
          />
        </Card>
      ))
    );
  };

  const getIds = () => {
    setIds(
      [
        {
          name: "PubMed ID",
          value: data?.pubmed_id ?? "- Not Available -",
        },
        {
          name: "DOI ID",
          value: DOI ?? "- Not Available -",
        },
        {
          name: "WOS ID",
          value: data?.wos_id ?? "- Not Available -",
        },
        {
          name: "Scopus ID",
          value: data?.scopus_id ?? "- Not Available -",
        },
      ].map((e, i) => (
        <Card
          key={i}
          hoverable
          bodyStyle={{ padding: 15 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            description={e.value}
            title={
              <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                {e.name}
              </div>
            }
          />
        </Card>
      ))
    );
  };

  const getIndices = () => {
    setIndices(
      [
        {
          name: "Impact Factor",
          value: data?.impact_factor ?? "- Not Available -",
        },
        {
          name: "H-Index",
          value: data?.h_index ?? "- NA -",
        },
        {
          name: "SJR Quartile",
          value: data?.sjr_quartile ?? "- NA -",
        },
        {
          name: "Open Access",
          value: data?.open_access
            ? `${data?.open_access_status
                .at(0)
                ?.toUpperCase()}${data?.open_access_status.slice(1)} Access`
            : "Closed Access",
        },
      ].map((e, i) => (
        <Card
          key={i}
          hoverable
          bodyStyle={{ padding: 20 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            align="center"
            description={
              <div style={{ fontSize: 22, fontWeight: 900, color: "grey" }}>
                {e.value}
              </div>
            }
            title={
              <div style={{ color: "#9a2827", fontSize: 14, marginBottom: -4 }}>
                {e.name}
              </div>
            }
          />
        </Card>
      ))
    );
  };

  const getIndexes = () => {
    setIndexes(
      [
        {
          name: "PubMed",
          logo: pmc,
          bool: data?.in_pubmed,
        },
        {
          name: "Scopus",
          logo: scopus,
          bool: data?.in_scopus,
        },
        {
          name: "DOAJ",
          logo: doaj,
          bool: data?.in_doaj,
        },
        {
          name: "WOS",
          logo: wos,
          bool: data?.in_wos,
        },
        {
          name: "Medline",
          logo: medline,
          bool: data?.in_medline,
        },
      ].map((e, i) => (
        <Card
          key={i}
          hoverable
          bodyStyle={{ padding: 15 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            title={
              <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                {e.name}
              </div>
            }
            description={
              e.bool ? (
                <span style={{ color: "#52c41a" }}>Indexed</span>
              ) : (
                <span style={{ color: "#f5222d" }}>Not Indexed</span>
              )
            }
            avatar={<Avatar src={e.logo?.src} />}
          />
        </Card>
      ))
    );
  };

  const getAll = () => {
    getAuthors();
    getCitations();
    getIds();
    getIndices();
    getIndexes();
  };

  const uploadFile = () => {
    if (user?.token) {
      const str = JSON.stringify({
        doi: DOI,
        file: fileData?.file,
        author: data?.actual_author,
      });

      axios({
        method: "POST",
        url: `${URLObj.base}/publications/`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
          "X-TEST-ENVIRONMENT": "0",
          "Content-Type": "application/json",
        },
        data: str,
      })
        .then(res => {
          message.success("File uploaded successfully");
          setData({ ...data, file: res?.data?.data?.file });
          setFileData({ ...fileData, modal: false });
        })
        .catch(err => {
          message.error("Could not upload file");
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className={styles.file_text}>
        <div className={styles.file_tags}>
          <div className={styles.file_tag1}>
            {data?.publication_type ?? "Unknown Type"}
          </div>

          {data?.file ? (
            <div className={styles.file_tag1}>PDF Available</div>
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
                PDF Not Available (Click To Upload)
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
            __html: data?.publication_title ?? "- Not Available -",
          }}
        />

        {data?.keywords && data?.keywords.length > 0 && (
          <div className={styles.file_keywords}>
            {data?.keywords.map((e, i) => (
              <span key={i} className={styles.file_keyword}>
                {e.display_name}
              </span>
            ))}
          </div>
        )}

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Journal</span>
                <span className={styles.info_body}>
                  {data?.journal_name ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Volume</span>
                <span className={styles.info_body}>
                  {data?.volume ?? "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Issue</span>
                <span className={styles.info_body}>
                  {data?.issue ?? "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Pages</span>
                <span className={styles.info_body}>
                  {data?.pages ?? "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Published</span>
                <span className={styles.info_body}>
                  {data?.year ?? "- NA -"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <ListSection head="Citations" data={citations} />
        <ListSection head="Indexed In" data={indexes} />
        <ListSection head="File IDs" data={ids} />
        <ListSection data={indices} />
        <ListSection head="Authors" data={authors} paginate={true} />

        <div className={`${styles.down} ${styles.file_grid}`}>
          <div className={styles.file_head}>Statistics</div>
          <div className={styles.file_body}>
            <Scite DOI={DOI} type={0} />
            <Altmetric DOI={DOI} type={0} />
          </div>
        </div>

        {data?.abstract && data?.abstract != "" && (
          <div className={styles.abstract}>
            <div className={styles.file_head}>Abstract</div>
            <div className={styles.abs_body}>
              {data?.abstract?.replace(/(<([^>]+)>)/gi, " ") ??
                "- Not Available -"}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FileInfo;
