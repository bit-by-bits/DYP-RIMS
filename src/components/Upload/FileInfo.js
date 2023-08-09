import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Button, Table, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAccess } from "../context/accessContext";

const FileInfo = ({ user, setp, setv, sett, DOI }) => {
  // STATES

  const { access } = useAccess();
  const [data, setData] = useState({});

  const [checking, setChecking] = useState(false);
  const [authors, setAuthors] = useState({
    title: [],
    body: [],
    others: [],
    final: [],
  });

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
    data && getAuthors(data?.author);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    authors?.final?.length && getAuthors(authors?.final);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authors?.final]);

  // FUNCTIONS

  const readFirst = arr => (arr?.length > 0 ? arr[0] : "- Not Available -");

  const submit = () => {
    if (!checking) {
      setChecking(true);

      let array = authors?.final;

      const FIRST = array?.find(e => e.sequence == "first");

      if (FIRST?.in_dyp == false) {
        array = array?.map(e =>
          e.sequence == "first" ? { ...e, sequence: "additional" } : e
        );

        const FIRST_DYP = array?.find(e => e.in_dyp == true);

        if (FIRST_DYP) {
          array = array?.map(e =>
            e.given + " " + e.family == FIRST_DYP.given + " " + FIRST_DYP.family
              ? { ...e, sequence: "first" }
              : e
          );
        }
      }

      const str = JSON.stringify({
        doi: DOI,
        author: array,
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
          sett(
            res?.data?.message == "DOI Exists"
              ? "File already exists"
              : `Added publication with ${res?.data?.first_author} first, ${res?.data?.corresponding_author} corr and ${res?.data?.other_author} other authors.`
          );

          message.success("Redirecting you to the file page");

          setChecking(false);
          setp(false);
        })
        .catch(err => {
          message.error("Couldn't Add Publication");
          setChecking(false);
          console.log(err);
        });
    }
  };

  const getAuthors = arr => {
    if (arr?.length > 0) {
      let array = arr;

      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (a, b, c) => `${c + 1}.`,
          width: "10%",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          width: "25%",
          render: text => (
            <div
              style={{ fontWeight: 800, fontSize: "1.1rem", color: "black" }}
            >
              {text}
            </div>
          ),
        },
        {
          title: "Department",
          dataIndex: "department",
          key: "department",
          width: "30%",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
          width: "20%",
        },
      ];

      const FIRST = array?.find(e => e.sequence == "first");

      if (FIRST?.in_dyp == false) {
        array = array?.map(e =>
          e.sequence == "first" ? { ...e, sequence: "additional" } : e
        );

        const FIRST_DYP = array?.find(e => e.in_dyp == true);

        if (FIRST_DYP) {
          array = array?.map(e =>
            e.given + " " + e.family == FIRST_DYP.given + " " + FIRST_DYP.family
              ? { ...e, sequence: "first" }
              : e
          );
        }
      }

      const BODY = array
        .filter(e => e.in_dyp)
        .map((e, i) => ({
          key: i,
          no: `${i + 1}.`,
          name: e.given + " " + e.family,
          sequence: e.sequence ?? "additional",
          department: e.profile?.[0]?.department?.name ?? "- NA -",
          action: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 10,
              }}
            >
              <Button
                className={styles.uploadTableButton}
                onClick={() => {
                  const FINAL = authors?.final?.map((f, i) =>
                    f.given + " " + f.family == e.given + " " + e.family
                      ? {
                          ...f,
                          profile: [
                            {
                              ...f.profile?.[0],
                              department: "N/A",
                            },
                          ],
                        }
                      : f
                  );

                  setAuthors({ ...authors, final: FINAL });
                }}
              >
                Delink the Dept
              </Button>

              <DeleteOutlined
                onClick={() => {
                  const FINAL = authors?.final?.map(f =>
                    f.given + " " + f.family == e.given + " " + e.family
                      ? { ...f, sequence: "additional", in_dyp: false }
                      : f
                  );

                  setAuthors({ ...authors, final: FINAL });
                }}
              />
            </div>
          ),
        }));

      const OTHERS = array
        .filter(e => !e.in_dyp)
        .map((e, i) => (
          <div
            key={i}
            className={styles.file_keyword2}
            onClick={() => {
              const FINAL = authors?.final?.map(f =>
                f.given + " " + f.family == e.given + " " + e.family
                  ? { ...f, in_dyp: true }
                  : f
              );

              setAuthors({ ...authors, final: FINAL });
            }}
          >
            {e.given + " " + e.family}
          </div>
        ));

      setAuthors({ title: TITLE, body: BODY, others: OTHERS, final: array });
    }
  };

  return (
    <>
      <div className={styles.file_text}>
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
          <div className={styles.info_head}>
            Select Corresponding Author if from Dr. D.Y. Patil Medical College,
            Pune
          </div>
          <div className={styles.auth_body}>
            <Table
              className="uploadTable"
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  const selectedAuthors = selectedRows?.map(e => e.name);

                  const FINAL = authors?.final?.map(e => {
                    let ANS = {};

                    if (selectedAuthors?.includes(e.given + " " + e.family)) {
                      if (e.sequence == "additional")
                        ANS = { ...e, sequence: "corresponding" };
                      else if (e.sequence == "first")
                        ANS = { ...e, sequence: "firstncorr" };
                      else ANS = e;
                    } else {
                      if (e.sequence == "corresponding")
                        ANS = { ...e, sequence: "additional" };
                      else if (e.sequence == "firstncorr")
                        ANS = { ...e, sequence: "first" };
                      else ANS = e;
                    }

                    return ANS;
                  });

                  setAuthors({ ...authors, final: FINAL });
                },
                columnTitle: "Select Author",
                columnWidth: "15%",
              }}
              dataSource={authors?.body}
              columns={authors?.title}
              footer={() => (
                <Button className={styles.uploadTableButton} onClick={submit}>
                  {checking ? <div className={styles.dots} /> : "Submit"}
                </Button>
              )}
            />
          </div>
        </div>

        <div style={{ width: "100%" }} className={styles.authors}>
          <div className={styles.info_head}>Other Authors (click to add)</div>
          <div className={styles.auth_body}>
            <div className={styles.file_keywords2}>
              {authors?.others?.length > 0 ? authors?.others : "- NA -"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileInfo;
