import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, List, message } from "antd";
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

  const [authors, setAuthors] = useState([]);
  const [citations, setCitations] = useState([]);

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
    if (data) {
      setAuthors(getAuthors());
      setCitations(
        getCitations([
          { name: "WOS", image: wos },
          { name: "Scopus", image: scopus },
          { name: "Crossref", image: crossref },
        ])
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return AUTHORS;
  };

  const getCitations = arr =>
    arr
      ?.filter(e => data[`in_${e.name?.toLowerCase()}`])
      .map((e, i) => (
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
      ));

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
            <List
              grid={{ gutter: 16 }}
              pagination={{
                position: "bottom",
                align: "center",
                pageSize: 10,
              }}
              dataSource={authors}
              renderItem={item => <List.Item>{item}</List.Item>}
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
                    {data?.h_index ?? "- NA -"}
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
                {["DOAJ", "Embase", "Medline", "PMC", "SCIE", "Scopus"]
                  .map(e => ({
                    label: e,
                    value: data["in_" + e.toLowerCase()],
                  }))
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
