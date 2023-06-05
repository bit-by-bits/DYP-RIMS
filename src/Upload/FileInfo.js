import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { Button, Table, message } from "antd";

const FileInfo = ({ user, setp, setv, DOI }) => {
  // STATES

  const [data, setData] = useState({});
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
    if (data) getAuthors(data?.author);
  }, [data]);

  useEffect(() => {
    if (authors?.final?.length > 0) {
      getAuthors(authors?.final);
    }
  }, [authors?.final]);

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
        setp(false);
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
          title: "Department",
          dataIndex: "department",
          key: "department",
        },
      ];

      const BODY = arr
        .filter(e => e.in_dyp)
        .map((e, i) => ({
          key: i,
          no: `${i + 1}.`,
          name: e.given + " " + e.family,
          sequence: e.sequence ?? "additional",
          department: e.profile?.[0]?.department?.name ?? "- NA -",
        }));

      const OTHERS = arr
        .filter(e => !e.in_dyp)
        .map((e, i) => (
          <div
            key={i}
            onClick={() => {
              const FINAL = authors?.final?.map(f =>
                f.given + " " + f.family == e.given + " " + e.family
                  ? { ...f, in_dyp: true }
                  : f
              );

              setAuthors({ ...authors, final: FINAL });
            }}
            className={styles.file_keyword2}
          >
            {e.given + " " + e.family}
          </div>
        ));

      setAuthors({ title: TITLE, body: BODY, others: OTHERS, final: arr });
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
                type: "radio",
                onChange: (key, row) => {
                  const FINAL = authors?.final?.map(e =>
                    e.sequence == "first"
                      ? { ...e, sequence: "first" }
                      : e.given + " " + e.family == row?.[0]?.name
                      ? { ...e, sequence: "corresponding" }
                      : { ...e, sequence: "additional" }
                  );

                  setAuthors({ ...authors, final: FINAL });
                },
                getCheckboxProps: r => ({ disabled: r.sequence == "first" }),
                columnTitle: "Select Author",
                columnWidth: "15%",
              }}
              dataSource={authors?.body}
              columns={authors?.title}
              footer={() => <Button onClick={submit}>Confirm</Button>}
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