import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Avatar, Badge, Card, message } from "antd";
import Scite from "../Profile/Scite";
import Altmetric from "../Profile/Altmetric";

import scopus from "../../public/logos/scopus.svg";
import wos from "../../public/logos/wos.svg";
import crossref from "../../public/logos/crossref.jpg";
import pmc from "../../public/logos/pmc.png";
import doaj from "../../public/logos/doaj.png";
import medline from "../../public/logos/medline.jpg";
import ListSection from "../Common/ListSection";

const FileInfo = ({ user, setv, DOI }) => {
  // STATES

  const { Meta } = Card;
  const { Ribbon } = Badge;

  const [data, setData] = useState({});

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
    if (data) getAll();
  }, [data]);

  // FUNCTIONS

  const getAuthors = () => {
    const MAIN = data?.author_name?.map(e => (
      <Ribbon key={e.id} text="First" color="#9a2827">
        <Card
          hoverable
          bodyStyle={{ padding: 15, minWidth: 250 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            title={
              <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                {e.user?.first_name + " " + e.user?.last_name}
              </div>
            }
            description={e.department?.name ?? "- Not Available -"}
            avatar={
              <Avatar
                src={
                  e.profile_picture ??
                  "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                }
              />
            }
          />
        </Card>
      </Ribbon>
    ));

    const CORR = data?.corresponding_authors?.map(e => (
      <Ribbon key={e.id} text="Corr" color="#9a2827">
        <Card
          hoverable
          bodyStyle={{ padding: 15, minWidth: 250 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            title={
              <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                {e.user?.first_name + " " + e.user?.last_name}
              </div>
            }
            description={e.department?.name ?? "- Not Available -"}
            avatar={
              <Avatar
                src={
                  e.profile_picture ??
                  "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                }
              />
            }
          />
        </Card>
      </Ribbon>
    ));

    const OTHERS = data?.other_authors?.map((e, i) => (
      <Card
        key={i}
        hoverable
        bodyStyle={{ padding: 15, minWidth: 250 }}
        style={{ border: "1px solid #d9d9d9" }}
      >
        <Meta
          title={
            <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>{e}</div>
          }
          description={"Non-DPU"}
          avatar={
            <Avatar
              src={
                "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
              }
            />
          }
        />
      </Card>
    ));

    const AUTHORS = [];

    if (MAIN?.length > 0) AUTHORS.push(...MAIN);
    if (CORR?.length > 0) AUTHORS.push(...CORR);
    if (OTHERS?.length > 0) AUTHORS.push(...OTHERS);

    setAuthors(AUTHORS);
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
          style={{ border: "1px solid black" }}
        >
          <Meta
            align="center"
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

  return (
    <>
      <div className={styles.file_text}>
        <div className={styles.file_tags}>
          <div className={styles.file_tag1}>
            {data?.publication_type ?? "Unknown Type"}
          </div>

          <div className={styles.file_tag2}>
            {data?.file ? "PDF Available" : "PDF Not Available"}
          </div>
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
        <ListSection head="Authors" data={authors} paginate={true} />

        <div className={`${styles.down} ${styles.file_grid}`}>
          <div className={styles.file_head}>Statistics</div>
          <div className={styles.file_body}>
            <Scite DOI={DOI} type={0} />
            <Altmetric DOI={DOI} type={0} />
          </div>
        </div>

        <ListSection data={indices} />
        <ListSection head="Indexed In" data={indexes} />
        <ListSection head="File IDs" data={ids} />

        {data?.abstract && data?.abstract != "" && (
          <div className={styles.abstract}>
            <div className={styles.file_head}>Abstract</div>
            <div className={styles.abs_body}>
              {data?.abstract ?? "- Not Available -"}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FileInfo;
