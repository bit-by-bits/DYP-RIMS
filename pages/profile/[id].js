import Head from "next/head";
import styles from "../../src/styles/profile.module.css";
import React, { useState, useEffect, useMemo } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Spin, Button, FloatButton } from "antd";
import { Table, Modal, Upload, Image, message } from "antd";
import axios from "axios";
import useCaps from "../../src/utils/useCaps";
import styles2 from "../../src/styles/file.module.css";

import Top from "../../src/components/Common/Top";
import Side from "../../src/components/Common/Side";
import Section from "../../src/components/Profile/Section";
import Overview from "../../src/components/Profile/Overview";
import { useUser } from "../../src/components/context/userContext";

import usePubSetter from "../../src/utils/dataSetters/usePubSetter";
import useConfSetter from "../../src/utils/dataSetters/useConfSetter";
import useBookSetter from "../../src/utils/dataSetters/useBookSetter";
import useProjSetter from "../../src/utils/dataSetters/useProjSetter";
import useAwardSetter from "../../src/utils/dataSetters/useAwardSetter";
import useIPRSetter from "../../src/utils/dataSetters/useIPRSetter";
import useStudSetter from "../../src/utils/dataSetters/useStudSetter";
import useExtraSetter from "../../src/utils/dataSetters/useExtraSetter";
import URLObj from "../../src/components/baseURL";
import { useRouter } from "next/router";

const Profile = () => {
  // BOILERPLATE

  const router = useRouter();
  const { user } = useUser();

  const { id } = router.query;
  const [ID, setID] = useState("");

  useEffect(() => {
    if (router.isReady) setID(id);
  }, [router, id]);

  // HOOKS

  const { Dragger } = Upload;

  const { setExtra } = useExtraSetter();
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

  // EFFECTS

  useEffect(() => {
    setVisible(true);

    if (user?.token && ID) {
      axios({
        method: "PUT",
        url: `${URLObj.base}/faculty/?id=${ID}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
          "X-ACCESS-LEVEL": "department",
        },
      })
        .then(res => {
          const DATA = res.data?.profile?.data;
          const STATS = res.data?.profile?.statistics;

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, ID]);

  useEffect(() => {
    if (data?.publications) {
      const { TITLE, BODY } = pubData(data?.publications, {
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

    if (data?.projects) {
      const { TITLE, BODY } = projData(data?.projects);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, sortBy_1, fileData_1]);

  // FUNCTIONS

  const uploadFile = () => {
    message.error("File upload is not supported yet");
  };

  const handleFilterChange = (pagination, filters) =>
    setSelectedFilters_1(filters?.indexed_in?.map(filter => filter) ?? []);

  // MEMOS

  useMemo(() => {
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
                selectedFilters_1?.every(filter => item.index.includes(filter))
              ),
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters_1]);

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
                <>
                  <div className={styles.section}>
                    <div className={styles.sectionTop}>
                      <div id="overview" className={styles.heading}>
                        Overview: Individual Level
                      </div>
                    </div>

                    <Overview
                      mode="two"
                      one={{ data: data, stats: statistics_1, extra: extra_1 }}
                      two={{ counts: {}, faculty: 0 }}
                    />
                  </div>
                </>
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
                          if (sortBy_1 === "scopus") setSortBy_1("wos");
                          else if (sortBy_1 === "wos") setSortBy_1("crossref");
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
                  title: "Books",
                  data: books,
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
                  beforeUpload={_ => uploadFile()}
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

const ProfileSection = ({ data }) => {
  // STATES

  const { capitalize } = useCaps();

  // EFFECTS

  // FUNCTIONS

  return (
    <>
      <div className={styles.file_text}>
        <div
          className={styles.file_title}
          dangerouslySetInnerHTML={{
            __html:
              data?.user?.first_name + " " + data?.user?.last_name ??
              "- Not Available -",
          }}
        />

        <div
          className={styles.file_subtitle}
          dangerouslySetInnerHTML={{
            __html: data?.user?.username ?? "- Not Available -",
          }}
        />

        {data?.profile_picture && (
          <Image
            style={{ margin: "10px 0", maxHeight: 400 }}
            alt={data?.username ?? "- Not Available -"}
            src={data?.profile_picture}
          />
        )}

        <div className={styles.file_info}>
          <div className={styles.file_info_box}>
            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Email</span>
                <span className={styles.info_body}>
                  {data?.user?.email ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Department</span>
                <span className={styles.info_body}>
                  {capitalize(data?.department?.name) ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Gender</span>
                <span className={styles.info_body}>
                  {data?.gender ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Age</span>
                <span className={styles.info_body}>
                  {data?.age ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Mobile</span>
                <span className={styles.info_body}>
                  {data?.mobile ?? "- Not Available -"}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.info}>
                <span className={styles.info_head}>Designation</span>
                <span className={styles.info_body}>
                  {data?.designation ?? "- Not Available -"}
                </span>
              </div>

              <span className={styles.middot}>&middot;</span>

              <div className={styles.info}>
                <span className={styles.info_head}>Access Level</span>
                <span className={styles.info_body}>
                  {`${data?.access_level?.[0]?.display_text} (${data?.access_level?.[0]?.level_name})` ??
                    "- Not Available -"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
