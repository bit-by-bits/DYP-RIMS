import Image from "next/image";
import styles from "../../styles/profile.module.css";
import { Typography, Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "rooks";

import crossref from "../../../public/logos/crossref.jpg";
import medline from "../../../public/logos/medline.jpg";
import doaj from "../../../public/logos/doaj.png";
import pmc from "../../../public/logos/pmc.png";
import scopus from "../../../public/logos/scopus.svg";
import wos from "../../../public/logos/wos.svg";

import useTitleMaker from "../useTitleMaker";
import useNumber from "../useNumber";
import useCheck from "../useChecks";
import useSorter from "../useSorter";
import Scite from "../../components/Profile/Scite";
import Altmetric from "../../components/Profile/Altmetric";

const usePubSetter = () => {
  const router = useRouter();
  const { Paragraph } = Typography;
  const { innerWidth } = useWindowSize();

  const { titleMaker } = useTitleMaker();
  const { number } = useNumber();
  const { makeValid } = useCheck();
  const { sorter } = useSorter();

  return {
    pubData: (publications, fileData_1, setFileData_1) => {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
          width: innerWidth > 1600 ? "5%" : "4%",
        },
        {
          title: t => titleMaker(t, "title", "Publication Title", "Title"),
          dataIndex: "publication",
          key: "publication",
          width: innerWidth > 1600 ? "30%" : "30%",
        },
        {
          title: t => titleMaker(t, "impact_factor", "Impact Factor", "Impact"),
          dataIndex: "impact_factor",
          key: "impact_factor",
          sorter: (a, b, c) => sorter(a.impact_factor, b.impact_factor, 0, c),
        },
        {
          title: "SJR",
          dataIndex: "sjr",
          key: "sjr",
          sorter: (a, b, c) => sorter(a.sjr, b.sjr, 1, c),
          width: innerWidth > 1600 ? "5%" : "9%",
        },
        {
          title: t => titleMaker(t, "h_index", "H-Index", "HIndex"),
          dataIndex: "h_index",
          key: "h_index",
          sorter: (a, b, c) => sorter(a.h_index, b.h_index, 0, c),
        },
        {
          title: t => titleMaker(t, "index", "Indexed In", "Indexed"),
          dataIndex: "indexed_in",
          key: "indexed_in",
          filters: ["PubMed", "Scopus", "DOAJ", "WOS", "Medline", "None"].map(
            e => ({ text: e, value: e })
          ),
          filterSearch: true,
        },
        {
          title: "Citations",
          dataIndex: "citations",
          key: "citations",
          sorter: (a, b, c) =>
            sorter(a.citations[sortBy_1], b.citations[sortBy_1], 0, c),
          render: e => (
            <div className={styles.publicationGrid}>
              <Image src={crossref} alt="Crossref" height={30} width={30} />
              {`Crossref: ${number(e?.crossref)}`}
              <Image src={scopus} alt="Scopus" height={30} width={30} />
              {`Scopus: ${number(e?.scopus)}`}
              <Image src={wos} alt="WOS" height={30} width={30} />
              {`WOS: ${number(e?.wos)}`}
            </div>
          ),
        },
        {
          title: t => titleMaker(t, "published", "Published", "Year"),
          dataIndex: "published",
          key: "published",
          sorter: (a, b, c) => sorter(a.published, b.published, 0, c),
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
          width: innerWidth > 1600 ? "12%" : "6%",
        },
      ];

      const BODY = publications?.map((e, i) => {
        const arr = [
          {
            name: "PubMed",
            logo: pmc,
            bool: e.in_pubmed,
          },
          {
            name: "Scopus",
            logo: scopus,
            bool: e.in_scopus,
          },
          {
            name: "DOAJ",
            logo: doaj,
            bool: e.in_doaj,
          },
          {
            name: "WOS",
            logo: wos,
            bool: e.in_wos,
          },
          {
            name: "Medline",
            logo: medline,
            bool: e.in_medline,
          },
        ].filter(e => e.bool);

        let array = e?.actual_author;

        const FIRST = array?.find(e => e.sequence == "first");

        if (FIRST?.in_dyp == false) {
          array = array?.map(e =>
            e.sequence == "first" ? { ...e, sequence: "additional" } : e
          );

          const FIRST_DYP = array?.find(e => e.in_dyp == true);

          if (FIRST_DYP) {
            array = array?.map(e =>
              e.given + " " + e.family ==
              FIRST_DYP.given + " " + FIRST_DYP.family
                ? { ...e, sequence: "first" }
                : e
            );
          }
        }

        const authors =
          array?.map((e, i) => (
            <span key={i}>
              <span>{e?.given + " " + e?.family}</span>
              <sup>
                {e.sequence === "first"
                  ? "1"
                  : e.sequence === "corresponding"
                  ? "*"
                  : e.sequence === "firstncorr"
                  ? "1*"
                  : null}
              </sup>
              <span>, </span>
            </span>
          )) ?? "- Not Available -";

        return {
          key: i,
          title: e?.publication_title ?? "- Not Available -",
          authors: authors ?? "- Not Available -",
          publication: (
            <div className={styles.publication}>
              <div
                className={styles.publicationTitle}
                dangerouslySetInnerHTML={{
                  __html: e?.publication_title ?? "- Not Available -",
                }}
              />

              <Paragraph
                className={styles.publicationAuthors}
                ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
              >
                {authors}
              </Paragraph>

              <div className={styles.publicationJournal}>{e.journal_name}</div>

              <div
                className={styles.publicationStats}
              >{`Volume: ${e.volume} • Issue: ${e.issue} • Pages: ${e.pages}`}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: innerWidth > 1600 ? 50 : 20,
                }}
              >
                <Scite DOI={e.doi_id} type={1} />
                <Altmetric DOI={e.doi_id} type={1} />
              </div>

              {e.file ? (
                <div
                  onClick={() => window.open(e.file)}
                  style={{ color: "#52c41a", cursor: "pointer" }}
                >
                  Softcopy Available (Click to View)
                </div>
              ) : (
                <div
                  style={{ color: "#f5222d", cursor: "pointer" }}
                  onClick={() =>
                    setFileData_1({
                      ...fileData_1,
                      modal: true,
                      doi: e.doi_id,
                      authors: e.actual_author,
                    })
                  }
                >
                  No Softcopy Available (Click to Add)
                </div>
              )}
            </div>
          ),
          impact_factor: makeValid(e.impact_factor),
          sjr: makeValid(e.sjr_quartile),
          h_index: makeValid(e.h_index),
          index: [...arr?.map(e => e.name), "None"],
          indexed_in: (
            <div className={styles.publicationGrid}>
              {arr.length > 0
                ? arr.map(e => (
                    <Fragment key={e.name}>
                      <Image src={e.logo} alt={e.name} height={30} width={30} />
                      {e.name}
                    </Fragment>
                  ))
                : "None"}
            </div>
          ),
          citations: {
            total: e.citations_total,
            crossref: e.citations_crossref,
            scopus: e.citations_scopus,
            wos: e.citations_wos,
          },
          published: makeValid(e.year),
          action: (
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              style={innerWidth > 1600 ? { padding: "2px 10px" } : {}}
              className={styles.tableButton}
              onClick={() => router.push(`/file/${e.doi_id}`)}
            >
              {innerWidth > 1600 ? "View More" : null}
            </Button>
          ),
        };
      });

      BODY.sort((a, b) => b.published - a.published);
      if (innerWidth < 1600) TITLE.shift();

      return { TITLE, BODY };
    },
  };
};

export default usePubSetter;
