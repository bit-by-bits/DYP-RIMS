import Head from "next/head";
import styles from "../styles/profile.module.css";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import Navbar from "../src/Common/Navbar";
import Boxes from "../src/Profile/Boxes";
import Section from "../src/Profile/Section";
import PTable from "../src/Profile/PTable";
import Loader from "../src/Common/Loader";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserContext } from "../src/userContext";
import URLObj from "../src/baseURL";
import Link from "next/link";
import { FilePdfOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

const Profile = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  const [lawrd, setLawrd] = useState(0);
  const [lpubs, setLpubs] = useState(0);

  const [pdata, setPdata] = useState({ head: [], body: [], check: false });
  const [cdata, setCdata] = useState({ head: [], body: [], check: false });

  useEffect(() => {
    axios({
      method: "GET",
      url: `${URLObj.base}/user/profile/${user.id}`,
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(res => {
        setUser({
          id: user.id,
          picture: user.picture,
          role: user.role,
          token: user.token,
          name: res.data.name,
          email: res.data.email,
          dept: res.data.department,
        });
      })
      .catch(err => {
        setUser(user);
      });
  }, []);

  useEffect(() => {
    if (user.name != "" && user.token != "") {
      axios({
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
        url: `${URLObj.base}/publication/view/${user.name}`,
      })
        .then(res => {
          const HEAD = [
            {
              title: "Publication",
              dataIndex: "title",
              key: "title",
              sorter: (a, b) => a.title.localeCompare(b.title),
            },
            {
              title: "Impact Factor",
              dataIndex: "impact",
              key: "impact",
              sorter: (a, b) => a.impact.localeCompare(b.impact),
              render: text => (
                <div
                  style={{
                    color: "#9a2827",
                    fontWeight: 900,
                    fontSize: 20,
                    minWidth: 120,
                  }}
                >
                  {text}
                </div>
              ),
            },
            {
              title: "SJR Quartile",
              dataIndex: "sjr",
              key: "sjr",
              sorter: (a, b) => a.sjr.localeCompare(b.sjr),
              render: text => (
                <div
                  style={{
                    color: "#9a2827",
                    fontWeight: 900,
                    fontSize: 20,
                    minWidth: 120,
                  }}
                >
                  {text}
                </div>
              ),
            },
            {
              title: "Indexed In",
              dataIndex: "indexed_in",
              key: "indexed_in",
              filters: [
                {
                  text: "DOAJ",
                  value: "DOAJ",
                },
                {
                  text: "Embase",
                  value: "Embase",
                },
                {
                  text: "Medline",
                  value: "Medline",
                },
                {
                  text: "PMC",
                  value: "PMC",
                },
                {
                  text: "SCIE",
                  value: "SCIE",
                },
                {
                  text: "Scopus",
                  value: "Scopus",
                },
              ],
              onFilter: (value, record) =>
                record.indexed_in.props.children.includes(value),
            },
            {
              title: "Citations",
              dataIndex: "citations",
              key: "citations",
              sorter: (a, b) => a.citations.localeCompare(b.citations),
              render: text => <div style={{ fontWeight: 700 }}>{text}</div>,
            },
            {
              title: "Published",
              dataIndex: "published",
              key: "published",
              sorter: (a, b) => a.published.localeCompare(b.published),
              render: text => (
                <div style={{ fontWeight: 700, minWidth: 120 }}>{text}</div>
              ),
            },
            {
              title: "File",
              dataIndex: "more",
              key: "more",
              sorter: (a, b) => a.more.localeCompare(b.more),
              render: (text, record) => (
                <Link href={`/file/${record.key}`}>
                  <div className={styles.btn_div}>Click</div>
                </Link>
              ),
            },
          ];

          const BODY = res.data.data.map(e => ({
            key: e.id ?? Math.random() * 1000,
            title: (
              <div
                style={{
                  gap: 10,
                  maxWidth: "40vw",
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                }}
              >
                <span
                  style={{
                    color: "black",
                    fontWeight: 700,
                    fontSize: "1rem",
                    lineHeight: "1.3rem",
                  }}
                >
                  {e.publication_title ?? "N/A"}
                </span>
                <span style={{ fontWeight: 400 }}>
                  {e.other_authors.join(", ") ?? "N/A"}
                </span>
                <span style={{ fontStyle: "italic" }}>
                  {e.journal_name ?? "N/A"}
                </span>
                <span style={{ color: "#9a2827" }}>
                  Volume: {e.volume ?? "?"}
                  &nbsp;&middot;&nbsp; Issue: {e.issue ?? "?"}
                  &nbsp;&middot;&nbsp; Pages: {e.pages ?? "?"}
                </span>
                {e.file ? (
                  <span style={{ color: "green" }}>
                    Softcopy found for this publication. View More to access.
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                )}
              </div>
            ),
            impact: e.impact_factor ?? "N/A",
            sjr: e.sjr ?? "N/A",
            indexed_in: (
              <span>
                {["DOAJ", "Embase", "Medline", "PMC", "SCIE", "Scopus"]
                  .filter(index => e["in_" + index.toLowerCase()])
                  .join(", ") ?? "N/A"}
              </span>
            ),
            citations: e.citations ?? "N/A",
            published: e.year ?? "N/A",
          }));

          setPdata({
            head: HEAD,
            body: BODY,
          });

          setVisible(false);
        })
        .catch(err => {
          setVisible(false);

          setPdata({
            head: [],
            body: [],
          });
        });

      axios({
        method: "GET",
        url: `${URLObj.base}/user/stats`,
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then(res => {
          setLawrd(res.data.awards);
          setLpubs(res.data.publications);
        })
        .catch(err => {
          setLawrd(0);
          setLpubs(0);
        });

      axios({
        method: "GET",
        url: `${URLObj.base}/conference/${user.name}/view`,
      })
        .then(res => {
          const HEAD = [
            {
              title: "Conference",
              dataIndex: "name",
              key: "name",
              sorter: (a, b) => a.name.localeCompare(b.name),
              render: text => (
                <div
                  style={{
                    color: "#9a2827",
                    fontWeight: 800,
                    fontSize: 18,
                  }}
                >
                  {text}
                </div>
              ),
            },
            {
              title: "Location",
              dataIndex: "location",
              key: "location",
              sorter: (a, b) => a.location.localeCompare(b.location),
              render: text => <div style={{ fontWeight: 600 }}>{text}</div>,
            },
            {
              title: "Date",
              dataIndex: "date",
              key: "date",
              sorter: (a, b) => a.date.localeCompare(b.date),
              render: text => <div style={{ fontWeight: 600 }}>{text}</div>,
            },
            {
              title: "Certificate",
              dataIndex: "certificate",
              key: "certificate",
              align: "center",
              render: (text, record) => (
                <Button>
                  {record.file ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={URLObj.rims + record.file}
                    >
                      <FilePdfOutlined style={{ color: "#52c41a" }} />
                    </a>
                  ) : (
                    <FilePdfOutlined
                      style={{ color: "#eb2f96" }}
                      onClick={() => message.error("No PDF exists")}
                    />
                  )}
                </Button>
              ),
            },
          ];

          const BODY = res.data.data.map(e => ({
            key: e.id ?? Math.random() * 1000,
            name: e.conference_name ?? "N/A",
            location: e.location ?? "N/A",
            date: e.date ?? "N/A",
            file: e.certificate ?? null,
          }));

          setCdata({
            head: HEAD,
            body: BODY,
          });

          setVisible(false);
        })
        .catch(err => setCdata([]));
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Loader visible={visible} />
        <Navbar />

        <div className={styles.profile_wrapper}>
          <Section data={[]} extra={[lawrd, lpubs]} />
          <Boxes title="Awards & Achievements" data={[]} />
          <Boxes title="Patents" data={[]} />
          <PTable title="Publications" body={pdata} />
          <PTable title="Conferences" body={cdata} />

          <a href="https://www.qtanea.com/" rel="noreferrer" target="_blank">
            <Image
              alt="Q"
              width={60}
              height={60}
              src="/logos/qtanea-colour.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Profile;
