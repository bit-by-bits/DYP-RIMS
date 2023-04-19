import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/details.module.css";
import URLObj from "../baseURL";
import Image from "next/image";
import { Button, Form, Input, message, Select } from "antd";
import { useRouter } from "next/router";

export default function Details(props) {
  const router = useRouter();
  const [form] = Form.useForm();

  const [data, setData] = useState({});
  const [dataJournal, setDataJournal] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && user.token === "") router.push("/");
  }, [router, user]);

  const [disabled, setDisabled] = useState(true);
  const [citations, setCitations] = useState(0);

  const [authors, setAuthors] = useState({ options: [], selected: [] });
  const [indexed, setIndexed] = useState({ options: [], selected: [] });

  useEffect(() => form.resetFields(), [form, data, dataJournal]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${URLObj.cross}/${localStorage.getItem("udoi")}`,
    })
      .then(response => {
        const msg = response.data.message;
        setData(msg);

        const authorList = msg?.author;
        if (authorList) {
          const LIST = authorList.map((a, i) => {
            const FULLNAME = `${a.given ?? ""} ${a.family ?? ""}`;

            let available = false;
            let AUTHOR_DETAILS = {};
            axios({
              method: "GET",
              url: `${URLObj.base}/author/details/?name=${FULLNAME}`,
            })
              .then(response => {
                const AUTHOR = response?.data?.author[0];
                if (AUTHOR) {
                  available = true;

                  AUTHOR_DETAILS = {
                    AUTHOR_ID: AUTHOR.id,
                    AUTHOR_GENDER: AUTHOR.gender,
                    AUTHOR_NAME: AUTHOR.name,
                    AUTHOR_DEPT: AUTHOR.department,
                    AUTHOR_EMAIL: AUTHOR.email,
                    AUTHOR_IMG: AUTHOR.profile_picture,
                  };
                }
              })
              .catch(error => {
                AUTHOR_DETAILS = {};
              });

            return {
              value: available ? AUTHOR_DETAILS.AUTHOR_ID : FULLNAME,
              label: FULLNAME,
            };
          });

          setAuthors({
            options: LIST,
            selected: LIST,
          });
        }

        if (msg?.ISSN?.length)
          axios({
            method: "GET",
            url: `${URLObj.issn}/${msg.ISSN[0]}`,
          })
            .then(response => setDataJournal(response.data[0]))
            .catch(error => console.log("DELE: " + error));

        props.setVisible(false);
      })
      .catch(error => console.log("DTE: " + error));

    axios({
      method: "GET",
      url: `${URLObj.citation}/citation-count/${props.doi}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(response => setCitations(response.data[0].count))
      .catch(error => console.log("CTE: " + error));
  }, [props]);

  useEffect(() => {
    if (dataJournal) {
      const index = ["doaj", "embase", "medline", "pmc", "scie", "scopus"];
      const indexed = index.filter(i =>
        dataJournal ? dataJournal["in_" + i] : false
      );

      setIndexed({
        options: index.map((e, i) => ({
          value: "in_" + e,
          label: e[0].toUpperCase() + e.slice(1),
        })),
        selected: indexed.map((e, i) => ({
          value: "in_" + e,
          label: e[0].toUpperCase() + e.slice(1),
        })),
      });
    }
  }, [dataJournal]);

  const onFinish = values => {
    let data = new FormData();
    data.append("doi", values.doi);
    data.append("pubmed_id", values.pubmed);
    data.append("publication_type", values.type);
    data.append("publication_title", values.title);
    data.append("journal_name", values.journal);
    data.append("year", values.published);
    data.append("abstract", values.abstract);
    data.append("issue", values.issue);
    data.append("volume", values.volume);
    data.append("pages", values.pages);
    data.append("citations", values.citations);
    data.append("hindex", values.hindex);
    data.append("sjr", values.sjr);
    data.append("impact_factor", values.ifactor);
    data.append(
      "other_authors",
      "{ " + authors.selected.map(e => e.value).join(", ") + " }"
    );

    indexed.options.forEach((e, i) =>
      data.append(
        e.value,
        values.indexed.map(e => e.value).includes(indexed.options[i].value)
          ? 1
          : 0
      )
    );

    axios({
      method: "POST",
      maxBodyLength: Infinity,
      url: `${URLObj.base}/research/data/save/`,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then(res => {
        message.success("Research added successfully!");
        props.setFinished(true);
      })
      .catch(err => message.error("Something went wrong!"));
  };

  const onFinishFailed = errorInfo => message.error("Something went wrong!");

  return (
    <>
      <div className={styles.uploading_msg}>
        <Image src="/alert.png" width={16} height={16} alt="" />
        <span>Please choose the authors carefully.</span>
      </div>

      {data && (
        <Form
          name="basic"
          form={form}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            title: data?.title ? data?.title[0] : " ",
            type: data?.type ?? " ",
            journal: dataJournal?.journal_title ?? " ",
            volume: !isNaN(parseInt(data?.volume)) ? parseInt(data?.volume) : 0,
            issue: !isNaN(parseInt(data?.issue)) ? parseInt(data?.issue) : 0,
            pages: data?.page ?? " ",
            published: data?.published
              ? data?.published["date-parts"][0].reverse().join("-")
              : " ",
            hindex: !isNaN(parseInt(dataJournal?.h_index))
              ? parseInt(dataJournal?.h_index)
              : 0,
            ifactor: dataJournal?.impact_factor ?? " ",
            sjr: dataJournal?.sjr ?? " ",
            citations: citations ?? " ",
            indexed: indexed.selected ?? [],
            pubmed: data?.pubmed_id ?? " ",
            doi: data?.DOI ?? " ",
            abstract: data?.abstract ?? " ",
            authors: authors.selected ?? [],
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Publication Title"
            name="title"
            rules={[
              { required: true, message: "Please enter publication title" },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Journal"
            name="journal"
            rules={[{ required: true, message: "Please enter journal name" }]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Publication Type"
            name="type"
            rules={[
              { required: true, message: "Please enter publication type" },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Volume"
            name="volume"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter volume number",
              },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Issue"
            name="issue"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter issue number",
              },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Pages"
            name="pages"
            rules={[
              {
                required: true,
                message: "Please enter number of pages",
              },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Published On"
            name="published"
            rules={[
              { required: true, message: "Please enter publication title" },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="H-Index"
            name="hindex"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the h-index",
              },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Impact Factor"
            name="ifactor"
            rules={[
              { required: true, message: "Please enter the impact factor" },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="SJR Qrt"
            name="sjr"
            rules={[
              { required: true, message: "Please enter the SJR quartile" },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Citations"
            name="citations"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the number of citations",
              },
            ]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item label="Indexed In" name="indexed">
            <Select
              style={{ width: "30vw" }}
              disabled={true}
              mode="multiple"
              options={indexed.options}
            />
          </Form.Item>

          <Form.Item
            label="PubMed ID"
            name="pubmed"
            rules={[{ required: true, message: "Please enter the pubmed id" }]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="DOI ID"
            name="doi"
            rules={[{ required: true, message: "Please enter the DOI" }]}
          >
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item label="Abstract" name="abstract">
            <Input style={{ width: "30vw" }} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Authors"
            name="authors"
            rules={[{ required: true, message: "Please select the authors" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "30vw" }}
              disabled={disabled}
              options={authors.options}
              onChange={(labels, objects) => {
                setAuthors({
                  options: authors.options,
                  selected: objects,
                });
              }}
            />
          </Form.Item>

          <Form.Item style={{ gridColumn: "1 /span 2" }}>
            <Button className={styles.submit} type="primary" htmlType="submit">
              Save Changes
            </Button>

            <Button
              className={styles.reset}
              onClick={() => {
                setDisabled(false);
              }}
              type="primary"
              htmlType="reset"
            >
              Modify Authors
            </Button>

            <Button className={styles.reset} type="primary" htmlType="reset">
              Revert Back
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
