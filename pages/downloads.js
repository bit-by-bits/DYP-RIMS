import Head from "next/head";
import Side from "../src/Common/Side";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Top from "../src/Common/Top";
import styles2 from "../styles/add.module.css";
import {
  Button,
  DatePicker,
  FloatButton,
  Form,
  Select,
  Spin,
  Table,
  message,
} from "antd";

const Downloads = () => {
  // BOILERPLATE

  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      user
        ? Date.now() - user?.setUpTime > 86400000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  // STATES

  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [visible, setVisible] = useState(true);

  // EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1200);
  }, []);

  // FUNCTIONS

  const onFinish = values => {
    console.log("Success:", values);
    message.success("Request sent successfully");
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
    message.error("Request failed");
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | Downloads</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles2.wrapper}>
        <Spin
          className="spinner"
          spinning={visible}
          size="large"
          tip="Please wait as page loads"
        >
          <FloatButton.BackTop
            style={{ left: 30, bottom: 30, borderRadius: "50%" }}
          />

          <div style={{ paddingLeft: "18vw" }}>
            <Side />

            <div className={styles2.container}>
              <Top user={user} />

              <div className={styles2.formContainer}>
                <h1 className={styles2.heading}>Request A Download</h1>

                <Form
                  name="request"
                  form={form}
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="What"
                    name="what"
                    rules={[
                      {
                        required: true,
                        message: "Please input what you want to download!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select what you want to download"
                      style={{ width: "100%" }}
                      showSearch
                    >
                      {[
                        "Publications",
                        "Conferences",
                        "Books/Chapters",
                        "Research Projects",
                        "Awards",
                        "IPR",
                        "Students Guided",
                      ].map((item, index) => (
                        <Select.Option key={index} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="When"
                    name="when"
                    rules={[
                      {
                        required: true,
                        message: "Please input from when you want to download!",
                      },
                    ]}
                  >
                    <RangePicker picker="month" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={styles2.primary}
                    >
                      Submit
                    </Button>

                    <Button
                      type="primary"
                      htmlType="reset"
                      className={styles2.secondary}
                      onClick={() => form.resetFields()}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </Form>

                <h1 className={styles2.heading}>My Downloads</h1>

                <Table
                  className={styles2.table}
                  columns={[
                    {
                      title: "No.",
                      dataIndex: "key",
                      key: "key",
                    },
                    {
                      title: "Downloaded Item",
                      dataIndex: "item",
                      key: "item",
                    },
                    {
                      title: "File",
                      dataIndex: "file",
                      key: "file",
                    },
                  ]}
                  dataSource={[
                    {
                      key: 1,
                      item: "Publications",
                      file: "Download",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Downloads;
