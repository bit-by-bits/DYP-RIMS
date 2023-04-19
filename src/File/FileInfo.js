import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URLObj from "../baseURL";
import { useRouter } from "next/router";
import { CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons";

const FileInfo = ({ setVisible, id }) => {
  const router = useRouter();
  const [data, setData] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: `${URLObj.base}/publication/${id}`,
    })
      .then(res => {
        setData(res?.data?.publication);
        setVisible(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={styles.file_text}>
        <div className={styles.file_tags}>
          <div className={styles.file_tag1}>
            {data.publication_type ?? "Unknown Type"}
          </div>

          <div className={styles.file_tag2}>
            {data.region === "blank" ? "Unknown Region" : data.region}
          </div>

          <div className={styles.file_tag1}>PDF Not Available</div>
        </div>

        <div className={styles.file_title}>
          {data?.publication_title ?? "- Not Available -"}
        </div>

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Journal</span>
                <span className={styles.info_body}>
                  {data.journal_name ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Volume</span>
                <span className={styles.info_body}>
                  {data.volume ?? "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Issue</span>
                <span className={styles.info_body}>
                  {data.issue ?? "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Pages</span>
                <span className={styles.info_body}>
                  {data.pages ?? "- NA -"}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Authors</span>
                <span className={styles.info_body}>
                  {data.author_name?.length
                    ? data.author_name?.map(e => e.searchable_name).join(", ")
                    : "" + data.other_authors?.length
                    ? data.other_authors?.join(", ")
                    : "" ?? "- NA -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Dept.</span>
                <span className={styles.info_body}>
                  {data.department ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Published</span>
                <span className={styles.info_body}>
                  {data.year ?? "- NA -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Citations</span>
                <span className={styles.info_body}>
                  {data.citations ?? "- NA -"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.smooth} ${styles.abstract}`}>
          <div className={styles.file_head}>Abstract</div>
          <div className={styles.abs_body}>
            {data.abstract ?? "- Not Available -"}
          </div>
        </div>

        <div className={styles.file_grid}>
          <div className={styles.smooth}>
            <div className={styles.file_head}>File ID</div>
            <div className={styles.file_body}>
              <div className={styles.file_bodyitem}>
                <div className={styles.file_bodybold}>Pub Med ID</div>
                <div className={styles.file_bodyweak}>
                  {data.pubmed_id ?? "- Not Available -"}
                </div>
              </div>

              <div className={styles.file_bodyitem}>
                <div className={styles.file_bodybold}>DOI ID</div>
                <div className={styles.file_bodyweak}>
                  {data.doi_id ?? "- Not Available -"}
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
                  {data.impact_factor ?? "- Not Available -"}
                </div>
              </div>

              <div className={`${styles.file_bodygrid} ${styles.bi_grid}`}>
                <div className={styles.file_bodyitem}>
                  <div className={styles.file_bodybold}>H-Index</div>
                  <div className={styles.file_bodyweak}>
                    {data.h_index ?? "- NA -"}
                  </div>
                </div>

                <div className={styles.file_bodyitem}>
                  <div className={styles.file_bodybold}>SJR Quartile</div>
                  <div className={styles.file_bodyweak}>
                    {data.sjr ?? "- NA -"}
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
                        alignItems: "center",
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
