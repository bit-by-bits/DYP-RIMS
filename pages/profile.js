import axios from "axios";
import Head from "next/head";
import URLObj from "../src/components/baseURL";
import styles from "../src/styles/profile.module.css";
import { useState, useEffect, useMemo } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Spin, Button, FloatButton, Row, Col } from "antd";
import { Table, Modal, Upload, message, DatePicker } from "antd";

import Top from "../src/components/Common/Top";
import Side from "../src/components/Common/Side";
import Section from "../src/components/Profile/Section";
import Overview from "../src/components/Profile/Overview";
import BarChart from "../src/components/Profile/BarChart";
import { useUser } from "../src/components/context/userContext";
import { useAccess } from "../src/components/context/accessContext";

import usePubSetter from "../src//utils/dataSetters/usePubSetter";
import useConfSetter from "../src//utils/dataSetters/useConfSetter";
import useBookSetter from "../src//utils/dataSetters/useBookSetter";
import useProjSetter from "../src//utils/dataSetters/useProjSetter";
import useAwardSetter from "../src//utils/dataSetters/useAwardSetter";
import useIPRSetter from "../src//utils/dataSetters/useIPRSetter";
import useStudSetter from "../src//utils/dataSetters/useStudSetter";
import useExtraSetter from "../src//utils/dataSetters/useExtraSetter";
import ScrollBox from "../src/components/Profile/ScrollBox";
import useDeptPubSetter from "../src/utils/dataSetters/useDeptPubSetter";

