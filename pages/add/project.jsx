import { Button, DatePicker, Form, Input } from "antd";
import styles from "../../styles/add.module.css";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";
import { useEffect, useState } from "react";
import Side from "../../src/Profile/Side";

const Projects = () => {
  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Add Research Projects</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        {/* <Side /> */}

        <h1 className={styles.heading}>Add Research Projects</h1>

        <Form
          name="project"
          style={{ width: "80vw", transform: "translateX(-10vw)" }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Principal Investigator"
            name="investigator"
            rules={[
              { required: true, message: "Please input investigator name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Co-investigators"
            name="investigators"
            rules={[
              {
                required: true,
                message: "Please input co-investigators' names!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Funding Agency"
            name="agency"
            rules={[{ required: true, message: "Please input agency name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country of Agency"
            name="country"
            rules={[{ required: true, message: "Please input country name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type of Project"
            name="type"
            rules={[{ required: true, message: "Please input project type!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Starting Date"
            name="sdate"
            rules={[{ required: true, message: "Please enter starting date!" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Ending Date"
            name="edate"
            rules={[{ required: true, message: "Please enter ending date!" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Project Duration"
            name="duration"
            rules={[
              { required: true, message: "Please enter project duration!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Funds Received (Lacs)"
            name="funds"
            rules={[{ required: true, message: "Please enter project funds!" }]}
          >
            <Input />
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
export default Projects;
