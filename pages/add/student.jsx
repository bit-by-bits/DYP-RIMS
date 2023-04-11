import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/add.module.css";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";
import { useContext } from "react";
import { UserContext } from "../../src/userContext";

const Students = () => {
  const { user, setUser } = useContext(UserContext);

  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Add Students Guided</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <h1 className={styles.heading}>Add Students Guided</h1>

        <Form
          name="basic"
          style={{ width: "80vw", transform: "translateX(-10vw)" }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ faculty: user.name, department: user.dept }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name Of Faculty"
            name="faculty"
            rules={[{ required: true, message: "Please input faculty name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department ID"
            name="department"
            rules={[
              { required: true, message: "Please input your department!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Student Name"
            name="student"
            rules={[
              { required: true, message: "Please input the student's name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Student Degree"
            name="degree"
            rules={[
              { required: true, message: "Please input student's degree!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thesis Topic"
            name="topic"
            rules={[{ required: true, message: "Please input thesis topic!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Guiding Year"
            name="year"
            rules={[{ required: true, message: "Please input the year!" }]}
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
export default Students;
