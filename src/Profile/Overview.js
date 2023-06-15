import React, { useState, createElement } from "react";
import styles from "../../styles/profile.module.css";
import Image from "next/image";
import {
  BookOutlined,
  BulbOutlined,
  DollarCircleOutlined,
  GroupOutlined,
  PaperClipOutlined,
  ProjectOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import crossref from "../../public/logos/crossref.jpg";
import medline from "../../public/logos/medline.jpg";
import doaj from "../../public/logos/doaj.png";
import pmc from "../../public/logos/pmc.png";
import scopus from "../../public/logos/scopus.svg";
import wos from "../../public/logos/wos.svg";

import green from "../../public/logos/green-oa.png";
import gold from "../../public/logos/gold-oa.png";
import bronze from "../../public/logos/bronze-oa.png";
import { useEffect } from "react";

const Overview = ({ data, stats, extra, size }) => {
  // STATES

  const [strings, setStrings] = useState({});

  // EFFECTS

  useEffect(() => {
    const check = (str1, str2) => (size > 1400 ? str1 : str2);

    setStrings({
      conferences: check("Conferences Attended", "Conferences"),
      papers: check("Papers Presented", "Papers"),
      posters: check("Posters Presented", "Posters"),
      books: check("Books/Chapters", "Books"),
      projects: check("Research Projects", "Projects"),
      funds: check("Lakhs Received", "Lakhs"),
      students: check("Students Guided", "Students"),
    });
  }, [size]);

  // FUNCTIONS

  const number = num => (num ? (isNaN(num) ? 0 : num) : 0);

  return (
    <>
      <div className={styles.overviewTop}>
        {[
          {
            label1: "Total Publications",
            label2: (
              <div
                className={styles.overviewTopCircle}
                style={{ backgroundColor: "#FABD81" }}
              >
                {data?.publication?.length ?? "N/A"}
              </div>
            ),
            color: "#FABD81",
          },
          {
            label1: (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {[
                  {
                    value: number(extra?.index?.pubmed),
                    image: pmc,
                  },
                  {
                    value: number(extra?.index?.scopus),
                    image: scopus,
                  },
                  {
                    value: number(extra?.index?.doaj),
                    image: doaj,
                  },
                  {
                    value: number(extra?.index?.wos),
                    image: wos,
                  },
                  {
                    value: number(extra?.index?.medline),
                    image: medline,
                  },
                ].map((e, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <Image
                      src={e.image}
                      alt="-"
                      width={size > 1400 ? 35 : 25}
                      height={size > 1400 ? 35 : 25}
                    />
                    <span>{e.value}</span>
                  </div>
                ))}
              </div>
            ),
            label2: `Indexed Publications: ${number(extra?.index?.total)}`,
            color: "#F25A1D",
          },
          {
            label1: "1st/Corresponding Author Publications",
            label2: (
              <div
                className={styles.overviewTopCircle}
                style={{ backgroundColor: "#7891C6" }}
              >
                {stats?.FAuthor ?? "N/A"}
              </div>
            ),
            color: "#7891C6",
          },
          {
            label1: `Q4: ${number(stats?.quartiles?.Q4)} | None: ${number(
              stats?.quartiles?.null
            )}`,
            label2: `Q1: ${number(stats?.quartiles?.Q1)} | Q2: ${number(
              stats?.quartiles?.Q2
            )} | Q3: ${number(stats?.quartiles?.Q3)}`,
            color: "grey",
          },
        ].map((e, i) => (
          <div key={i} style={{ boxShadow: `0 0 4px ${e.color}` }}>
            <span>{e.label2}</span>
            <span>{e.label1}</span>
          </div>
        ))}
      </div>
      <div className={styles.overviewMiddle}>
        <div>
          <div className={styles.overviewMiddleTop}>Citations</div>
          <div style={{ display: "flex", gap: 15 }}>
            {[
              {
                value: number(extra?.citations?.crossref),
                image: crossref,
              },
              {
                value: number(extra?.citations?.scopus),
                image: scopus,
              },
              {
                value: number(extra?.citations?.wos),
                image: wos,
              },
            ].map((e, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <Image src={e.image} alt="-" width={35} height={35} />
                <span>{e.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className={styles.overviewMiddleTop}>H-Index</div>
          <div style={{ display: "flex", gap: 15 }}>
            {[
              { value: number(stats?.h_index_crossref), image: crossref },
              { value: number(stats?.h_index_scopus), image: scopus },
              { value: number(stats?.h_index_wos), image: wos },
            ].map((e, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                <Image src={e.image} alt="-" width={35} height={35} />
                <span>{e.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            Cumulative Impact Factor:{" "}
            {extra?.impact?.total?.toFixed(2) ?? "N/A"}
          </div>
          <div>
            Average Impact Factor: {extra?.impact?.average?.toFixed(2) ?? "N/A"}
          </div>
        </div>
        <div>
          <div>
            Open Access:{" "}
            {number(
              extra?.access?.gold + extra?.access?.green + extra?.access?.bronze
            )}
          </div>
          <div style={{ display: "flex", gap: 15 }}>
            {[
              {
                value: number(extra?.access?.gold),
                image: gold,
              },
              {
                value: number(extra?.access?.green),
                image: green,
              },
              {
                value: number(extra?.access?.bronze),
                image: bronze,
              },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <Image src={e.image} alt="-" width={15} height={25} />
                <span>{e.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.overviewBottom}>
        <div>
          {[
            {
              label1: strings.conferences,
              label2: number(data?.conferences?.length),
              logo: GroupOutlined,
            },
            {
              label1: strings.papers,
              label2: number(extra?.papers),
              logo: PaperClipOutlined,
            },
            {
              label1: strings.posters,
              label2: number(extra?.posters),
              logo: PaperClipOutlined,
            },
            {
              label1: "Books/Chapters",
              label2: number(data?.books?.length),
              logo: BookOutlined,
            },
          ].map((e, i) => (
            <div key={i}>
              <div>{createElement(e.logo)}</div>
              <div style={{ display: "flex", gap: 5 }}>
                <span>{e.label2}</span>
                <span>{e.label1}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          {[
            {
              label1: strings.projects,
              label2: number(data?.research?.length),
              logo: ProjectOutlined,
            },
            {
              label1: strings.funds,
              label2: parseFloat(number(extra?.funds)),
              logo: DollarCircleOutlined,
            },
            {
              label1: "Awards",
              label2: number(data?.awards?.length),
              logo: TrophyOutlined,
            },
            {
              label1: strings.students,
              label2: number(data?.students_guided?.length),
              logo: UsergroupAddOutlined,
            },
            {
              label1: "IPR",
              label2: number(data?.IPR?.length),
              logo: BulbOutlined,
            },
          ].map((e, i) => (
            <div key={i}>
              <div>{createElement(e.logo)}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span>{e.label2}</span>
                <span>{e.label1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Overview;
