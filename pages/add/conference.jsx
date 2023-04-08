import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/add.module.css";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";
import axios from "axios";
import URLObj from "../../src/baseURL";
import { UserContext } from "../../src/userContext";
import { useContext, useState } from "react";

import { Button, Checkbox, DatePicker, Form } from "antd";
import { Input, message, Select, Upload } from "antd";

const Conferences = () => {
  const { user, setUser } = useContext(UserContext);

  const [poster, setPoster] = useState(false);
  const [paper, setPaper] = useState(false);

  const onFinish = values => {
    let data = new FormData();
    data.append("name", values.attendee);
    data.append("dept_id", values.department);
    data.append("conference_name", values.conference);
    data.append("type", values.type);
    data.append("date", values.date);
    data.append("location", values.location);
    data.append("certificate", values.certificate.file.originFileObj);

    data.append("is_poster", poster ? 1 : 0);
    data.append("is_paper", paper ? 1 : 0);

    if (poster) {
      data.append("poster_title", values.poster_title);
      data.append("poster", values.poster.file.originFileObj);
    }

    if (paper) {
      data.append("paper_title", values.paper_title);
      data.append("paper", values.paper.file.originFileObj);
    }

    axios({
      method: "POST",
      maxBodyLength: Infinity,
      url: `${URLObj.base}/conference/data/add/`,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then(res => message.success("Conference added successfully!"))
      .catch(err => message.error("Something went wrong!"));
  };

  const onFinishFailed = errorInfo => message.error("Something went wrong!");

  return (
    <>
      <Head>
        <title>Add Conferences</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <h1 className={styles.heading}>Add Conferences</h1>

        <Form
          name="basic"
          style={{ width: "80vw", transform: "translateX(-10vw)" }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ attendee: user.name, department: user.dept }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name Of Attendee"
            name="attendee"
            rules={[{ required: true, message: "Please input attendee name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: "Please input your department!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Conference Name"
            name="conference"
            rules={[
              { required: true, message: "Please input conference name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type Of Conference"
            name="type"
            rules={[
              {
                required: true,
                message: "Please select type of conference!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Choose type of conference"
              allowClear
              options={[
                { value: "state", label: "State" },
                { value: "national", label: "National" },
                { value: "international", label: "International" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Conference Date"
            name="date"
            rules={[
              { required: true, message: "Please enter conference date!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[
              { required: true, message: "Please input conference location!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Upload Certificate"
            name="certificate"
            rules={[
              {
                required: true,
                message: "Please input conference certificate!",
              },
            ]}
          >
            <Upload
              onChange={info => {
                if (info.file.status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully`
                  );
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox onChange={e => setPaper(e.target.checked)}>
              Paper Presentation
            </Checkbox>
            <Checkbox onChange={e => setPoster(e.target.checked)}>
              Poster Presentation
            </Checkbox>
          </Form.Item>

          <Form.Item
            label="Poster Title"
            name="poster_title"
            rules={[
              { required: poster, message: "Please input poster title!" },
            ]}
          >
            <Input disabled={!poster} />
          </Form.Item>

          <Form.Item
            label="Upload Poster"
            name="poster"
            rules={[
              {
                required: poster,
                message: "Please input poster presentation!",
              },
            ]}
          >
            <Upload
              disabled={!poster}
              onChange={info => {
                if (info.file.status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully`
                  );
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Paper Title"
            name="paper_title"
            rules={[{ required: paper, message: "Please input paper title!" }]}
          >
            <Input disabled={!paper} />
          </Form.Item>

          <Form.Item
            label="Upload Paper"
            name="paper"
            rules={[
              {
                required: paper,
                message: "Please input paper presentation!",
              },
            ]}
          >
            <Upload
              disabled={!paper}
              onChange={info => {
                if (info.file.status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully`
                  );
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className={styles.primary} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Conferences;
