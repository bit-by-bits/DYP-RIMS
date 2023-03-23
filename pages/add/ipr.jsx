import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/add.module.css";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";

const IPR = () => {
  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Add IPR</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <h1 className={styles.heading}>Add IPR</h1>

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
            label="IPR Awarded"
            name="ipr"
            rules={[{ required: true, message: "Please input IPR awarded!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="IPR Title"
            name="title"
            rules={[{ required: true, message: "Please input IPR title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Award Status"
            name="status"
            rules={[
              { required: true, message: "Please input current status!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Awarding Agency"
            name="agency"
            rules={[{ required: true, message: "Please input agency name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date Awarded"
            name="date"
            rules={[
              { required: true, message: "Please enter recieving date!" },
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
export default IPR;
