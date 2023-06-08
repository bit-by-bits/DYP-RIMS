import Head from "next/head";
import React, { useState, useEffect, Fragment } from "react";
import styles from "../styles/profile.module.css";
import { Button, Typography, FloatButton, Spin, Table } from "antd";
import Side from "../src/Common/Side";
import { useRouter } from "next/router";
import axios from "axios";
import URLObj from "../src/baseURL";
import {
  FileTextOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Overview from "../src/Profile/Overview";

import crossref from "../public/logos/crossref.jpg";
import medline from "../public/logos/medline.jpg";
import doaj from "../public/logos/doaj.png";
import pmc from "../public/logos/pmc.png";
import scopus from "../public/logos/scopus.svg";
import wos from "../public/logos/wos.svg";

import Scite from "../src/Profile/Scite";
import Altmetric from "../src/Profile/Altmetric";
import { useWindowSize } from "rooks";
import Top from "../src/Common/Top";
import Section from "../src/Profile/Section";

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
        ? Date.now() - user?.setUpTime > 3600000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  // STATES

  const { Paragraph } = Typography;
  const { innerWidth } = useWindowSize();
  const [visible, setVisible] = useState(true);

  const [data, setData] = useState({});
  const [statistics, setStatistics] = useState({});

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

            if (e.in_pmc) INDEX.pubmed++;
            if (e.in_scopus) INDEX.scopus++;
            if (e.in_doaj) INDEX.doaj++;
            if (e.in_wos) INDEX.wos++;
            if (e.in_medline) INDEX.medline++;

            if (
              e.in_pmc ||
              e.in_scopus ||
              e.in_doaj ||
              e.in_wos ||
              e.in_medline
            )
              INDEX.total++;
          });

          IMPACT.average = IMPACT.total / res.data?.data?.publication?.length;

          setExtra({
            citations: CITATIONS,
            impact: IMPACT,
            access: ACCESS,
            index: INDEX,
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
          dataIndex: "key",
          key: "key",
          width: innerWidth > 1400 ? "5%" : "4%",
        },
        {
          title: "Publication",
          dataIndex: "publication",
          key: "publication",
          width: innerWidth > 1400 ? "30%" : "30%",
        },
        {
          title: t => titleMaker(t, "impact_factor", "Impact Factor", "Impact"),
          dataIndex: "impact_factor",
          key: "impact_factor",
          sorter: (a, b) => a.impact_factor - b.impact_factor,
        },
        {
          title: t => titleMaker(t, "sjr", "SJR", "SJR"),
          dataIndex: "sjr",
          key: "sjr",
          sorter: (a, b) => a.sjr.localeCompare(b.sjr),
          width: innerWidth > 1400 ? "5%" : "9%",
        },
        {
          title: t => titleMaker(t, "h_index", "H-Index", "HIndex"),
          dataIndex: "h_index",
          key: "h_index",
          sorter: (a, b) => a.h_index - b.h_index,
        },
        {
          title: t => titleMaker(t, "index", "Indexed In", "Indexed"),
          dataIndex: "indexed_in",
          key: "indexed_in",
          filters: [
            {
              text: "PubMed",
              value: "PubMed",
            },
            {
              text: "Scopus",
              value: "Scopus",
            },
            {
              text: "DOAJ",
              value: "DOAJ",
            },
            {
              text: "WOS",
              value: "WOS",
            },
            {
              text: "Medline",
              value: "Medline",
            },
          ],
          filterSearch: true,
          onFilter: (value, record) => record.index.includes(value),
        },
        {
          title: t => titleMaker(t, "citations", "Citations", "Citations"),
          dataIndex: "citations",
          key: "citations",
          sorter: (a, b) => a.citations[sortBy] - b.citations[sortBy],
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
          sorter: (a, b) => a.published - b.published,
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
          width: innerWidth > 1400 ? "12%" : "6%",
        },
      ];

      const BODY = publicationsMaker(data?.publication);

      if (innerWidth < 1400) TITLE.shift();
      setPublications({ title: TITLE, body: BODY });
    }

    if (data?.conferences) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Attended As",
          dataIndex: "attended_as",
          key: "attended_as",
        },
        {
          title: t => titleMaker(t, "type", "Type", "Type"),
          dataIndex: "type",
          key: "type",
          sorter: (a, b) => a.type.localeCompare(b.type),
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
          title: "Date",
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
        key: `${i + 1}.`,
        name: e.conference_name,
        attended_as: e.attended_as,
        type: e.type,
        paper: e.is_paper_presented
          ? e.papers?.map(e => e.title).join(", ")
          : "N/A",
        poster: e.is_poster_presented
          ? e.posters?.map(e => e.title).join(", ")
          : "N/A",
        date: date(e.date),
        location: e.location,
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

      if (innerWidth < 1400) TITLE.shift();
      setConferences({ title: TITLE, body: BODY });
    }

    if (data?.books) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Book Name",
          dataIndex: "book",
          key: "book",
        },
        {
          title: "Publisher",
          dataIndex: "publisher",
          key: "publisher",
        },
        {
          title: "Published",
          dataIndex: "published",
          key: "published",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = [];

      setBooks({ title: TITLE, body: BODY });
    }

    if (data?.research) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "key",
          key: "key",
        },
        {
          title: t =>
            titleMaker(t, "pi", "Principal Investigator", "Principal"),
          dataIndex: "pi",
          key: "pi",
        },
        {
          title: t => titleMaker(t, "ci", "Co-Investigator", "Co"),
          dataIndex: "ci",
          key: "ci",
        },
        {
          title: t => titleMaker(t, "agency", "Funding Agency", "Agency"),
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: "Country",
          dataIndex: "country",
          key: "country",
        },
        {
          title: t => titleMaker(t, "type", "Agency Type", "Type"),
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Start",
          dataIndex: "start",
          key: "start",
        },
        {
          title: "End",
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
        key: `${i + 1}.`,
        pi: e.principal_investigator,
        ci: e.co_investigator,
        agency: e.funding_agency,
        country: e.country_funding_agency,
        type: e.type,
        amount: e.funds,
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

      if (innerWidth < 1400) TITLE.shift();
      setProjects({ title: TITLE, body: BODY });
    }

    if (data?.awards) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "Award Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Awarding Agency",
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: t => titleMaker(t, "type", "Type", "Type"),
          dataIndex: "type",
          key: "type",
          sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
          title: "Date",
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
        key: `${i + 1}.`,
        agency: e.awarding_agency,
        date: date(e.date_awarded),
        name: e.name?.user?.first_name + " " + e.name?.user?.last_name,
        department: e.department?.name,
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

      if (innerWidth < 1400) TITLE.shift();
      setAwards({ title: TITLE, body: BODY });
    }

    if (data?.IPR) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "key",

          key: "key",
        },
        {
          title: t => titleMaker(t, "ipr", "IPR Awarded", "IPR"),
          dataIndex: "ipr",
          key: "ipr",
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Awarding Agency",
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: "Date",
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
        key: `${i + 1}.`,
        ipr: e.IPR_awarded,
        title: e.title_of_ipr,
        status: e.status,
        agency: e.awarding_agency,
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

      if (innerWidth < 1400) TITLE.shift();
      setIpr({ title: TITLE, body: BODY });
    }

    if (data?.students_guided) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "Student Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Degree",
          dataIndex: "degree",
          key: "degree",
        },
        {
          title: "Thesis Topic",
          dataIndex: "thesis",
          key: "thesis",
        },
        {
          title: "Year",
          dataIndex: "year",
          key: "year",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = [];

      setStudents({ title: TITLE, body: BODY });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, sortBy]);

  // FUNCTIONS

  const date = d =>
    new Date(d).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) ?? d;

  const number = num => (num ? (isNaN(num) ? 0 : num) : 0);

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

  const publicationsMaker = arr => {
    return arr?.map((e, i) => ({
      key: `${i + 1}.`,
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
            ellipsis={{
              rows: 3,
              expandable: true,
              symbol: "more",
            }}
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
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Scite DOI={e.doi_id} type={1} />
            <Altmetric DOI={e.doi_id} type={1} />
          </div>
        </div>
      ),
      impact_factor: e.impact_factor,
      sjr: e.sjr_quartile,
      h_index: e.h_index,
      index: [
        {
          name: "PubMed",
          bool: e.in_pmc,
        },
        {
          name: "Scopus",
          bool: e.in_scopus,
        },
        {
          name: "DOAJ",
          bool: e.in_doaj,
        },
        {
          name: "WOS",
          bool: e.in_wos,
        },
        {
          name: "Medline",
          bool: e.in_medline,
        },
      ]
        .filter(e => e.bool)
        .map(e => e.name),
      indexed_in: (
        <div className={styles.publicationGrid}>
          {[
            {
              name: "PubMed",
              logo: pmc,
              bool: e.in_pmc,
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
          ]
            .filter(e => e.bool)
            .map(e => (
              <Fragment key={e.name}>
                <Image src={e.logo} alt={e.name} height={30} width={30} />
                {e.name}
              </Fragment>
            ))}
        </div>
      ),
      citations: {
        total: e.citations_total,
        crossref: e.citations_crossref,
        scopus: e.citations_scopus,
        wos: e.citations_wos,
      },
      published: e.year,
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
    }));
  };

  return (
    <>
      <Head>
        <title>Profile</title>
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
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Profile;
