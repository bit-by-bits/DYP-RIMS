import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/details.module.css";
import URLObj from "../baseURL";
import { Button, Form, Input, message, Select } from "antd";
import { useRouter } from "next/router";

const FileForm = ({ setVisible, id, token }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [data, setData] = useState({});
  const [authors, setAuthors] = useState({
    options: [],
    selected: [],
    check: false,
  });
  const [indexed, setIndexed] = useState({
    options: [],
    selected: [],
    check: false,
  });

  useEffect(() => {
    form.resetFields();
  }, [data, form]);

  useEffect(() => {
    if (id)
      axios({
        method: "GET",
        url: `${URLObj.base}/publication/${id}`,
      })
        .then(res => {
          setData(res?.data?.publication);

          const mauthors = res?.data?.publication?.author_name?.map(e => ({
            label: e.searchable_name,
            value: e.id,
          }));

          const oauthors = res?.data?.publication?.other_authors?.map(e => ({
            label: e,
            value: e,
          }));

          setAuthors({
            options: [...mauthors, ...oauthors],
            selected: [...mauthors, ...oauthors],
            check: true,
          });

          const index = ["DOAJ", "Embase", "Medline", "PMC", "SCIE", "Scopus"];
          const indexed = index.filter(
            i => res?.data?.publication["in_" + i.toLowerCase()] ?? false
          );

          setIndexed({
            options: index.map((e, i) => ({
              label: e,
              value: "in_" + e.toLowerCase(),
            })),
            selected: indexed.map((e, i) => ({
              label: e,
              value: "in_" + e.toLowerCase(),
            })),
            check: true,
          });

          setVisible(false);
        })
        .catch(err => {
          message.error("Could not fetch file data");
          console.log(err);
        });
  }, [id]);

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
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then(res => {
        message.success("Research added successfully!");
      })
      .catch(err => message.error("Something went wrong!"));
  };

  const onFinishFailed = errorInfo => message.error("Something went wrong!");

  return (
    <>
      {data && (
        <Form
          name="basic"
          form={form}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            pubmed: data.pubmed_id ?? " ",
            doi: data.doi_id ?? " ",
            type: data.publication_type ?? " ",
            title: data.publication_title ?? " ",
            journal: data.journal_name ?? " ",
            published: data.year ?? " ",
            abstract: data.abstract ?? " ",
            volume: !isNaN(parseInt(data?.volume)) ? parseInt(data?.volume) : 0,
            issue: !isNaN(parseInt(data?.issue)) ? parseInt(data?.issue) : 0,
            pages: data.pages ?? " ",
            citations: data.citations ?? " ",
            hindex: !isNaN(parseInt(data?.h_index))
              ? parseInt(data?.h_index)
              : 0,
            sjr: data.sjr ?? " ",
            ifactor: data.impact_factor ?? " ",
            indexed: indexed.selected ?? " ",
            authors: authors.selected ?? " ",
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
            <Input style={{ width: "30vw" }} />
          </Form.Item>

          <Form.Item
            label="Journal Name"
            name="journal"
            rules={[{ required: true, message: "Please enter journal name" }]}
          >
            <Input style={{ width: "30vw" }} />
          </Form.Item>

          <Form.Item
            label="Publication Type"
            name="type"
            rules={[
              { required: true, message: "Please enter publication type" },
            ]}
          >
            <Input style={{ width: "30vw" }} />
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
            <Input style={{ width: "30vw" }} />
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
            <Input style={{ width: "30vw" }} />
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
            <Input style={{ width: "30vw" }} />
          </Form.Item>

          <Form.Item
            label="Published On"
            name="published"
            rules={[
              { required: true, message: "Please enter publication title" },
            ]}
          >
            <Input style={{ width: "30vw" }} />
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
            <Input style={{ width: "30vw" }} />
          </Form.Item>

          <Form.Item
            label="Impact Factor"
            name="ifactor"
            rules={[
              { required: true, message: "Please enter the impact factor" },
            ]}
          >
            <Input style={{ width: "30vw" }} />
          </Form.Item>

          <Form.Item
            label="SJR Qrt"
            name="sjr"
            rules={[
              { required: true, message: "Please enter the SJR quartile" },
            ]}
          >
            <Input style={{ width: "30vw" }} />
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
            <Input style={{ width: "30vw" }} />
          </Form.Item>

          <Form.Item label="Indexed In" name="indexed">
            <Select
              style={{ width: "30vw" }}
              mode="multiple"
              options={indexed.options}
              onChange={(labels, objects) => {
                setIndexed({
                  options: indexed.options,
                  selected: objects,
                  check: true,
                });
              }}
            />
          </Form.Item>

          <Form.Item
            label="PubMed ID"
            name="pubmed"
            rules={[{ required: true, message: "Please enter the pubmed id" }]}
          >
            <Input style={{ width: "30vw" }} />
          </Form.Item>

          <Form.Item
            label="DOI ID"
            name="doi"
            rules={[{ required: true, message: "Please enter the DOI" }]}
          >
            <Input style={{ width: "30vw" }} />
          </Form.Item>

          <Form.Item label="Abstract" name="abstract">
            <Input style={{ width: "30vw" }} />
          </Form.Item>

          <Form.Item
            label="Authors"
            name="authors"
            rules={[{ required: true, message: "Please select the authors" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "30vw" }}
              options={authors.options}
              onChange={(labels, objects) => {
                setAuthors({
                  options: authors.options,
                  selected: objects,
                  check: true,
                });
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className={styles.submit} type="primary" htmlType="submit">
              Save Changes
            </Button>

            <Button className={styles.reset} type="primary" htmlType="reset">
              Revert Back
            </Button>

            <Button
              className={styles.reset}
              type="primary"
              href={`/file/${id}`}
            >
              Back To File
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default FileForm;
