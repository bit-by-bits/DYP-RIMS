import { Button, DatePicker, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/add.module.css";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";

const Poster = () => {
  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Add Poster Presentation</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <h1 className={styles.heading}>Add Poster Presentation</h1>

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
            label="Presentation Date"
            name="date"
            rules={[
              { required: true, message: "Please enter conference date!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Poster Title"
            name="poster"
            rules={[{ required: true, message: "Please input poster title!" }]}
          >
            <Input />
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
            label="Upload Certificate and Poster"
            name="certificate"
            rules={[
              {
                required: true,
                message: "Please input conference certificate and poster!",
              },
            ]}
          >
            <Upload
              onChange={info => {
                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }

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
export default Poster;