const Profile = () => {
  // HOOKS

  const { Dragger } = Upload;
  const { RangePicker } = DatePicker;

  const { user } = useUser();
  const { access } = useAccess();

  const { setExtra } = useExtraSetter();
  const { deptPubData } = useDeptPubSetter();

  const { pubData } = usePubSetter();
  const { confData } = useConfSetter();
  const { bookData } = useBookSetter();
  const { projData } = useProjSetter();
  const { awardData } = useAwardSetter();
  const { iprData } = useIPRSetter();
  const { studData } = useStudSetter();

  // COMMON STATES

  const [visible, setVisible] = useState(true);
  const [sections, setSections] = useState("all");

  // LEVEL 1 DATA

  const [data, setData] = useState({});
  const [statistics_1, setStatistics_1] = useState({});
  const [fileData_1, setFileData_1] = useState({
    modal: false,
    file: null,
    doi: "",
    authors: [],
  });

  const [extra_1, setExtra_1] = useState({});
  const [sortBy_1, setSortBy_1] = useState("scopus");
  const [selectedFilters_1, setSelectedFilters_1] = useState([]);

  const [publications, setPublications] = useState({ title: [], body: [] });
  const [conferences, setConferences] = useState({ title: [], body: [] });
  const [books, setBooks] = useState({ title: [], body: [] });
  const [projects, setProjects] = useState({ title: [], body: [] });
  const [awards, setAwards] = useState({ title: [], body: [] });
  const [ipr, setIpr] = useState({ title: [], body: [] });
  const [students, setStudents] = useState({ title: [], body: [] });

  // LEVEL 2 DATA

  const [ranges, setRanges] = useState({ overview: "", graph: "" });
  const [counts_2, setCounts_2] = useState({});
  const [pubsByCitns_2, setPubsByCitns_2] = useState([]);
  const [pubsByImpact_2, setPubsByImpact_2] = useState([]);
  const [authorsMax_2, setAuthorsMax_2] = useState([]);
  const [authorsMin_2, setAuthorsMin_2] = useState([]);
  const [publications_2, setPublications_2] = useState({ title: [], body: [] });
  const [pubTrends_2, setPubTrends_2] = useState([]);

  // EFFECTS

  useEffect(() => {
    setVisible(true);

    if (user?.token) {
      if (access === 1) {
        axios({
          method: "GET",
          url: `${URLObj.base}/home`,
          headers: {
            "X-ACCESS-KEY": URLObj.key,
            "X-AUTH-TOKEN": user?.token,
          },
        })
          .then(res => {
            const DATA = res.data?.data;
            const STATS = res.data?.statistics;

            setData(DATA);
            setStatistics_1(STATS);
            setExtra(
              DATA?.publication,
              DATA?.conferences,
              DATA?.research,
              setExtra_1
            );

            setVisible(false);
          })
          .catch(err => {
            console.log(err);
          });
      }

      if (access === 2) {
        axios({
          method: "GET",
          url: `${URLObj.base}/home/?filter=${ranges?.overview}&graph_range=${ranges?.graph}`,
          headers: {
            "X-ACCESS-KEY": URLObj.key,
            "X-AUTH-TOKEN": user?.token,
            "X-ACCESS-LEVEL": "department",
          },
        })
          .then(res => {
            const DATA = res.data;

            setCounts_2(DATA?.counts);
            setAuthorsMax_2(DATA?.top_10_authors);
            setAuthorsMin_2(DATA?.least_10_authors);
            setPubTrends_2(DATA?.publication_trend);

            const { BODY: BODY_1 } = pubData(
              DATA?.top_ten_publications?.highest_citations ?? []
            );

            const { BODY: BODY_2 } = pubData(
              DATA?.top_ten_publications?.highest_impact_factor ?? []
            );

            const { TITLE, BODY } = deptPubData(DATA?.publications ?? []);

            setPubsByCitns_2(BODY_1);
            setPubsByImpact_2(BODY_2);
            setPublications_2({ title: TITLE, body: BODY });

            setVisible(false);
          })
          .catch(err => {
            console.log(err);
          });
      }

      if (access === 3) {
        setVisible(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, ranges, access]);

  useEffect(() => {
    if (access == 1) {
      if (data?.publication) {
        const { TITLE, BODY } = pubData(data?.publication, {
          fileData_1,
          setFileData_1,
          sortBy_1,
        });
        setPublications({ title: TITLE, body: BODY, pubs: BODY });
      }

      if (data?.conferences) {
        const { TITLE, BODY } = confData(data?.conferences);
        setConferences({ title: TITLE, body: BODY });
      }

      if (data?.books) {
        const { TITLE, BODY } = bookData(data?.books);
        setBooks({ title: TITLE, body: BODY });
      }

      if (data?.research) {
        const { TITLE, BODY } = projData(data?.research);
        setProjects({ title: TITLE, body: BODY });
      }

      if (data?.awards) {
        const { TITLE, BODY } = awardData(data?.awards);
        setAwards({ title: TITLE, body: BODY });
      }

      if (data?.IPR) {
        const { TITLE, BODY } = iprData(data?.IPR);
        setIpr({ title: TITLE, body: BODY });
      }

      if (data?.students_guided) {
        const { TITLE, BODY } = studData(data?.students_guided);
        setStudents({ title: TITLE, body: BODY });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, access, sortBy_1, fileData_1]);

  // FUNCTIONS

  const uploadFile = () => {
    message.loading("Uploading file");

    if (user?.token) {
      const str = JSON.stringify({
        doi: fileData_1?.doi,
        file: fileData_1?.file,
        author: fileData_1?.authors,
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
          setFileData_1({ modal: false, file: null, doi: "", authors: [] });

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

  const handleFilterChange = (pagination, filters) =>
    setSelectedFilters_1(filters?.indexed_in?.map(filter => filter) ?? []);

  // MEMOS

  useMemo(() => {
    if (access === 1) {
      if (selectedFilters_1?.length === 0)
        setPublications({ ...publications, body: publications?.pubs });
      else
        setPublications({
          ...publications,
          body:
            selectedFilters_1?.length == 1 && selectedFilters_1[0] == "None"
              ? publications?.pubs?.filter(
                  item => item.index?.length == 1 && item.index[0] == "None"
                )
              : publications?.pubs?.filter(item =>
                  selectedFilters_1?.every(filter =>
                    item.index.includes(filter)
                  )
                ),
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access, selectedFilters_1]);

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
              <Top main={{ publications, setPublications, setSections }} />

              {sections == "all" && (
                <div className={styles.section}>
                  {access == 1 ? (
                    <div className={styles.sectionTop}>
                      <div id="overview" className={styles.heading}>
                        {`Overview: ${
                          ["Individual", "Department", "Institute"][access - 1]
                        } Level`}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.sectionTop}>
                      <div id="overview" className={styles.heading}>
                        {`Overview: ${
                          ["Individual", "Department", "Institute"][access - 1]
                        } Level`}
                      </div>
                      <div style={{ display: "flex", gap: 5 }}>
                        {[
                          [
                            "All Time",
                            () => setRanges({ ...ranges, overview: "" }),
                          ],
                          [
                            "Last 5 Years",
                            () =>
                              setRanges({ ...ranges, overview: "2018-2023" }),
                          ],
                          [
                            "Last 3 Years",
                            () =>
                              setRanges({ ...ranges, overview: "2020-2023" }),
                          ],
                          [
                            "Last Year",
                            () =>
                              setRanges({ ...ranges, overview: "2022-2023" }),
                          ],
                        ].map(([e, f], i) => (
                          <Button
                            key={i}
                            type="primary"
                            className={styles.overviewButton}
                            onClick={f}
                          >
                            {e}
                          </Button>
                        ))}

                        <RangePicker
                          picker="year"
                          className={styles.overviewButton}
                          allowClear={false}
                          onChange={e => {
                            if (e?.[1]?.format("YYYY") > 2025) {
                              message.error(
                                "End year cannot be greater than 2025"
                              );
                            } else {
                              setRanges({
                                ...ranges,
                                overview: `${e?.[0]?.format(
                                  "YYYY"
                                )}-${e?.[1]?.format("YYYY")}`,
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <Overview
                    one={{ data: data, stats: statistics_1, extra: extra_1 }}
                    two={{ counts: counts_2 }}
                  />
                </div>
              )}

              {access != 1 ? (
                <>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <div style={{ display: "flex", gap: 5 }}>
                      {[
                        [
                          "Last 10 Years",
                          () => setRanges({ ...ranges, graph: "2013-2023" }),
                        ],
                      ].map(([e, f], i) => (
                        <Button
                          key={i}
                          type="primary"
                          className={styles.overviewButton}
                          onClick={f}
                        >
                          {e}
                        </Button>
                      ))}

                      <RangePicker
                        picker="year"
                        className={styles.overviewButton}
                        allowClear={false}
                        onChange={e => {
                          if (e?.[1]?.format("YYYY") > 2025) {
                            message.error(
                              "End year cannot be greater than 2025"
                            );
                          } else {
                            setRanges({
                              ...ranges,
                              graph: `${e?.[0]?.format(
                                "YYYY"
                              )}-${e?.[1]?.format("YYYY")}`,
                            });
                          }
                        }}
                      />
                    </div>
                    <BarChart trends={pubTrends_2} />
                  </Col>

                  <Row gutter={[20, 20]}>
                    <Col span={12}>
                      <ScrollBox
                        title="Frequently Cited Publications"
                        data={pubsByCitns_2}
                        type="pubs_citns"
                      />
                    </Col>
                    <Col span={12}>
                      <ScrollBox
                        title="Publications with the Highest Impact Factors"
                        data={pubsByImpact_2}
                        type="pubs_impact"
                      />
                    </Col>
                  </Row>
                  <Row gutter={[20, 20]}>
                    <Col span={12}>
                      <ScrollBox
                        title="Faculty with the Highest Publications"
                        subtitle="Interdepartmental Publications"
                        data={authorsMax_2}
                        type="auths"
                      />
                    </Col>
                    <Col span={12}>
                      <ScrollBox
                        title="Faculty with the Lowest Publications"
                        subtitle="Interdepartmental Publications"
                        data={authorsMin_2}
                        type="auths"
                      />
                    </Col>
                  </Row>

                  <Section
                    data={publications_2}
                    head={{
                      header: `Department of ${user?.department}`,
                      title: "Faculty Publications",
                    }}
                  />
                </>
              ) : (
                <>
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
                              if (sortBy_1 === "scopus") setSortBy_1("wos");
                              else if (sortBy_1 === "wos")
                                setSortBy_1("crossref");
                              else if (sortBy_1 === "crossref")
                                setSortBy_1("scopus");
                            }}
                          >
                            Sorting Citations By: {sortBy_1.toUpperCase()}
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
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>
                  )}

                  {[
                    {
                      title: "Conferences",
                      data: conferences,
                    },
                    {
                      title: "Books",
                      data: books,
                    },
                    {
                      title: "Projects",
                      data: projects,
                    },
                    {
                      title: "Awards",
                      data: awards,
                    },
                    {
                      title: "IPR",
                      data: ipr,
                    },
                    {
                      title: "Students",
                      data: students,
                    },
                  ]?.map((e, i) => (
                    <Section
                      key={i}
                      data={e.data}
                      head={{ title: e.title }}
                      sections={{ sec: sections, setSec: setSections }}
                    />
                  ))}
                </>
              )}

              <Modal
                title="Upload PDF"
                open={fileData_1?.modal}
                onCancel={() => setFileData_1({ ...fileData_1, modal: false })}
                footer={null}
              >
                <Dragger
                  name="file"
                  multiple={false}
                  style={{ borderColor: "#9a2827" }}
                  onChange={info => {
                    const { status } = info.file;
                    if (status === "done")
                      setFileData_1({ ...fileData_1, file: info.file });
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
