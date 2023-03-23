import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../../styles/details.module.css";
import URLObj from "../baseURL";
import Image from "next/image";
import { UserContext } from "../userContext";
import { Button, Form, Input, Select } from "antd";
import { useRouter } from "next/router";

export default function Details(props) {
  const router = useRouter();
  const [form] = Form.useForm();

  const [data, setData] = useState({});
  const [dataJournal, setDataJournal] = useState({});

  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  const [disabled, setDisabled] = useState(true);
  const [citations, setCitations] = useState(0);

  const [authors, setAuthors] = useState({ options: [], selected: [] });
  const [indexed, setIndexed] = useState({ options: [], selected: [] });

  useEffect(() => {
    console.log(data, dataJournal);
    form.resetFields();
  }, [data, dataJournal]);

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
          const LIST = authorList.map((a, i) => ({
            value: i,
            label: `${a.given ?? ""} ${a.family ?? ""} ${
              a?.affiliation?.length ? "( " + a.affiliation[0]?.name + " )" : ""
            }`,
          }));

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

    // axios({
    //   method: "GET",
    //   url: `${URLObj.citation}/citation-count/${props.doi}`,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // })
    //   .then(response => setCitations(response.data[0].count))
    //   .catch(error => console.log("CTE: " + error));
  }, []);

  useEffect(() => {
    const index = ["doaj", "embase", "medline", "pmc", "scie", "scopus"];
    const indexed = index.filter(i => dataJournal["in_" + i]);

    const LIST = indexed.map((e, i) => ({
      value: i,
      label: e[0].toUpperCase() + e.slice(1),
    }));

    setIndexed({
      options: LIST,
      selected: LIST,
    });
  }, [dataJournal]);

  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

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
          style={{ width: "80vw", transform: "translateX(-10vw)" }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            title: data.title ? data.title[0] : " ",
            journal: dataJournal.journal_title ?? " ",
            volume: parseInt(data.volume) ?? 0,
            issue: parseInt(data.issue) ?? 0,
            pages: data.page ?? " ",
            published: data.published
              ? data.published["date-parts"][0].join("-")
              : " ",
            hindex: parseInt(dataJournal.h_index) ?? 0,
            ifactor: dataJournal.impact_factor ?? " ",
            sjr: dataJournal.sjr ?? " ",
            citations: citations ?? " ",
            indexed: indexed.selected ?? [],
            pubmed: data.pubmed_id ?? " ",
            doi: data.DOI ?? " ",
            abstract: data.abstract ?? " ",
            authors: authors.selected ?? [],
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please enter publication title" },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="Journal"
            name="journal"
            rules={[{ required: true, message: "Please enter journal name" }]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="Volume"
            name="volume"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
                message: "Please enter volume number",
              },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="Issue"
            name="issue"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
                message: "Please enter issue number",
              },
            ]}
          >
            <Input disabled={disabled} />
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
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="Published"
            name="published"
            rules={[
              { required: true, message: "Please enter publication title" },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="H-Index"
            name="hindex"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
                message: "Please enter the h-index",
              },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="Impact Factor"
            name="ifactor"
            rules={[
              { required: true, message: "Please enter the impact factor" },
            ]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="SJR Qrt"
            name="sjr"
            rules={[
              { required: true, message: "Please enter the SJR quartile" },
            ]}
          >
            <Input disabled={disabled} />
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
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item label="Indexed In" name="indexed">
            <Select
              disabled={disabled}
              mode="multiple"
              options={indexed.options}
            />
          </Form.Item>

          <Form.Item
            label="Pub Med ID"
            name="pubmed"
            rules={[{ required: true, message: "Please enter the pubmed id" }]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="DOI ID"
            name="doi"
            rules={[{ required: true, message: "Please enter the DOI" }]}
          >
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item label="Abstract" name="abstract">
            <Input disabled={disabled} />
          </Form.Item>

          <Form.Item
            label="Authors"
            name="authors"
            rules={[{ required: true, message: "Please select the authors" }]}
          >
            <Select
              mode="multiple"
              disabled={disabled}
              options={authors.options}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className={styles.submit} type="primary" htmlType="submit">
              Save Changes
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
