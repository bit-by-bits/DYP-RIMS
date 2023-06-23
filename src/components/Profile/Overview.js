import Image from "next/image";
import React, { useState, createElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useAccess } from "../context/accessContext";
import styles from "../../styles/profile.module.css";
import {
  BookOutlined,
  BulbOutlined,
  MessageOutlined,
  PaperClipOutlined,
  ProjectOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
  TrademarkCircleOutlined,
} from "@ant-design/icons";

import crossref from "../../../public/logos/crossref.jpg";
import medline from "../../../public/logos/medline.jpg";
import doaj from "../../../public/logos/doaj.png";
import pmc from "../../../public/logos/pmc.png";
import scopus from "../../../public/logos/scopus.svg";
import wos from "../../../public/logos/wos.svg";

import green from "../../../public/logos/green-oa.png";
import gold from "../../../public/logos/gold-oa.png";
import bronze from "../../../public/logos/bronze-oa.png";
import useNumber from "../../utils/useNumber";

const Overview = ({ data, stats, extra, size, counts }) => {
  // HOOKS

  const router = useRouter();
  const { number } = useNumber();
  const { access } = useAccess();

  // STATES

  const [overview, setOverview] = useState({});
  const [strings, setStrings] = useState({});

  // EFFECTS

  useEffect(() => {
    const check = (val1, val2, val3) => {
      if (access == 1) return val1;
      else if (access == 2) return val2;
      else return val3;
    };

    const sum = arr => arr?.reduce((a, b) => a + b, 0);

    setOverview({
      publication: check(data?.publication?.length, counts?.publication, 0),
      conferences: check(data?.conferences?.length, counts?.conferences, 0),
      papers: check(extra?.papers, counts?.papers, 0),
      posters: check(extra?.posters, counts?.posters, 0),
      books: check(data?.books?.length, counts?.books, 0),
      research: check(data?.research?.length, counts?.research, 0),
      funds: check(extra?.funds, counts?.funds, 0),
      awards: check(data?.awards?.length, counts?.awards, 0),
      students: check(data?.students_guided?.length, counts?.students, 0),
      IPR: check(data?.IPR?.length, counts?.IPR, 0),
      indexed_pubmed: check(
        extra?.index?.pubmed,
        counts?.indexed_at?.pubmed,
        0
      ),
      indexed_scopus: check(
        extra?.index?.scopus,
        counts?.indexed_at?.scopus,
        0
      ),
      indexed_doaj: check(extra?.index?.doaj, counts?.indexed_at?.doaj, 0),
      indexed_wos: check(extra?.index?.wos, counts?.indexed_at?.wos, 0),
      indexed_medline: check(
        extra?.index?.medline,
        counts?.indexed_at?.medline,
        0
      ),
      indexed_total: check(extra?.index?.total, counts?.indexed_at?.total, 0),
      first_author: check(stats?.FAuthor, counts?.FAuthor, 0),
      Q1: check(stats?.quartiles?.Q1, counts?.quartiles?.Q1, 0),
      Q2: check(stats?.quartiles?.Q2, counts?.quartiles?.Q2, 0),
      Q3: check(stats?.quartiles?.Q3, counts?.quartiles?.Q3, 0),
      Q4: check(stats?.quartiles?.Q4, counts?.quartiles?.Q4, 0),
      null: check(stats?.quartiles?.null, counts?.quartiles?.none, 0),
      h_index_crossref: check(
        stats?.h_index_crossref,
        counts?.hindex?.crossref,
        0
      ),
      h_index_scopus: check(stats?.h_index_scopus, counts?.hindex?.scopus, 0),
      h_index_wos: check(stats?.h_index_wos, counts?.hindex?.wos, 0),
      impact_total: check(extra?.impact?.total, counts?.impact?.total, 0),
      impact_average: check(extra?.impact?.average, counts?.impact?.average, 0),
      open_access_gold: check(extra?.access?.gold, counts?.open_alex?.gold, 0),
      open_access_green: check(
        extra?.access?.green,
        counts?.open_alex?.green,
        0
      ),
      open_access_bronze: check(
        extra?.access?.bronze,
        counts?.open_alex?.bronze,
        0
      ),
      citations_crossref: check(
        extra?.citations?.crossref,
        sum(counts?.citations?.crossref),
        0
      ),
      citations_scopus: check(
        extra?.citations?.scopus,
        sum(counts?.citations?.scopus),
        0
      ),
      citations_wos: check(
        extra?.citations?.wos,
        sum(counts?.citations?.wos),
        0
      ),
    });
  }, [data, stats, extra, counts, access]);

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

  const createBox = array =>
    array?.map((e, i) => (
      <div key={i} onClick={() => router.push(e.link)}>
        <div>{createElement(e.logo)}</div>
        <div style={{ display: "flex", gap: 5 }}>
          <span>{e.label2}</span>
          <span>{e.label1}</span>
        </div>
      </div>
    ));

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
                {number(overview?.publication)}
              </div>
            ),
            color: "#FABD81",
          },
          {
            label1: (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {[
                  {
                    value: number(overview?.indexed_pubmed),
                    image: pmc,
                  },
                  {
                    value: number(overview?.indexed_scopus),
                    image: scopus,
                  },
                  {
                    value: number(overview?.indexed_wos),
                    image: wos,
                  },
                  {
                    value: number(overview?.indexed_medline),
                    image: medline,
                  },
                  {
                    value: number(overview?.indexed_doaj),
                    image: doaj,
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
            label2: `Indexed Publications: ${number(overview?.indexed_total)}`,
            color: "#F25A1D",
          },
          {
            label1: "1st/Corresponding Author Publications",
            label2: (
              <div
                className={styles.overviewTopCircle}
                style={{ backgroundColor: "#7891C6" }}
              >
                {number(overview?.first_author)}
              </div>
            ),
            color: "#7891C6",
          },
          {
            label1: `Q4: ${number(overview?.Q4)} | None: ${number(
              overview?.null
            )}`,
            label2: `Q1: ${number(overview?.Q1)} | Q2: ${number(
              overview?.Q2
            )} | Q3: ${number(overview?.Q3)}`,
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
                value: number(overview?.citations_crossref),
                image: crossref,
              },
              {
                value: number(overview?.citations_scopus),
                image: scopus,
              },
              {
                value: number(overview?.citations_wos),
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
              { value: number(overview?.h_index_crossref), image: crossref },
              { value: number(overview?.h_index_scopus), image: scopus },
              { value: number(overview?.h_index_wos), image: wos },
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
            {`Cumulative Impact Factor: ${number(
              overview?.impact_total
            ).toFixed(2)}`}
          </div>
          <div>
            {`Average Impact Factor: ${number(overview?.impact_average).toFixed(
              2
            )}`}
          </div>
        </div>
        <div>
          <div>
            {`Open Access: ${number(
              overview?.open_access_gold +
                overview?.open_access_green +
                overview?.open_access_bronze
            )}`}
          </div>
          <div style={{ display: "flex", gap: 15 }}>
            {[
              {
                value: number(overview?.open_access_gold),
                image: gold,
              },
              {
                value: number(overview?.open_access_green),
                image: green,
              },
              {
                value: number(overview?.open_access_bronze),
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
          {createBox([
            {
              label1: strings.conferences,
              label2: number(data?.conferences?.length),
              logo: MessageOutlined,
              link: "/profile#conferences",
            },
            {
              label1: strings.papers,
              label2: number(extra?.papers),
              logo: PaperClipOutlined,
              link: "/profile#conferences",
            },
            {
              label1: strings.posters,
              label2: number(extra?.posters),
              logo: PaperClipOutlined,
              link: "/profile#conferences",
            },
            {
              label1: "Books/Chapters",
              label2: number(data?.books?.length),
              logo: BookOutlined,
              link: "/profile#books",
            },
          ])}
        </div>
        <div>
          {createBox([
            {
              label1: strings.projects,
              label2: number(data?.research?.length),
              logo: ProjectOutlined,
              link: "/profile#projects",
            },
            {
              label1: strings.funds,
              label2: parseFloat(number(extra?.funds)).toFixed(2),
              logo: TrademarkCircleOutlined,
              link: "/profile#projects",
            },
            {
              label1: "Awards",
              label2: number(data?.awards?.length),
              logo: TrophyOutlined,
              link: "/profile#awards",
            },
            {
              label1: strings.students,
              label2: number(data?.students_guided?.length),
              logo: UsergroupAddOutlined,
              link: "/profile#students",
            },
            {
              label1: "IPR",
              label2: number(data?.IPR?.length),
              logo: BulbOutlined,
              link: "/profile#ipr",
            },
          ])}
        </div>
      </div>
    </>
  );
};

export default Overview;
