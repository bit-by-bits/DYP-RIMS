import Head from "next/head";
import React, { useState, useEffect, createElement } from "react";
import styles from "../styles/profile.module.css";
import { Button, FloatButton, Input, Spin } from "antd";
import Side from "../src/Profile/Side";
import { useRouter } from "next/router";
import axios from "axios";
import URLObj from "../src/baseURL";
import {
  BellOutlined,
  FileTextOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Overview from "../src/Profile/Overview";
import PTable from "../src/Profile/PTable";

import crossref from "../public/logos/crossref.jpg";
import medline from "../public/logos/medline.jpg";
import doaj from "../public/logos/doaj.png";
import pmc from "../public/logos/pmc.png";
import embase from "../public/logos/embase.svg";
import scopus from "../public/logos/scopus.svg";
import scie from "../public/logos/scie.svg";
import wos from "../public/logos/wos.svg";

import green from "../public/logos/green-oa.png";
import gold from "../public/logos/gold-oa.png";
import bronze from "../public/logos/bronze-oa.png";
import closed from "../public/logos/closed-oa.png";
import Image from "next/image";

const Profile = () => {
  // BOILERPLATE

  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && user.token === "") router.push("/");
  }, [router, user]);

  // STATES

  const [person, setPerson] = useState({});
  const [data, setData] = useState({});
  const [statistics, setStatistics] = useState({});

  const [publications, setPublications] = useState([]);
  const [awards, setAwards] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [ipr, setIpr] = useState([]);

  const [visible, setVisible] = useState(true);
  const [extra, setExtra] = useState({
    citations: {},
    hIndex: {},
    impact: {},
    access: {},
  });

  // EFFECTS

  useEffect(() => {
    axios({
      method: "GET",
      url: `${URLObj.base}/home`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user.token,
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

          if (e.open_access)
            switch (e.open_access_status) {
              case "gold":
                ACCESS.gold++;
                break;

              case "green":
                ACCESS.green++;

              case "bronze":
                ACCESS.bronze++;
            }
          else ACCESS.closed++;
        });

        IMPACT.average = IMPACT.total / res.data?.data?.publication?.length;

        setExtra({
          citations: CITATIONS,
          hIndex: H_INDEX,
          impact: IMPACT,
          access: ACCESS,
        });

        setVisible(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    if (data?.publication) {
      console.log(data?.publication);

      setPublications(
        data?.publication?.map((e, i) => ({
          key: i,
          publication: (
            <div>
              <div className={styles.publicationTitle}>
                {e.publication_title}
              </div>
              <div className={styles.publicationAuthors}>
                {e.author_name?.map((e, i) =>
                  e?.user ? (
                    <span key={i}>
                      {e?.user?.first_name + " " + e?.user?.last_name}
                      <sup>1</sup>
                      <span>, </span>
                    </span>
                  ) : null
                )}
                {e.corresponding_authors?.map(e =>
                  e?.user ? (
                    <span key={i}>
                      {e?.user?.first_name + " " + e?.user?.last_name}
                      <sup>*</sup>
                      <span>, </span>
                    </span>
                  ) : null
                )}
                {e.other_authors?.map(e => e).join(", ")}
              </div>
            </div>
          ),
          impact_factor: e.impact_factor,
          sjr: e.sjr_quartile,
          h_index: e.h_index,
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
                  name: "SCIE",
                  logo: scie,
                  bool: e.in_scie,
                },
                {
                  name: "Medline",
                  logo: medline,
                  bool: e.in_medline,
                },
              ]
                .filter(e => e.bool)
                .map(e => (
                  <>
                    <Image src={e.logo} alt={e.name} height={30} width={30} />
                    {e.name}
                  </>
                ))}
            </div>
          ),
          citations: (
            <div className={styles.publicationGrid}>
              <Image src={wos} alt="WOS" height={30} width={30} />
              {`WOS: ${number(e.citations_wos)}`}
              <Image src={crossref} alt="Crossref" height={30} width={30} />
              {`Crossref: ${number(e.citations_crossref)}`}
              <Image src={scopus} alt="Scopus" height={30} width={30} />
              {`Scopus: ${number(e.citations_scopus)}`}
            </div>
          ),
          published: e.year,
          action: (
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              className={styles.publicationButton}
              onClick={() => router.push(`/file/${e.doi_id}`)}
            >
              Preview
            </Button>
          ),
        }))
      );
    }
  }, [data]);

  // FUNCTIONS

  const number = num => (num ? (isNaN(num) ? 0 : num) : 0);

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
            style={{ right: 30, bottom: 30, borderRadius: "50%" }}
          />

          <div style={{ paddingLeft: "18vw" }}>
            <Side user={person} />

            <div className={styles.container}>
              <div className={styles.top}>
                <Input
                  className={styles.topInput}
                  placeholder="Search for publications"
                  prefix={<SearchOutlined style={{ marginRight: 5 }} />}
                  allowClear
                />
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
                    localStorage.clear();
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

              <div className={styles.section}>
                <div className={styles.sectionTop}>
                  <div className={styles.heading}>Overview</div>
                </div>
                <Overview data={data} extra={extra} />
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTop}>
                  <div className={styles.heading}>Publications</div>
                  <Button
                    type="primary"
                    className={styles.sectionButton}
                    onClick={() => {}}
                  >
                    View All
                  </Button>
                </div>
                <div className={styles.sectionBottom}>
                  <PTable
                    title={[
                      {
                        title: "Publication",
                        dataIndex: "publication",
                        key: "publication",
                      },
                      {
                        title: "Impact Factor",
                        dataIndex: "impact_factor",
                        key: "impact_factor",
                      },
                      {
                        title: "SJR",
                        dataIndex: "sjr",
                        key: "sjr",
                      },
                      {
                        title: "H-Index",
                        dataIndex: "h_index",
                        key: "h_index",
                        render: e => <div style={{ minWidth: 50 }}>{e}</div>,
                      },
                      {
                        title: "Indexed In",
                        dataIndex: "indexed_in",
                        key: "indexed_in",
                      },
                      {
                        title: "Citations",
                        dataIndex: "citations",
                        key: "citations",
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
                    ]}
                    body={publications}
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTop}>
                  <div className={styles.heading}>Publications</div>
                  <Button
                    type="primary"
                    className={styles.sectionButton}
                    onClick={() => {}}
                  >
                    View All
                  </Button>
                </div>
                <div className={styles.sectionBottom}>
                  <PTable data={data} />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTop}>
                  <div className={styles.heading}>Publications</div>
                  <Button
                    type="primary"
                    className={styles.sectionButton}
                    onClick={() => {}}
                  >
                    View All
                  </Button>
                </div>
                <div className={styles.sectionBottom}>
                  <PTable data={data} />
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Profile;
