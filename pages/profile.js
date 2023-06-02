import Head from "next/head";
import React, { useState, useEffect, Fragment, createElement } from "react";
import styles from "../styles/profile.module.css";
import {
  Button,
  Typography,
  FloatButton,
  Input,
  Spin,
  Table,
  AutoComplete,
} from "antd";
import Side from "../src/Profile/Side";
import { useRouter } from "next/router";
import axios from "axios";
import URLObj from "../src/baseURL";
import {
  BellOutlined,
  FileTextOutlined,
  LogoutOutlined,
  SettingOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Overview from "../src/Profile/Overview";

import crossref from "../public/logos/crossref.jpg";
import medline from "../public/logos/medline.jpg";
import doaj from "../public/logos/doaj.png";
import pmc from "../public/logos/pmc.png";
import embase from "../public/logos/embase.svg";
import scopus from "../public/logos/scopus.svg";
import scie from "../public/logos/scie.svg";
import wos from "../public/logos/wos.svg";

import Scite from "../src/Profile/Scite";
import Altmetric from "../src/Profile/Altmetric";
import { useWindowSize } from "rooks";

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
        ? Date.now() - user.setUpTime > 3600000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  // STATES

  const { Paragraph } = Typography;
  const { innerWidth } = useWindowSize();
  const [visible, setVisible] = useState(true);

  const [person, setPerson] = useState({});
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
    hIndex: {},
    impact: {},
    access: {},
    index: {},
    history: [],
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
          setPerson(res.data?.user);
          setData(res.data?.data);
          setStatistics(res.data?.statistics);

          // EXTRA CALCULATIONS

          const TEMP = {
            total: 0,
            crossref: 0,
            scopus: 0,
            wos: 0,
          };

          let CITATIONS = { ...TEMP };
          let H_INDEX = { ...TEMP };

          let IMPACT = {
            total: 0,
            average: 0,
          };

          let ACCESS = {
            gold: 0,
            green: 0,
            bronze: 0,
            closed: 0,
          };

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

            H_INDEX.total += e.h_index_total;
            H_INDEX.crossref += e.h_index_crossref;
            H_INDEX.scopus += e.h_index_scopus;
            H_INDEX.wos += e.h_index_wos;

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
            hIndex: H_INDEX,
            impact: IMPACT,
            access: ACCESS,
            index: INDEX,
            history: extra.history,
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
          width: innerWidth > 1400 ? "5%" : "8%",
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
          width: innerWidth > 1400 ? "10%" : "6%",
        },
      ];

      const BODY = bodyMaker(data?.publication);

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
          title: "Conference Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Paper Presented",
          dataIndex: "paper",
          key: "paper",
        },
        {
          title: "Poster Presented",
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

      const BODY = [];

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

    if (data?.projects) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "Principal Investigator",
          dataIndex: "pi",
          key: "pi",
        },
        {
          title: "Co-Investigator",
          dataIndex: "ci",
          key: "ci",
        },
        {
          title: "Funding Agency",
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: "Country",
          dataIndex: "country",
          key: "country",
        },
        {
          title: "Agency Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Start Date",
          dataIndex: "start",
          key: "start",
        },
        {
          title: "End Date",
          dataIndex: "end",
          key: "end",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = [];

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
          title: "Type",
          dataIndex: "type",
          key: "type",
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
        awarding_agency: e.awarding_agency,
        date: new Date(e.date_awarded).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        name: e.name?.user?.first_name + " " + e.name?.user?.last_name,
        department: e.department?.name,
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={{ padding: "2px 10px" }}
            className={styles.tableButton}
            onClick={() => router.push(`/file/${e.doi_id}`)}
          >
            View More
          </Button>
        ),
      }));

      setAwards({ title: TITLE, body: BODY });
    }

    if (data?.ipr) {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "key",

          key: "key",
        },
        {
          title: "IPR",
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

      const BODY = [];

      setIpr({ title: TITLE, body: BODY });
    }

    if (data?.students) {
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
  }, [data]);

  // FUNCTIONS

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

  const bodyMaker = arr => {
    return arr?.map((e, i) => ({
      key: `${i + 1}.`,
      publication: (
        <div className={styles.publication}>
          <div className={styles.publicationTitle}>{e.publication_title}</div>
          <Paragraph
            className={styles.publicationAuthors}
            ellipsis={{
              rows: 3,
              expandable: true,
              symbol: "more",
            }}
          >
            {e.author_name?.map((e, i) =>
              e?.user ? (
                <span key={`first-${i}`}>
                  {e?.user?.first_name + " " + e?.user?.last_name}
                  <sup>1</sup>
                  <span>, </span>
                </span>
              ) : null
            )}
            {e.corresponding_authors?.map(e =>
              e?.user ? (
                <span key={`corresponding-${e.id}`}>
                  {e?.user?.first_name + " " + e?.user?.last_name}
                  <sup>*</sup>
                  <span>, </span>
                </span>
              ) : null
            )}
            {e.other_authors?.map(e => e).join(", ")}
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
          style={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            maxHeight: "100vh",
            position: "fixed",
            backgroundColor: "rgba(256, 256, 256, 0.8)",
          }}
          spinning={visible}
          size="large"
          tip="Please wait as page loads"
        >
          <FloatButton.BackTop
            style={{ left: 30, bottom: 30, borderRadius: "50%" }}
          />

          <div style={{ paddingLeft: "18vw" }}>
            <Side user={person} sets={setSections} profile={true} />

            <div className={styles.container}>
              <div className={styles.top}>
                <AutoComplete
                  className={styles.topInput}
                  options={extra.history?.map((e, i) => ({
                    key: i,
                    value: e,
                    label: e,
                  }))}
                >
                  <Input.Search
                    className={styles.topInput}
                    placeholder="Search for research within RIMS using title or keywords"
                    onChange={e => {
                      axios({
                        method: "GET",
                        url: `${URLObj.base}/search`,
                        headers: {
                          "X-ACCESS-KEY": URLObj.key,
                          "X-AUTH-TOKEN": user?.token,
                        },
                      }).then(res => {
                        setExtra({
                          ...extra,
                          history: res.data?.history?.map(e => e?.search_query),
                        });
                      });
                    }}
                    onSearch={e => {
                      if (e) {
                        setPublications({
                          title: publications?.title,
                          body: bodyMaker(
                            data?.publication?.filter(p =>
                              [
                                ...p.keywords?.map(k =>
                                  k.display_name.toLowerCase()
                                ),
                                p.publication_title.toLowerCase(),
                              ]?.includes(e?.toLowerCase())
                            )
                          ),
                        });

                        let formdata = new FormData();
                        formdata.append("query", e);

                        axios({
                          method: "POST",
                          url: `${URLObj.base}/search/`,
                          headers: {
                            "X-ACCESS-KEY": URLObj.key,
                            "X-AUTH-TOKEN": user?.token,
                          },
                          data: formdata,
                        });

                        setSections("publications");
                      } else setSections("all");
                    }}
                    allowClear
                  />
                </AutoComplete>
                <Button
                  type="primary"
                  className={styles.topButton}
                  onClick={() => router.push("/upload")}
                >
                  Add Publications
                </Button>
                <Button
                  type="primary"
                  className={[`${styles.topButtonCircle} ${styles.topButton}`]}
                  onClick={() => {
                    localStorage.removeItem("user");
                    router.push("/");
                  }}
                >
                  {createElement(LogoutOutlined)}
                </Button>
                <Button
                  type="primary"
                  className={[`${styles.topButtonCircle} ${styles.topButton}`]}
                  onClick={() => router.push("/notifications")}
                >
                  {createElement(BellOutlined)}
                </Button>
                <Button
                  type="primary"
                  className={[`${styles.topButtonCircle} ${styles.topButton}`]}
                  onClick={() => router.push("/settings")}
                >
                  {createElement(SettingOutlined)}
                </Button>
              </div>

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
                        Sort Citations By: {sortBy.toUpperCase()}
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

              {(sections == "all" || sections == "conferences") && (
                <div className={styles.section}>
                  <div className={styles.sectionTop}>
                    <div id="conferences" className={styles.heading}>
                      Conferences
                    </div>
                    {sections == "all" ? (
                      <Button
                        type="primary"
                        className={styles.sectionButton}
                        onClick={() => setSections("conferences")}
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
                  <div className={styles.sectionBottom}>
                    <Table
                      columns={conferences?.title}
                      dataSource={conferences?.body}
                    />
                  </div>
                </div>
              )}

              {(sections == "all" || sections == "books") && (
                <div className={styles.section}>
                  <div className={styles.sectionTop}>
                    <div id="books" className={styles.heading}>
                      Books/Chapters
                    </div>
                    {sections == "all" ? (
                      <Button
                        type="primary"
                        className={styles.sectionButton}
                        onClick={() => setSections("books")}
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
                  <div className={styles.sectionBottom}>
                    <Table columns={books?.title} dataSource={books?.body} />
                  </div>
                </div>
              )}

              {(sections == "all" || sections == "projects") && (
                <div className={styles.section}>
                  <div className={styles.sectionTop}>
                    <div id="projects" className={styles.heading}>
                      Research Projects
                    </div>
                    {sections == "all" ? (
                      <Button
                        type="primary"
                        className={styles.sectionButton}
                        onClick={() => setSections("projects")}
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
                  <div className={styles.sectionBottom}>
                    <Table
                      columns={projects?.title}
                      dataSource={projects?.body}
                    />
                  </div>
                </div>
              )}

              {(sections == "all" || sections == "awards") && (
                <div className={styles.section}>
                  <div className={styles.sectionTop}>
                    <div id="awards" className={styles.heading}>
                      Awards
                    </div>
                    {sections == "all" ? (
                      <Button
                        type="primary"
                        className={styles.sectionButton}
                        onClick={() => setSections("awards")}
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
                  <div className={styles.sectionBottom}>
                    <Table columns={awards?.title} dataSource={awards?.body} />
                  </div>
                </div>
              )}

              {(sections == "all" || sections == "ipr") && (
                <div className={styles.section}>
                  <div className={styles.sectionTop}>
                    <div id="ipr" className={styles.heading}>
                      IPR
                    </div>
                    {sections == "all" ? (
                      <Button
                        type="primary"
                        className={styles.sectionButton}
                        onClick={() => setSections("ipr")}
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
                  <div className={styles.sectionBottom}>
                    <Table columns={ipr?.title} dataSource={ipr?.body} />
                  </div>
                </div>
              )}

              {(sections == "all" || sections == "students") && (
                <div className={styles.section}>
                  <div className={styles.sectionTop}>
                    <div id="students" className={styles.heading}>
                      Students Guided
                    </div>
                    {sections == "all" ? (
                      <Button
                        type="primary"
                        className={styles.sectionButton}
                        onClick={() => setSections("students")}
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
                  <div className={styles.sectionBottom}>
                    <Table
                      columns={students?.title}
                      dataSource={students?.body}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Profile;
