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
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Overview from "../src/Profile/Overview";
import PTable from "../src/Profile/PTable";

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
  const [visible, setVisible] = useState(false);
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

  // FUNCTIONS

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spin
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
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
