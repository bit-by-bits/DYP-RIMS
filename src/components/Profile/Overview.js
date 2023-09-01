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
import { useWindowSize } from "rooks";
import axios from "axios";
import URLObj from "../baseURL";
import { useUser } from "../context/userContext";

const Overview = ({
  mode = "one",
  one = { data: {}, stats: {}, extra: {} },
  two = { counts: {}, faculty: 0 },
}) => {
  // HOOKS

  const { user } = useUser();
  const { access } = useAccess();

  const router = useRouter();
  const { number } = useNumber();
  const { innerWidth } = useWindowSize();

  // STATES

  const [faculty, setFaculty] = useState([]);
  const [strings, setStrings] = useState({});
  const [overview, setOverview] = useState({});

  // EFFECTS

  useEffect(() => {
    if (user?.token && access != 1) {
      axios({
        method: "GET",
        url: `${URLObj.base}/faculty/`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
          "X-ACCESS-LEVEL": "department",
        },
      })
        .then(res =>
          setFaculty(
            Object.entries(res.data?.faculty)?.reduce(
              (a, b) => a + b[1]?.length,
              0
            )
          )
        )
        .catch(err => console.log(err));
    }
  }, [user?.token, access]);

  useEffect(() => {
    const check = (val1, val2) => {
      if (mode == "two" || access == 1) return val1;
      else return val2;
    };

    const sum = arr => arr?.reduce((a, b) => number(a) + number(b), 0);

    const { data, stats, extra } = one;
    const { counts } = two;

    setOverview({
      publication: check(data?.publications?.length, counts?.publication),
      conferences: check(data?.conferences?.length, counts?.conference),
      papers: check(extra?.papers, counts?.papers),
      posters: check(extra?.posters, counts?.posters),
      books: check(data?.books?.length, counts?.books),
      research: check(data?.projects?.length, counts?.projects),
      funds: check(extra?.funds, sum(counts?.funds)),
      awards: check(data?.awards?.length, counts?.awards),
      students: check(data?.students_guided?.length, counts?.students),
      IPR: check(data?.IPR?.length, counts?.ipr),
      indexed_pubmed: check(extra?.index?.pubmed, counts?.indexed_at?.pubmed),
      indexed_scopus: check(extra?.index?.scopus, counts?.indexed_at?.scopus),
      indexed_doaj: check(extra?.index?.doaj, counts?.indexed_at?.doaj),
      indexed_wos: check(extra?.index?.wos, counts?.indexed_at?.wos),
      indexed_medline: check(
        extra?.index?.medline,
        counts?.indexed_at?.medline
      ),
      indexed_total: check(extra?.index?.total, counts?.indexed_at?.total),
      first_author: check(stats?.FAuthor, faculty),
      Q1: check(stats?.quartiles?.Q1, counts?.quartiles?.Q1),
      Q2: check(stats?.quartiles?.Q2, counts?.quartiles?.Q2),
      Q3: check(stats?.quartiles?.Q3, counts?.quartiles?.Q3),
      Q4: check(stats?.quartiles?.Q4, counts?.quartiles?.Q4),
      null: check(stats?.quartiles?.null, counts?.quartiles?.none),
      h_index_crossref: check(
        stats?.h_index_crossref,
        counts?.hindex?.crossref
      ),
      h_index_scopus: check(stats?.h_index_scopus, counts?.hindex?.scopus),
      h_index_wos: check(stats?.h_index_wos, counts?.hindex?.wos),
      impact_total: check(extra?.impact?.total, sum(counts?.impact_factor)),
      impact_average: check(
        extra?.impact?.average,
        sum(counts?.impact_factor) / counts?.impact_factor?.length
      ),
      open_access_gold: check(extra?.access?.gold, counts?.open_alex?.gold),
      open_access_green: check(extra?.access?.green, counts?.open_alex?.green),
      open_access_bronze: check(
        extra?.access?.bronze,
        counts?.open_alex?.bronze
      ),
      citations_crossref: check(
        extra?.citations?.crossref,
        sum(counts?.citations?.crossref)
      ),
      citations_scopus: check(
        extra?.citations?.scopus,
        sum(counts?.citations?.scopus)
      ),
      citations_wos: check(extra?.citations?.wos, sum(counts?.citations?.wos)),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [one, two, faculty, access]);

  useEffect(() => {
    const check = (str1, str2) => (innerWidth > 1400 ? str1 : str2);

    setStrings({
      conferences: check("Conferences Attended", "Conferences"),
      papers: check("Papers Presented", "Papers"),
      posters: check("Posters Presented", "Posters"),
      books: check("Books/Chapters", "Books"),
      projects: check("Research Projects", "Projects"),
      funds: check("Lakhs Received", "Lakhs"),
      students: check("Students Guided", "Students"),
    });
  }, [innerWidth]);

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
                      width={innerWidth > 1400 ? 35 : 25}
                      height={innerWidth > 1400 ? 35 : 25}
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
            label1:
              access == 1
                ? "1st/Corresponding Author Publications"
                : "Number of Faculty",
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
        <div style={{ minWidth: "max-content" }}>
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
              label2: number(overview?.conferences),
              logo: MessageOutlined,
              link: "/profile#conferences",
            },
            {
              label1: strings.papers,
              label2: number(overview?.papers),
              logo: PaperClipOutlined,
              link: "/profile#conferences",
            },
            {
              label1: strings.posters,
              label2: number(overview?.posters),
              logo: PaperClipOutlined,
              link: "/profile#conferences",
            },
            {
              label1: "Books/Chapters",
              label2: number(overview?.books),
              logo: BookOutlined,
              link: "/profile#books",
            },
          ])}
        </div>
        <div>
          {createBox([
            {
              label1: strings.projects,
              label2: number(overview?.research),
              logo: ProjectOutlined,
              link: "/profile#projects",
            },
            {
              label1: strings.funds,
              label2: parseFloat(number(overview?.funds)).toFixed(2),
              logo: TrademarkCircleOutlined,
              link: "/profile#projects",
            },
            {
              label1: "Awards",
              label2: number(overview?.awards),
              logo: TrophyOutlined,
              link: "/profile#awards",
            },
            {
              label1: strings.students,
              label2: number(overview?.students),
              logo: UsergroupAddOutlined,
              link: "/profile#students",
            },
            {
              label1: "IPR",
              label2: number(overview?.IPR),
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
