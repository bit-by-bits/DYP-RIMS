import {
  faArrowDownAZ,
  faArrowDownZA,
  faCheckToSlot,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/profile.module.css";
import { Table } from "antd";

export default function PubTable({ pubData, setLoader }) {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    initiate();
  }, [pubData]);

  function initiate() {
    const TEMP_COLUMNS = [
      {
        title: "Publication",
        dataIndex: "title",
        key: "title",
        sorter: (a, b) => a.title.localeCompare(b.title),
      },
      {
        title: "Impact Factor",
        dataIndex: "impact",
        key: "impact",
        sorter: (a, b) => a.impact.localeCompare(b.impact),
        render: text => (
          <div
            style={{
              color: "#9a2827",
              fontWeight: 900,
              fontSize: 20,
              minWidth: 120,
            }}
          >
            {text}
          </div>
        ),
      },
      {
        title: "SJR Quartile",
        dataIndex: "sjr",
        key: "sjr",
        sorter: (a, b) => a.sjr.localeCompare(b.sjr),
        render: text => (
          <div
            style={{
              color: "#9a2827",
              fontWeight: 900,
              fontSize: 20,
              minWidth: 120,
            }}
          >
            {text}
          </div>
        ),
      },
      {
        title: "Indexed In",
        dataIndex: "indexed_in",
        key: "indexed_in",
        filters: [
          {
            text: "DOAJ",
            value: "DOAJ",
          },
          {
            text: "Embase",
            value: "Embase",
          },
          {
            text: "Medline",
            value: "Medline",
          },
          {
            text: "PMC",
            value: "PMC",
          },
          {
            text: "SCIE",
            value: "SCIE",
          },
          {
            text: "Scopus",
            value: "Scopus",
          },
        ],
        onFilter: (value, record) =>
          record.indexed_in.props.children.includes(value),
      },
      {
        title: "Citations",
        dataIndex: "citations",
        key: "citations",
        sorter: (a, b) => a.citations.localeCompare(b.citations),
        render: text => <div style={{ fontWeight: 700 }}>{text}</div>,
      },
      {
        title: "Published",
        dataIndex: "published",
        key: "published",
        sorter: (a, b) => a.published.localeCompare(b.published),
        render: text => (
          <div style={{ fontWeight: 700, minWidth: 120 }}>{text}</div>
        ),
      },
      {
        title: "File",
        dataIndex: "more",
        key: "more",
        sorter: (a, b) => a.more.localeCompare(b.more),
        render: (text, record) => (
          <Link href={`/file/${record.key}`}>
            <div className={styles.btn_div}>Click</div>
          </Link>
        ),
      },
    ];

    const TEMP_DATA = pubData.map(e => ({
      key: e.id,
      title: (
        <div
          style={{
            gap: 10,
            maxWidth: "40vw",
            display: "flex",
            flexDirection: "column",
            fontWeight: 500,
            fontSize: "0.8rem",
          }}
        >
          <span
            style={{
              color: "black",
              fontWeight: 700,
              fontSize: "1rem",
              lineHeight: "1.3rem",
            }}
          >
            {e.publication_title ?? "N/A"}
          </span>
          <span style={{ fontWeight: 400 }}>
            {e.other_authors.join(", ") ?? "N/A"}
          </span>
          <span style={{ fontStyle: "italic" }}>{e.journal_name ?? "N/A"}</span>
          <span style={{ color: "#9a2827" }}>
            Volume: {e.volume ?? "?"}
            &nbsp;&middot;&nbsp; Issue: {e.issue ?? "?"}
            &nbsp;&middot;&nbsp; Pages: {e.pages ?? "?"}
          </span>
          {e.file ? (
            <span style={{ color: "green" }}>
              Softcopy found for this publication. View More to access.
            </span>
          ) : (
            <span style={{ color: "red" }}>
              No softcopy found for this publication. Kindly upload a softcopy.
            </span>
          )}
        </div>
      ),
      impact: e.impact_factor ?? "N/A",
      sjr: e.sjr ?? "N/A",
      indexed_in: (
        <span>
          {["DOAJ", "Embase", "Medline", "PMC", "SCIE", "Scopus"]
            .filter(index => e["in_" + index.toLowerCase()])
            .join(", ") ?? "N/A"}
        </span>
      ),
      citations: e.citations ?? "N/A",
      published: e.year ?? "N/A",
    }));

    setColumns(TEMP_COLUMNS);
    setData(TEMP_DATA);

    setTimeout(() => setLoader(false), 1600);
  }

  return (
    <>
      <div id="publications" className={styles.profile_box}>
        <div
          className={styles.profile_head}
          style={data.length ? { marginLeft: "5vw" } : {}}
        >
          Publications
        </div>
        <Table
          style={data.length ? { width: "90vw" } : { width: "80vw" }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
}
