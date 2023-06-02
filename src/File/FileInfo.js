import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, List, message } from "antd";
import Scite from "../Profile/Scite";
import Altmetric from "../Profile/Altmetric";

const FileInfo = ({ user, setv, DOI }) => {
  // STATES

  const { Meta } = Card;
  const [data, setData] = useState({});
  const [cards, setCards] = useState([]);

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
    if (data) setCards(getAuthors(data?.author));
  }, [data]);

  // FUNCTIONS

  const readFirst = arr => (arr?.length > 0 ? arr[0] : "- Not Available -");

  const getAuthors = arr =>
    arr?.map((e, i) =>
      e.sequence == "first" ? (
        <Badge.Ribbon key={i} text="First" color="#9a2827">
          <Card
            hoverable
            bodyStyle={{ padding: 15, minWidth: 250 }}
            style={{ border: "1px solid #d9d9d9" }}
          >
            <Meta
              title={
                <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                  {e.given + " " + e.family + " " + (e.suffix ?? "")}
                </div>
              }
              description={""}
              avatar={
                <Avatar
                  src={
                    e.picture ??
                    "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                  }
                />
              }
            />
          </Card>
        </Badge.Ribbon>
      ) : (
        <Card
          key={i}
          hoverable
          bodyStyle={{ padding: 15 }}
          style={{ border: "1px solid #d9d9d9" }}
        >
          <Meta
            title={
              <div style={{ fontSize: "0.9rem", marginBottom: -4 }}>
                {e.given + " " + e.family + " " + (e.suffix ?? "")}
              </div>
            }
            description={""}
            avatar={
              <Avatar
                src={
                  "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                }
              />
            }
          />
        </Card>
      )
    );

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
            </div>
          </div>

          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Published</span>
                <span className={styles.info_body}>
                  {data?.published_date?.length > 0
                    ? data?.published_date?.split("-").reverse().join("-")
                    : "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Citations</span>
                <span className={styles.info_body}>
                  {data?.citations ?? "- NA -"}
                </span>
              </div>
            </div>
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
              dataSource={cards}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </div>
        </div>

        <div className={styles.file_grid}>
          <div className={styles.file_head}>Keywords</div>
          <div
            style={{ gap: "2rem", paddingTop: "2rem" }}
            className={styles.file_body}
          >
            <Scite DOI={DOI} type={0} />
            <Altmetric DOI={DOI} type={0} />
          </div>
        </div>

        <div className={`${styles.smooth} ${styles.abstract}`}>
          <div className={styles.file_head}>Abstract</div>
          <div className={styles.abs_body}>
            {data?.abstract && data?.abstract != ""
              ? data?.abstract
              : "- Not Available -"}
          </div>
        </div>

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
