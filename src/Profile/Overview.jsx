import React, { createElement } from "react";
import styles from "../../styles/profile.module.css";
import Image from "next/image";
import {
  BookOutlined,
  BulbOutlined,
  DollarCircleOutlined,
  GroupOutlined,
  MoneyCollectOutlined,
  PaperClipOutlined,
  ProjectOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import scopus from "../../public/logos/scopus.png";
import crossref from "../../public/logos/crossref.jpg";
import medline from "../../public/logos/medline.jpg";
import doaj from "../../public/logos/doaj.png";
import embase from "../../public/logos/embase.png";
import pmc from "../../public/logos/pmc.png";
import scie from "../../public/logos/scie.png";
import wos from "../../public/logos/wos.jpg";

import green from "../../public/logos/green-oa.png";
import gold from "../../public/logos/gold-oa.png";
import bronze from "../../public/logos/bronze-oa.png";
import closed from "../../public/logos/closed-oa.png";

const Overview = ({ data, extra }) => {
  return (
    <>
      <div className={styles.overviewTop}>
        {[
          {
            label1: "Total Publications",
            label2: (
              <div
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FABD81",
                  borderRadius: "50%",
                }}
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
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#7891C6",
                  borderRadius: "50%",
                }}
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
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ffc9b7",
                  borderRadius: "50%",
                }}
              >
                {data?.publication?.length ?? "N/A"}
              </div>
            ),
            color: "#ffc9b7",
          },
          {
            label1: `Q4: ${data?.quartiles?.Q4 ?? "N/A"} | None: ${
              data?.quartiles?.null ?? "N/A"
            }`,
            label2: `Q1: ${data?.quartiles?.Q1 ?? "N/A"} | Q2: ${
              data?.quartiles?.Q2 ?? "N/A"
            } | Q3: ${data?.quartiles?.Q3 ?? "N/A"}`,
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
          <div>Citations</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              {
                value: extra?.citations?.crossref ?? "N/A",
                image: crossref,
              },
              {
                value: extra?.citations?.scopus ?? "N/A",
                image: scopus,
              },
              {
                value: extra?.citations?.wos ?? "N/A",
                image: wos,
              },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 5 }}>
                <Image src={e.image} alt="-" width={20} height={20} />
                <span>{e.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>H-Index</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              {
                value: extra?.hIndex?.crossref ?? "N/A",
                image: crossref,
              },
              {
                value: extra?.hIndex?.scopus ?? "N/A",
                image: scopus,
              },
              {
                value: extra?.hIndex?.wos ?? "N/A",
                image: wos,
              },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 5 }}>
                <Image src={e.image} alt="-" width={20} height={20} />
                <span>{e.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            Total Impact Factor: {extra?.impact?.total?.toFixed(2) ?? "N/A"}
          </div>
          <div>
            Average Impact Factor: {extra?.impact?.average?.toFixed(2) ?? "N/A"}
          </div>
        </div>
        <div>
          <div>
            Total Open Access:{" "}
            {extra?.access?.gold +
              extra?.access?.green +
              extra?.access?.bronze ?? "N/A"}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              {
                value: extra?.access?.gold ?? "N/A",
                image: gold,
              },
              {
                value: extra?.access?.green ?? "N/A",
                image: green,
              },
              {
                value: extra?.access?.bronze ?? "N/A",
                image: bronze,
              },
              {
                value: extra?.access?.closed ?? "N/A",
                image: closed,
              },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 5 }}>
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
              label1: "Conferences",
              label2: data?.conference?.length ?? "N/A",
              logo: UsergroupAddOutlined,
            },
            {
              label1: "Papers",
              label2: data?.publication?.length ?? "N/A",
              logo: PaperClipOutlined,
            },
            {
              label1: "Posters",
              label2: data?.publication?.length ?? "N/A",
              logo: PaperClipOutlined,
            },
            {
              label1: "Books",
              label2: data?.book?.length ?? "N/A",
              logo: BookOutlined,
            },
            {
              label1: "IPR",
              label2: data?.ipr?.length ?? "N/A",
              logo: BulbOutlined,
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
              label1: "Projects",
              label2: data?.project?.length ?? "N/A",
              logo: ProjectOutlined,
            },
            {
              label1: "Funds",
              label2: data?.fund?.length ?? "N/A",
              logo: DollarCircleOutlined,
            },
            {
              label1: "Awards",
              label2: data?.award?.length ?? "N/A",
              logo: TrophyOutlined,
            },
            {
              label1: "Students",
              label2: data?.student?.length ?? "N/A",
              logo: GroupOutlined,
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
      </div>
    </>
  );
};

export default Overview;
