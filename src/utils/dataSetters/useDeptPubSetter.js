import Image from "next/image";
import styles from "../../styles/profile.module.css";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "rooks";

import crossref from "../../../public/logos/crossref.jpg";
import medline from "../../../public/logos/medline.jpg";
import doaj from "../../../public/logos/doaj.png";
import pmc from "../../../public/logos/pmc.png";
import scopus from "../../../public/logos/scopus.svg";
import wos from "../../../public/logos/wos.svg";

import useCaps from "../useCaps";
import useNumber from "../useNumber";
import useSorter from "../useSorter";
import useTitleMaker from "../useTitleMaker";

const useDeptPubSetter = () => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const { number } = useNumber();
  const { sorter } = useSorter();
  const { capitalize } = useCaps();
  const { titleMaker } = useTitleMaker();

  return {
    deptPubData: publications => {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
          width: "4%",
        },
        {
          title: t => titleMaker(t, "faculty", "Faculty Name", "Faculty"),
          dataIndex: "faculty",
          key: "faculty",
        },
        {
          title: t => titleMaker(t, "position", "Position", "Position"),
          dataIndex: "position",
          key: "position",
        },
        {
          title: t =>
            titleMaker(t, "publications", "Total Publications", "Pubs"),
          dataIndex: "publications",
          key: "publications",
          sorter: (a, b, c) => sorter(a.publications, b.publications, 0, c),
          width: "6%",
        },
        {
          title: t =>
            titleMaker(t, "indexed", "Indexed Publications", "Indexed"),
          dataIndex: "indexed",
          key: "indexed",
          render: a => (
            <div className={styles.publicationGrid2}>
              {a.map(e => (
                <div style={{ display: "flex", gap: 10 }} key={e.name}>
                  <Image src={e.logo} alt={e.name} height={30} width={30} />
                  {number(e.value)}
                </div>
              ))}
            </div>
          ),
        },
        {
          title: t =>
            titleMaker(t, "firstncorr", "1st/Corresponding Author", "1st/Corr"),
          dataIndex: "firstncorr",
          key: "firstncorr",
          sorter: (a, b, c) => sorter(a.firstncorr, b.firstncorr, 0, c),
          width: "6%",
        },
        {
          title: "SJR",
          dataIndex: "sjr",
          key: "sjr",
          render: a => (
            <div className={styles.publicationGrid2}>
              {a.map(e => (
                <div style={{ display: "flex", gap: 10 }} key={e.name}>
                  <span>{e.name}:</span>
                  <span>{number(e.value)}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          title: t => titleMaker(t, "impact", "Impact Factor", "Impact"),
          dataIndex: "impact",
          key: "impact",
          render: a => (
            <div className={styles.publicationGrid3}>
              {a.map(e => (
                <Fragment key={e.name}>
                  <span>{innerWidth < 1600 ? e.name?.[1] : e.name?.[0]}:</span>
                  <span>{number(e.value).toFixed(2)}</span>
                </Fragment>
              ))}
            </div>
          ),
        },
        {
          title: "Citations",
          dataIndex: "citations",
          key: "citations",
          render: a => (
            <div className={styles.publicationGrid}>
              {a.map(e => (
                <Fragment key={e.name}>
                  <Image src={e.logo} alt={e.name} height={30} width={30} />
                  {`${e.name}: ${number(e?.value)}`}
                </Fragment>
              ))}
            </div>
          ),
        },
        {
          title: t => titleMaker(t, "h_index", "H-Index", "Hindex"),
          dataIndex: "h_index",
          key: "h_index",
          render: a => (
            <div className={styles.publicationGrid}>
              {a.map(e => (
                <Fragment key={e.name}>
                  <Image src={e.logo} alt={e.name} height={30} width={30} />
                  {`${e.name}: ${number(e?.value)}`}
                </Fragment>
              ))}
            </div>
          ),
        },
      ];

      const BODY = publications.map((e, i) => {
        const sum = arr => arr?.reduce((a, b) => a + b, 0);
        const avg = arr => sum(arr) / arr?.length;

        const {
          indexed_at: iat,
          impact_factor: imf,
          citations: cts,
          quartiles: qrt,
          hindex: hix,
        } = e;

        const indexedArray = [
          {
            // name: "PubMed",
            logo: pmc,
            value: iat?.pubmed,
          },
          {
            // name: "Scopus",
            logo: scopus,
            value: iat?.scopus,
          },
          {
            // name: "DOAJ",
            logo: doaj,
            value: iat?.doaj,
          },
          {
            // name: "WOS",
            logo: wos,
            value: iat?.wos,
          },
          {
            // name: "Medline",
            logo: medline,
            value: iat?.medline,
          },
        ];

        const impactArray = [
          {
            name: ["Average", "Avg"],
            value: avg(imf),
          },
          {
            name: ["Cumulative", "Cum"],
            value: sum(imf),
          },
        ];

        const citationsArray = [
          {
            name: "Crossref",
            logo: crossref,
            value: sum(cts?.crossref),
          },
          {
            name: "Scopus",
            logo: scopus,
            value: sum(cts?.scopus),
          },
          {
            name: "WOS",
            logo: wos,
            value: sum(cts?.wos),
          },
        ];

        const hindexArray = [
          {
            name: "Crossref",
            logo: crossref,
            value: hix?.crossref,
          },
          {
            name: "Scopus",
            logo: scopus,
            value: hix?.scopus,
          },
          {
            name: "WOS",
            logo: wos,
            value: hix?.wos,
          },
        ];

        return {
          key: i,
          no: i + 1,
          faculty: capitalize(e.faculty_name),
          position: capitalize(e.designation),
          publications: number(e.total_publication),
          indexed: indexedArray,
          firstncorr: number(e.first_or_corr_count),
          sjr: ["Q1", "Q2", "Q3", "Q4", "None"]?.map(e => ({
            name: e,
            value: qrt ? qrt[e] : 0,
          })),
          impact: impactArray,
          citations: citationsArray,
          h_index: hindexArray,
        };
      });

      BODY?.sort((a, b) => b.publications - a.publications);
      if (innerWidth < 1600) TITLE.shift();

      return { TITLE, BODY };
    },
  };
};

export default useDeptPubSetter;
