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

const useDeptPubSetter = () => {
  const router = useRouter();
  const { Paragraph } = Typography;
  const { innerWidth } = useWindowSize();

  const { titleMaker } = useTitleMaker();
  const { number } = useNumber();
  const { makeValid } = useCheck();
  const { sorter } = useSorter();

  return {
    deptPubData: publications => {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
          width: innerWidth > 1600 ? "5%" : "4%",
        },
        {
          title: t => titleMaker(t, "faculty", "Faculty Name", "Faculty"),
          dataIndex: "faculty",
          key: "faculty",
          width: innerWidth > 1600 ? "15%" : "15%",
        },
        {
          title: t => titleMaker(t, "position", "Position", "Position"),
          dataIndex: "position",
          key: "position",
          width: innerWidth > 1600 ? "15%" : "15%",
        },
        {
          title: t =>
            titleMaker(t, "publications", "Total Publications", "Publications"),
          dataIndex: "publications",
          key: "publications",
          sorter: (a, b, c) => sorter(a.publications, b.publications, 0, c),
        },
        {
          title: t =>
            titleMaker(t, "indexed", "Indexed Publications", "Indexed"),
          dataIndex: "indexed",
          key: "indexed",
          filters: ["PubMed", "Scopus", "DOAJ", "WOS", "Medline", "None"].map(
            e => ({ text: e, value: e })
          ),
          filterSearch: true,
        },
        {
          title: t =>
            titleMaker(
              t,
              "firstncorr",
              "1st/Corresponding Author",
              "1st/Corr Author"
            ),
          dataIndex: "firstncorr",
          key: "firstncorr",
          sorter: (a, b, c) => sorter(a.published, b.published, 0, c),
        },
        {
          title: "SJR",
          dataIndex: "sjr",
          key: "sjr",
          sorter: (a, b, c) => sorter(a.sjr, b.sjr, 1, c),
          width: innerWidth > 1600 ? "5%" : "9%",
        },
        {
          title: "Citations",
          dataIndex: "citations",
          key: "citations",
          sorter: (a, b, c) => sorter(a.citations, b.citations, 0, c),
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
          title: t => titleMaker(t, "h_index", "H-Index", "Hindex"),
          dataIndex: "h_index",
          key: "h_index",
          sorter: (a, b, c) => sorter(a.h_index, b.h_index, 1, c),
          width: innerWidth > 1600 ? "5%" : "9%",
        },
      ];

      const BODY = publications.map((e, i) => ({
        key: i,
        no: i + 1,
        faculty: e.faculty,
        position: e.position,
        publications: e.publications,
        indexed: e.indexed,
        firstncorr: e.firstncorr,
        sjr: e.sjr,
        citations: e.citations,
        h_index: e.h_index,
      }));

      if (innerWidth < 1600) TITLE.shift();
      return { TITLE, BODY };
    },
  };
};

export default useDeptPubSetter;
