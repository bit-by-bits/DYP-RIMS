import React, { createElement, use } from "react";
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
import scopus from "../../public/logos/scopus.svg";
import wos from "../../public/logos/wos.svg";

import green from "../../public/logos/green-oa.png";
import gold from "../../public/logos/gold-oa.png";
import bronze from "../../public/logos/bronze-oa.png";
import closed from "../../public/logos/closed-oa.png";

const Overview = ({ data, extra }) => {
  // STATES

  // EFFECTS

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
            label1: "Indexed Publications",
            label2: (
              <div
                className={styles.overviewTopCircle}
                style={{ backgroundColor: "#7891C6" }}
              >
                {data?.publication?.length ?? "N/A"}
              </div>
            ),
            color: "#7891C6",
          },
          {
            label1: "1st/Corresponding Author Publications",
            label2: (
              <div
                className={styles.overviewTopCircle}
                style={{ backgroundColor: "#ffc9b7" }}
              >
                {data?.publication?.length ?? "N/A"}
              </div>
            ),
            color: "#ffc9b7",
          },
          {
            label1: `Q4: ${number(data?.quartiles?.Q4)} | None: ${number(
              data?.quartiles?.null
            )}`,
            label2: `Q1: ${number(data?.quartiles?.Q1)} | Q2: ${number(
              data?.quartiles?.Q2
            )} | Q3: ${number(data?.quartiles?.Q3)}`,
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
              {
                value: number(extra?.hIndex?.crossref),
                image: crossref,
              },
              {
                value: number(extra?.hIndex?.scopus),
                image: scopus,
              },
              {
                value: number(extra?.hIndex?.wos),
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
              {
                value: number(extra?.access?.closed),
                image: closed,
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
              label1: "Papers Presented",
              label2: number(data?.paper?.length),
              logo: PaperClipOutlined,
            },
            {
              label1: "Posters Presented",
              label2: number(data?.poster?.length),
              logo: PaperClipOutlined,
            },
            {
              label1: "Books/Chapters",
              label2: number(data?.book?.length),
              logo: BookOutlined,
            },
            {
              label1: "Research Projects",
              label2: number(data?.project?.length),
              logo: ProjectOutlined,
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
              label1: "Conferences",
              label2: number(data?.conference?.length),
              logo: GroupOutlined,
            },
            {
              label1: "Funds Recieved",
              label2: number(data?.fund?.length),
              logo: DollarCircleOutlined,
            },
            {
              label1: "Awards",
              label2: number(data?.award?.length),
              logo: TrophyOutlined,
            },
            {
              label1: "Students Guided",
              label2: number(data?.student?.length),
              logo: UsergroupAddOutlined,
            },
            {
              label1: "IPR",
              label2: number(data?.ipr?.length),
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
