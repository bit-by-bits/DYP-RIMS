import Head from "next/head";
import React, { useState, useEffect, Fragment } from "react";
import styles from "../styles/profile.module.css";
import { Table, Modal, Upload, message } from "antd";
import { Spin, Button, Typography, FloatButton } from "antd";
import Side from "../src/Common/Side";
import { useRouter } from "next/router";
import axios from "axios";
import URLObj from "../src/baseURL";
import { useWindowSize } from "rooks";
import {
  FileTextOutlined,
  InboxOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Overview from "../src/Profile/Overview";
import Scite from "../src/Profile/Scite";
import Altmetric from "../src/Profile/Altmetric";
import Top from "../src/Common/Top";
import Section from "../src/Profile/Section";

import crossref from "../public/logos/crossref.jpg";
import medline from "../public/logos/medline.jpg";
import doaj from "../public/logos/doaj.png";
import pmc from "../public/logos/pmc.png";
import scopus from "../public/logos/scopus.svg";
import wos from "../public/logos/wos.svg";

const Profile = () => {
  // BOILERPLATE

  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      user
        ? Date.now() - user?.setUpTime > 86400000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  // STATES

  const { Dragger } = Upload;
  const { Paragraph } = Typography;
  const { innerWidth } = useWindowSize();

  const [visible, setVisible] = useState(true);

  const [data, setData] = useState({});
  const [statistics, setStatistics] = useState({});
  const [fileData, setFileData] = useState({
    modal: false,
    file: null,
    doi: "",
    authors: [],
  });

  const [publications, setPublications] = useState({ title: [], body: [] });
  const [conferences, setConferences] = useState({ title: [], body: [] });
  const [books, setBooks] = useState({ title: [], body: [] });
  const [projects, setProjects] = useState({ title: [], body: [] });
  const [awards, setAwards] = useState({ title: [], body: [] });
  const [ipr, setIpr] = useState({ title: [], body: [] });
  const [students, setStudents] = useState({ title: [], body: [] });

  const [sortBy, setSortBy] = useState("scopus");
  const [sections, setSections] = useState("all");
  const [extra, setExtra] = useState({
    citations: {},
    impact: {},
    access: {},
    index: {},
    funds: 0,
    papers: 0,
    posters: 0,
  });

  // EFFECTS

  useEffect(() => {
    if (user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/home`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      })
        .then(res => {
          // LOAD USER

          const u = res.data?.user;

          const access_level = u?.access_level?.find(
            e => e.id === Math.max(...u?.access_level?.map(e => e.id))
          );

          const USER = {
            ...user,
            username: u?.username,
            name: u?.user?.first_name + " " + u?.user?.last_name,
            email: u?.user?.email,
            picture: u?.profile_picture,
            designation: u?.designation,
            department: u?.department?.name,
            level: access_level?.display_text + access_level?.id,
          };

          localStorage.setItem("user", JSON.stringify(USER));

          // LOAD DATA

          setData(res.data?.data);
          setStatistics(res.data?.statistics);

          // EXTRA CALCULATIONS

          let CITATIONS = { total: 0, crossref: 0, scopus: 0, wos: 0 };

          let IMPACT = { total: 0, average: 0 };

          let ACCESS = { gold: 0, green: 0, bronze: 0, closed: 0 };

          let INDEX = {
            pubmed: 0,
            scopus: 0,
            doaj: 0,
            wos: 0,
            medline: 0,
            total: 0,
          };

          let FUNDS = 0;
          let PAPERS = 0;
          let POSTERS = 0;

          res.data?.data?.publication?.forEach(e => {
            CITATIONS.total += e.citations_total;
            CITATIONS.crossref += e.citations_crossref;
            CITATIONS.scopus += e.citations_scopus;
            CITATIONS.wos += e.citations_wos;

            IMPACT.total += e.impact_factor;

            if (e.open_access) {
              switch (e.open_access_status) {
                case "gold":
                  ACCESS.gold++;
                  break;

                case "green":
                  ACCESS.green++;
                  break;

                case "bronze":
                  ACCESS.bronze++;
                  break;

                default:
              }
            } else ACCESS.closed++;

            if (e.in_pubmed) INDEX.pubmed++;
            if (e.in_scopus) INDEX.scopus++;
            if (e.in_doaj) INDEX.doaj++;
            if (e.in_wos) INDEX.wos++;
            if (e.in_medline) INDEX.medline++;

            if (
              e.in_pubmed ||
              e.in_scopus ||
              e.in_doaj ||
              e.in_wos ||
              e.in_medline
            )
              INDEX.total++;
          });

          IMPACT.average = IMPACT.total / res.data?.data?.publication?.length;

          res.data?.data?.conferences?.forEach(e => {
            if (e.is_paper_presented) PAPERS += e.papers?.length;

            if (e.is_poster_presented) POSTERS += e.posters?.length;
          });

          res.data?.data?.research?.forEach(e => {
            FUNDS += e.funds;
          });

          setExtra({
            citations: CITATIONS,
            impact: IMPACT,
            access: ACCESS,
            index: INDEX,
            funds: FUNDS,
            papers: PAPERS,
            posters: POSTERS,
          });

          // LOAD WEBSITE
          setVisible(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (data?.publication) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
          width: innerWidth > 1400 ? "5%" : "4%",
        },
        {
          title: t => titleMaker(t, "title", "Publication Title", "Title"),
          dataIndex: "publication",
          key: "publication",
          width: innerWidth > 1400 ? "30%" : "30%",
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
          width: innerWidth > 1400 ? "5%" : "9%",
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
          onFilter: (value, record) =>
            value == "None"
              ? !record.index.length
              : record.index.includes(value),
        },
        {
          title: "Citations",
          dataIndex: "citations",
          key: "citations",
          sorter: (a, b, c) =>
            sorter(a.citations[sortBy], b.citations[sortBy], 0, c),
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
          width: innerWidth > 1400 ? "12%" : "6%",
        },
      ];

      const BODY = data?.publication?.map((e, i) => {
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

        return {
          key: i,
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
                {e.actual_author.map((e, i) => (
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
                )) ?? "- Not Available -"}
              </Paragraph>

              <div className={styles.publicationJournal}>{e.journal_name}</div>

              <div
                className={styles.publicationStats}
              >{`Volume: ${e.volume} • Issue: ${e.issue} • Pages: ${e.pages}`}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: innerWidth > 1400 ? 50 : 20,
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
                    setFileData({
                      ...fileData,
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
          impact_factor: check(e.impact_factor),
          sjr: check(e.sjr_quartile),
          h_index: check(e.h_index),
          index: arr.map(e => e.name),
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
          published: check(e.year),
          action: (
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              style={innerWidth > 1400 ? { padding: "2px 10px" } : {}}
              className={styles.tableButton}
              onClick={() => router.push(`/file/${e.doi_id}`)}
            >
              {innerWidth > 1400 ? "View More" : null}
            </Button>
          ),
        };
      });

      BODY.sort((a, b) => b.published - a.published);
      if (innerWidth < 1400) TITLE.shift();
      setPublications({ title: TITLE, body: BODY });
    }

    if (data?.conferences) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "name", "Conference Name", "Name"),
          dataIndex: "name",
          key: "name",
        },
        {
          title: t => titleMaker(t, "attended_as", "Attended As", "As"),
          dataIndex: "attended_as",
          key: "attended_as",
        },
        {
          title: t => titleMaker(t, "type", "Conference Type", "Type"),
          dataIndex: "type",
          key: "type",
          sorter: (a, b, c) => sorter(a.type, b.type, 1, c),
        },
        {
          title: t => titleMaker(t, "paper", "Paper Presented", "Paper"),
          dataIndex: "paper",
          key: "paper",
        },
        {
          title: t => titleMaker(t, "poster", "Poster Presented", "Poster"),
          dataIndex: "poster",
          key: "poster",
        },
        {
          title: t => titleMaker(t, "date", "Conference Date", "Date"),
          dataIndex: "date",
          key: "date",
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = data?.conferences?.map((e, i) => ({
        key: i,
        name: e.conference_name,
        attended_as: capitalize(e.attended_as),
        type: capitalize(e.type),
        paper: e.is_paper_presented
          ? e.papers?.map(e => e.title).join(", ")
          : "N/A",
        poster: e.is_poster_presented
          ? e.posters?.map(e => e.title).join(", ")
          : "N/A",
        date: date(e.date),
        location: capitalize(e.location),
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1400 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/conference/${e.id}`)}
          >
            {innerWidth > 1400 ? "View More" : null}
          </Button>
        ),
      }));

      BODY.sort((a, b) => b.date - a.date);
      if (innerWidth < 1400) TITLE.shift();
      setConferences({ title: TITLE, body: BODY });
    }

    if (data?.books) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "title", "Publication Title", "Title"),
          dataIndex: "title",
          key: "title",
          width: "25%",
        },
        {
          title: t => titleMaker(t, "type", "Publication Type", "Type"),
          dataIndex: "type",
          key: "type",
        },
        {
          title: t => titleMaker(t, "book", "Book Name", "Book"),
          dataIndex: "book",
          key: "book",
        },
        {
          title: t => titleMaker(t, "publisher", "Publisher Name", "Publisher"),
          dataIndex: "publisher",
          key: "publisher",
        },
        {
          title: t => titleMaker(t, "published", "Published Year", "Year"),
          dataIndex: "published",
          key: "published",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = data?.books?.map((e, i) => ({
        key: i,
        title: e.publication_title,
        type: e.publication_type,
        book: e.book_name,
        publisher: "N/A",
        published: date(e.year_published),
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1400 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/book/${e.id}`)}
          >
            {innerWidth > 1400 ? "View More" : null}
          </Button>
        ),
      }));

      BODY.sort((a, b) => b.published - a.published);
      if (innerWidth < 1400) TITLE.shift();
      setBooks({ title: TITLE, body: BODY });
    }

    if (data?.research) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "agency", "Funding Agency", "Agency"),
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: t => titleMaker(t, "country", "Agency Country", "Country"),
          dataIndex: "country",
          key: "country",
        },
        {
          title: t => titleMaker(t, "type", "Agency Type", "Type"),
          dataIndex: "type",
          key: "type",
        },
        {
          title: t => titleMaker(t, "amount", "Funds", "Funds"),
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: t => titleMaker(t, "start", "Start Date", "Start"),
          dataIndex: "start",
          key: "start",
        },
        {
          title: t => titleMaker(t, "end", "End Date", "End"),
          dataIndex: "end",
          key: "end",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = data?.research?.map((e, i) => ({
        key: i,
        agency: e.funding_agency,
        country: capitalize(e.country_funding_agency),
        type: capitalize(e.type),
        amount: number(e.funds) + " Lakhs",
        start: date(e.starting_date),
        end: date(e.end_date),
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1400 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/project/${e.id}`)}
          >
            {innerWidth > 1400 ? "View More" : null}
          </Button>
        ),
      }));

      BODY.sort((a, b) => b.start - a.start);
      if (innerWidth < 1400) TITLE.shift();
      setProjects({ title: TITLE, body: BODY });
    }

    if (data?.awards) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "name", "Award Name", "Award"),
          dataIndex: "name",
          key: "name",
        },
        {
          title: t => titleMaker(t, "agency", "Awarding Agency", "Agency"),
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: t => titleMaker(t, "type", "Award Type", "Type"),
          dataIndex: "type",
          key: "type",
          sorter: (a, b, c) => sorter(a.type, b.type, 1, c),
        },
        {
          title: t => titleMaker(t, "date", "Awarded Date", "Date"),
          dataIndex: "date",
          key: "date",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = data?.awards?.map((e, i) => ({
        key: i,
        name: capitalize(e.award_name),
        agency: capitalize(e.awarding_agency),
        type: capitalize(e.award_type),
        date: date(e.date_awarded),
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1400 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/award/${e.id}`)}
          >
            {innerWidth > 1400 ? "View More" : null}
          </Button>
        ),
      }));

      BODY.sort((a, b) => b.date - a.date);
      if (innerWidth < 1400) TITLE.shift();
      setAwards({ title: TITLE, body: BODY });
    }

    if (data?.IPR) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "ipr", "IPR Awarded", "IPR"),
          dataIndex: "ipr",
          key: "ipr",
        },
        {
          title: t => titleMaker(t, "title", "Title of IPR", "Title"),
          dataIndex: "title",
          key: "title",
        },
        {
          title: t => titleMaker(t, "status", "IPR Status", "Status"),
          dataIndex: "status",
          key: "status",
        },
        {
          title: t => titleMaker(t, "agency", "Awarding Agency", "Agency"),
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: t => titleMaker(t, "date", "Published Date", "Date"),
          dataIndex: "date",
          key: "date",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = data?.IPR?.map((e, i) => ({
        key: i,
        ipr: e.IPR_awarded,
        title: e.title_of_ipr,
        status: capitalize(e.status),
        agency: capitalize(e.awarding_agency),
        date: date(e.date_of_publication),
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1400 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/ipr/${e.id}`)}
          >
            {innerWidth > 1400 ? "View More" : null}
          </Button>
        ),
      }));

      BODY.sort((a, b) => b.date - a.date);
      if (innerWidth < 1400) TITLE.shift();
      setIpr({ title: TITLE, body: BODY });
    }

    if (data?.students_guided) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "name", "Student Name", "Name"),
          dataIndex: "name",
          key: "name",
        },
        {
          title: t => titleMaker(t, "degree", "Student Degree", "Degree"),
          dataIndex: "degree",
          key: "degree",
        },
        {
          title: t => titleMaker(t, "thesis", "Thesis Topic", "Thesis"),
          dataIndex: "thesis",
          key: "thesis",
        },
        {
          title: t => titleMaker(t, "year", "Guided Year", "Year"),
          dataIndex: "year",
          key: "year",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = data?.students_guided?.map((e, i) => ({
        key: i,
        name: capitalize(e.student_name),
        degree: capitalize(e.student_degree),
        thesis: capitalize(e.thesis_topic),
        year: e.year,
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1400 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/student/${e.id}`)}
          >
            {innerWidth > 1400 ? "View More" : null}
          </Button>
        ),
      }));

      BODY.sort((a, b) => b.year - a.year);
      if (innerWidth < 1400) TITLE.shift();
      setStudents({ title: TITLE, body: BODY });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, sortBy, innerWidth]);

  // FUNCTIONS

  const checks = [
    0,
    "0",
    "N/A",
    "NA",
    "Not Available",
    "Not Applicable",
    "-",
    "",
    null,
    undefined,
    "null",
    "undefined",
    "NaN",
    "nan",
    "NAN",
    "Nan",
  ];

  const uploadFile = () => {
    message.loading("Uploading file");

    if (user?.token) {
      const str = JSON.stringify({
        doi: fileData?.doi,
        file: fileData?.file,
        author: fileData?.authors,
      });

      axios({
        method: "POST",
        url: `${URLObj.base}/publications/`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
          "X-TEST-ENVIRONMENT": "0",
          "Content-Type": "application/json",
        },
        data: str,
      })
        .then(res => {
          message.success("File uploaded successfully");
          setFileData({ modal: false, file: null, doi: "", authors: [] });

          axios({
            method: "GET",
            url: `${URLObj.base}/home`,
            headers: {
              "X-ACCESS-KEY": URLObj.key,
              "X-AUTH-TOKEN": user?.token,
            },
          }).then(res => setData(res.data?.data));
        })
        .catch(err => {
          message.error("Could not upload file");
          console.log(err);
        });
    }
  };

  const date = d => {
    return (
      new Date(d).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) ?? d
    );
  };

  const number = num => (num ? (isNaN(num) ? 0 : num) : 0);

  const capitalize = str =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "N/A";

  const sorter = (first, second, type, mode) => {
    const newChecks = checks.slice(2);

    if (newChecks.includes(first)) return mode === "ascend" ? 1 : -1;
    if (newChecks.includes(second)) return mode === "ascend" ? -1 : 1;

    if (type == 0) return first - second;
    else return first.localeCompare(second);
  };

  const check = num => {
    if (checks.includes(num)) return "N/A";
    else return num;
  };

  const titleMaker = (titleProps, name, title1, title2) => {
    const sortedColumn = titleProps.sortColumns?.find(
      ({ column }) => column.key === name
    );

    return (
      <div
        style={{
          gap: { innerWidth } > 1400 ? 10 : 5,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>{innerWidth > 1400 ? title1 : title2}</span>
        {sortedColumn?.order === "ascend" ? (
          <SortAscendingOutlined />
        ) : sortedColumn?.order === "descend" ? (
          <SortDescendingOutlined />
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | Profile</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spin
          className="spinner"
          spinning={visible}
          size="large"
          tip="Please wait as page loads"
        >
          <FloatButton.BackTop
            style={{ left: 30, bottom: 30, borderRadius: "50%" }}
          />

          <div style={{ paddingLeft: "18vw" }}>
            <Side sets={setSections} />

            <div className={styles.container}>
              <Top
                main={{ publications, setPublications, setSections }}
                user={user}
              />

              {sections == "all" && (
                <div className={styles.section}>
                  <div className={styles.sectionTop}>
                    <div id="overview" className={styles.heading}>
                      Overview
                    </div>
                  </div>
                  <Overview
                    data={data}
                    stats={statistics}
                    extra={extra}
                    size={innerWidth}
                  />
                </div>
              )}

              {(sections == "all" || sections == "publications") && (
                <div className={styles.section}>
                  <div className={styles.sectionTop}>
                    <div id="publications" className={styles.heading}>
                      Publications
                    </div>
                    <div style={{ display: "flex", gap: 15 }}>
                      <Button
                        type="primary"
                        className={styles.sectionButton}
                        onClick={() => {
                          if (sortBy === "scopus") setSortBy("wos");
                          else if (sortBy === "wos") setSortBy("crossref");
                          else if (sortBy === "crossref") setSortBy("scopus");
                        }}
                      >
                        Sorting Citations By: {sortBy.toUpperCase()}
                      </Button>
                      {sections == "all" ? (
                        <Button
                          type="primary"
                          className={styles.sectionButton}
                          onClick={() => setSections("publications")}
                        >
                          View All
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          className={styles.sectionButton}
                          onClick={() => setSections("all")}
                        >
                          Return Back
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className={styles.sectionBottom}>
                    <Table
                      pagination={sections == "all" ? true : false}
                      columns={publications?.title}
                      dataSource={publications?.body}
                    />
                  </div>
                </div>
              )}

              <Section
                str="Conferences"
                data={conferences}
                sec={sections}
                setSec={setSections}
              />

              <Section
                str="Books"
                data={books}
                sec={sections}
                setSec={setSections}
              />

              <Section
                str="Projects"
                data={projects}
                sec={sections}
                setSec={setSections}
              />

              <Section
                str="Awards"
                data={awards}
                sec={sections}
                setSec={setSections}
              />

              <Section
                str="IPR"
                data={ipr}
                sec={sections}
                setSec={setSections}
              />

              <Section
                str="Students"
                data={students}
                sec={sections}
                setSec={setSections}
              />

              <Modal
                title="Upload PDF"
                open={fileData?.modal}
                onCancel={() => setFileData({ ...fileData, modal: false })}
                footer={null}
              >
                <Dragger
                  name="file"
                  multiple={false}
                  style={{ borderColor: "#9a2827" }}
                  onChange={info => {
                    const { status } = info.file;
                    if (status === "done")
                      setFileData({ ...fileData, file: info.file });
                  }}
                  beforeUpload={file => uploadFile()}
                >
                  <InboxOutlined
                    style={{ fontSize: 60, margin: "10px 0", color: "#9a2827" }}
                  />
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </Dragger>
              </Modal>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Profile;
