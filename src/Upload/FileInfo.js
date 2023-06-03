import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, List, Table, message } from "antd";
import Scite from "../Profile/Scite";
import Altmetric from "../Profile/Altmetric";

import scopus from "../../public/logos/scopus.svg";
import wos from "../../public/logos/wos.svg";
import crossref from "../../public/logos/crossref.jpg";

const FileInfo = ({ user, setv, DOI }) => {
  // STATES

  const { Meta } = Card;
  const { Ribbon } = Badge;

  const [data, setData] = useState({});

  const [authors, setAuthors] = useState({ title: [], body: [], final: [] });
  const [citations, setCitations] = useState([]);

  // EFFECTS

  useEffect(() => {
    if (DOI && user?.token) {
      axios({
        method: "PUT",
        url: `${URLObj.base}/publications/?doi=${DOI}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      })
        .then(res => {
          setv(false);
          setData(res?.data?.data);
        })
        .catch(err => {
          console.log(err);
          message.error("Could not fetch file data");
        });
    }
  }, [user, setv, DOI]);

  useEffect(() => {
    if (data) {
      getAuthors(data?.author);
      setCitations(getCitations(data?.indexed_at));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // FUNCTIONS

  const readFirst = arr => (arr?.length > 0 ? arr[0] : "- Not Available -");

  const submit = () => {
    const DATA = JSON.stringify({
      doi: DOI,
      author: authors?.final,
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
      data: DATA,
    })
      .then(res => {
        message.success("Publication Added");
        setv(false);
      })
      .catch(err => {
        message.error("Couldn't Add Publication");
        console.log(err);
      });
  };

  const getAuthors = arr => {
    if (arr?.length > 0) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          width: "8%",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          width: "22%",
          render: text => (
            <div
              style={{ fontWeight: 800, fontSize: "1.1rem", color: "black" }}
            >
              {text}
            </div>
          ),
        },
        {
          title: "Affiliation",
          dataIndex: "affiliation",
          key: "affiliation",
          width: "55%",
        },
      ];

      const BODY = arr.map((e, i) => ({
        key: i,
        no: `${i + 1}.`,
        name: e.given + " " + e.family,
        sequence: e.sequence ?? "additional",
        affiliation:
          e.affiliation?.length > 0
            ? e.affiliation.map(e => e.name).join(", ")
            : "- Not Affiliated -",
      }));

      setAuthors({ title: TITLE, body: BODY, final: arr });
    } else setAuthors({ title: [], body: [], final: [] });
  };

  const getCitations = obj => {
    if (!obj) return [];

    const CITATIONS = [];

    if (obj.in_scopus)
      CITATIONS.push({
        name: "Scopus",
        image: scopus,
        value: obj.in_scopus.citedby_count,
      });

    if (obj.in_crossref)
      CITATIONS.push({
        name: "Crossref",
        image: crossref,
        value: obj.in_crossref.citation_count,
      });

    if (obj.in_wos)
      CITATIONS.push({
        name: "WOS",
        image: wos,
        value: obj.in_wos.citation_count,
      });

    return CITATIONS.map((e, i) => (
      <Card
        key={i}
        hoverable
        bodyStyle={{ padding: 15 }}
        style={{ border: "1px solid #d9d9d9" }}
      >
        <Meta
          title={
            <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>{e.name}</div>
          }
          description={`${e.value} Citation${e.value > 1 ? "s" : ""}`}
          avatar={<Avatar src={e.image?.src} />}
        />
      </Card>
    ));
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
          dangerouslySetInnerHTML={{ __html: readFirst(data?.title) }}
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
                  {readFirst(data?.journal)}
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
                  {data?.page ?? "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Published</span>
                <span className={styles.info_body}>
                  {data?.published_date?.["date-parts"]?.[0]?.[0] ?? "- NA -"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: "100%" }} className={styles.authors}>
          <div className={styles.info_head}>Citations</div>
          <div className={styles.auth_body}>
            <List
              grid={{ gutter: 16 }}
              dataSource={citations}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </div>
        </div>

        <div style={{ width: "100%" }} className={styles.authors}>
          <div className={styles.info_head}>Authors</div>
          <div className={styles.auth_body}>
            <Table
              className="uploadTable"
              rowSelection={{
                type: "checkbox",
                onChange: (selectedRowKeys, selectedRows) => {
                  const FINAL = authors?.final?.map((e, i) => {
                    if (e.sequence == "first")
                      return { ...e, sequence: "first" };
                    else {
                      let status = false;

                      selectedRows.forEach(r => {
                        if (r.name == e.given + " " + e.family) status = true;
                      });

                      if (status) return { ...e, sequence: "corresponding" };
                      else return { ...e, sequence: "additional" };
                    }
                  });

                  console.log(FINAL);
                  setAuthors({ ...authors, final: FINAL });
                },
                getCheckboxProps: r => ({ disabled: r.sequence == "first" }),
                columnTitle: "Select Authors",
                columnWidth: "15%",
              }}
              dataSource={authors?.body}
              columns={authors?.title}
              footer={() => <Button onClick={submit}>Confirm</Button>}
            />
          </div>
        </div>

        <div className={`${styles.down} ${styles.file_grid}`}>
          <div className={styles.file_head}>Statistics</div>
          <div className={styles.file_body}>
            <Scite DOI={DOI} type={0} />
            <Altmetric DOI={DOI} type={0} />
          </div>
        </div>

        {data?.abstract && data?.abstract != "" && (
          <div className={`${styles.smooth} ${styles.abstract}`}>
            <div className={styles.file_head}>Abstract</div>
            <div className={styles.abs_body}>
              {data?.abstract ?? "- Not Available -"}
            </div>
          </div>
        )}

        <div className={styles.file_grid}>
          <div className={styles.smooth}>
            <div className={styles.file_head}>File ID</div>
            <div className={styles.file_body}>
              <div className={styles.file_bodyitem}>
                <div className={styles.file_bodybold}>Pub Med ID</div>
                <div className={styles.file_bodyweak}>
                  {data?.pubmed_id ?? "- Not Available -"}
                </div>
              </div>

              <div className={styles.file_bodyitem}>
                <div className={styles.file_bodybold}>DOI ID</div>
                <div className={styles.file_bodyweak}>
                  {DOI ?? "- Not Available -"}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.smooth}>
            <div className={styles.file_head}>File Index</div>
            <div className={styles.file_body}>
              <div className={styles.file_bodyitem}>
                <div className={styles.file_bodybold}>Impact Factor</div>
                <div className={styles.file_bodyweak}>
                  {data?.impact_factor ?? "- Not Available -"}
                </div>
              </div>

              <div className={`${styles.file_bodygrid} ${styles.bi_grid}`}>
                <div className={styles.file_bodyitem}>
                  <div className={styles.file_bodybold}>H-Index</div>
                  <div className={styles.file_bodyweak}>
                    {data?.hIndex ?? "- NA -"}
                  </div>
                </div>

                <div className={styles.file_bodyitem}>
                  <div className={styles.file_bodybold}>SJR Quartile</div>
                  <div className={styles.file_bodyweak}>
                    {data?.sjr_quartile ?? "- NA -"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.smooth}>
            <div className={styles.file_head}>Indexed In</div>
            <div className={styles.file_body}>
              <div
                style={{ transform: "translateX(-1rem)" }}
                className={styles.file_bodygrid}
              >
                {["Scopus", "DOAJ", "Crossref", "PubMed", "WOS", "Medline"]
                  .map(e =>
                    e == "Medline"
                      ? {
                          label: e,
                          value:
                            data.indexed_at &&
                            data.indexed_at.in_pubmed &&
                            data.indexed_at.in_pubmed.index_at == "MEDLINE",
                        }
                      : {
                          label: e,
                          value: data.indexed_at
                            ? data.indexed_at["in_" + e.toLowerCase()]
                            : false,
                        }
                  )
                  .map((e, i) => (
                    <span
                      style={{
                        gap: 10,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                      key={i}
                    >
                      <span className={styles.file_bodybold}>{e.label}</span>
                      {e.value ? (
                        <CheckSquareOutlined style={{ color: "#52c41a" }} />
                      ) : (
                        <CloseSquareOutlined style={{ color: "#d70040" }} />
                      )}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileInfo;
