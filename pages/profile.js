import Head from "next/head";
import styles from "../styles/profile.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../src/Common/Navbar";
import Section from "../src/Profile/Section";
import PTable from "../src/Profile/PTable";
import Loader from "../src/Common/Loader";
import Image from "next/image";
import { useRouter } from "next/router";
import URLObj from "../src/baseURL";
import { FileImageOutlined, FilePdfOutlined } from "@ant-design/icons";
import { BackTop, Button, Image as Img, message } from "antd";
import Side from "../src/Common/Side";

const Profile = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  const [adata, setAdata] = useState({ head: [], body: [], check: false });
  const [ptdata, setPtdata] = useState({ head: [], body: [], check: false });
  const [cdata, setCdata] = useState({ head: [], body: [], check: false });
  const [pdata, setPdata] = useState({ head: [], body: [], check: false });

  const [user, setUser] = useState({});
  const [image, setImage] = useState({
    src: "",
    visible: false,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);

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

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            picture: user.picture,
            role: user.role,
            token: user.token,
            name: res.data.name,
            email: res.data.email,
            dept: res.data.department,
          })
        );
      })
      .catch(err => setUser(user));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && user.token === "") router.push("/");
  }, [router, user]);

  useEffect(() => {
    if (user.name && user.token)
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
              title: "SJR",
              dataIndex: "sjr",
              key: "sjr",
              sorter: (a, b) => a.sjr.localeCompare(b.sjr),
              render: text => (
                <div
                  style={{
                    color: "#9a2827",
                    fontWeight: 900,
                    fontSize: 20,
                    minWidth: 60,
                  }}
                >
                  {text}
                </div>
              ),
            },
            {
              title: "H-Index",
              dataIndex: "hindex",
              key: "hindex",
              sorter: (a, b) => a.hindex.localeCompare(b.hindex),
              render: text => (
                <div
                  style={{
                    color: "#9a2827",
                    fontWeight: 900,
                    fontSize: 20,
                    minWidth: 80,
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
              render: text => (
                <div style={{ fontWeight: 700, minWidth: 80 }}>{text}</div>
              ),
            },
            {
              title: "Published",
              dataIndex: "published",
              key: "published",
              sorter: (a, b) => a.published.localeCompare(b.published),
              render: text => (
                <div style={{ fontWeight: 700, minWidth: 100 }}>{text}</div>
              ),
            },
            {
              title: "View",
              dataIndex: "view",
              key: "view",
              render: (text, record) =>
                record.id ? (
                  <Button
                    style={{
                      color: "#52c41a",
                      borderColor: "#52c41a",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                    icon={<FilePdfOutlined style={{ color: "#52c41a" }} />}
                    href={`/file/${record.id}`}
                  >
                    File
                  </Button>
                ) : (
                  <Button
                    danger
                    icon={<FilePdfOutlined />}
                    style={{
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                    onClick={() => {
                      message.error("File information not available");
                    }}
                  >
                    No File
                  </Button>
                ),
            },
          ];

          const BODY = res.data.data.map(e => ({
            key: e.id ?? Math.random() * 1000,
            id: e.id ?? 0,
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
                  dangerouslySetInnerHTML={{
                    __html: e.publication_title ?? "N/A",
                  }}
                />
                <span style={{ fontWeight: 400 }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 5,
                    }}
                  >
                    {e.author_name?.length
                      ? e.author_name?.map(a => (
                          <div
                            style={{ width: "max-content" }}
                            key={a.id}
                            title={a.department ?? a.searchable_name}
                          >
                            {a.searchable_name},
                          </div>
                        ))
                      : "- No Main Author -"}
                  </div>
                  <div>
                    {e.other_authors?.length
                      ? e.other_authors?.join(", ")
                      : "- No Other Author -"}
                  </div>
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
                    Softcopy found for this publication.
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    Softcopy not found for this publication.
                  </span>
                )}
              </div>
            ),
            impact: e.impact_factor ?? "N/A",
            sjr: e.sjr ?? "N/A",
            hindex: e.h_index ?? "N/A",
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
            check: true,
          });
        })
        .catch(err => {
          setPdata({
            head: [],
            body: [],
            check: true,
          });
        });

    if (user.name)
      axios({
        method: "GET",
        url: `${URLObj.base}/conference/${user.name}/view`,
      })
        .then(res => {
          const HEAD = [
            {
              title: "Name",
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
              title: "Conference Type",
              dataIndex: "type",
              key: "type",
              sorter: (a, b) => a.type.localeCompare(b.type),
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
              title: "View More",
              dataIndex: "preview",
              key: "preview",
              align: "center",
              render: (text, record) =>
                record.file ? (
                  <Button
                    style={{ color: "#52c41a", borderColor: "#52c41a" }}
                    icon={<FileImageOutlined style={{ color: "#52c41a" }} />}
                    onClick={() =>
                      setImage({
                        url: URLObj.rims + record.file,
                        visible: true,
                      })
                    }
                  >
                    Preview
                  </Button>
                ) : (
                  <Button
                    danger
                    icon={<FileImageOutlined />}
                    onClick={() => message.error("No PDF exists")}
                  >
                    No Preview
                  </Button>
                ),
            },
          ];

          const BODY = res.data.data.map(e => ({
            key: e.id ?? Math.random() * 1000,
            name: e.conference_name ?? "N/A",
            type: e.location ?? "N/A",
            date: e.date ?? "N/A",
            file: e.certificate ?? null,
          }));

          setCdata({
            head: HEAD,
            body: BODY,
            check: true,
          });
        })
        .catch(err =>
          setCdata({
            head: [],
            body: [],
            check: true,
          })
        );
  }, [user]);

  useEffect(() => {
    if (pdata.check && cdata.check) setVisible(false);
  }, [pdata, cdata]);

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Loader visible={visible} />
        <Navbar />
        <Side />
        <BackTop
          style={{
            right: 30,
            bottom: 30,
            borderRadius: "50%",
            backgroundColor: "#9a2827",
          }}
        />

        <div className={styles.profile_wrapper}>
          <Section
            user={user}
            lengths={[
              adata?.body?.length,
              ptdata?.body?.length,
              cdata?.body?.length,
              pdata?.body?.length,
            ]}
          />
          <PTable title="Awards" body={adata} />
          <PTable title="Patents" body={ptdata} />
          <PTable title="Conferences" body={cdata} />
          <PTable title="Publications" body={pdata} />

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

      <Img
        width={200}
        style={{ display: "none" }}
        src=""
        preview={{
          visible: image.visible,
          scaleStep: 0.5,
          src: image.url,
          onVisibleChange: value => {
            setImage({ ...image, visible: value });
          },
        }}
      />
    </>
  );
};

export default Profile;
