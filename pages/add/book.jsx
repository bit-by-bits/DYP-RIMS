import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/add.module.css";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";

const Books = () => {
  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Add Books/Chapters</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <h1 className={styles.heading}>Add Books/Chapters</h1>

        <Form
          name="basic"
          style={{ width: "80vw", transform: "translateX(-10vw)" }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
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
            label="Department"
            name="department"
            rules={[
              { required: true, message: "Please input your department!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Publication Type"
            name="type"
            rules={[
              { required: true, message: "Please input publication type!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Publication Title"
            name="title"
            rules={[
              { required: true, message: "Please input publication title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Book Name"
            name="book"
            rules={[{ required: true, message: "Please input the book name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date Published"
            name="date"
            rules={[
              { required: true, message: "Please enter publishing date!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
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
export default Books;
