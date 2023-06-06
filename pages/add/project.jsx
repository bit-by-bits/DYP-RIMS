import {
  Button,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Select,
  Spin,
  message,
} from "antd";
import styles from "../../styles/add.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Side from "../../src/Common/Side";
import { useRouter } from "next/router";
import Top from "../../src/Common/Top";
import axios from "axios";
import URLObj from "../../src/baseURL";

const Projects = () => {
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
        ? Date.now() - user?.setUpTime > 3600000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  // STATES

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);

  // EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1200);
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  // FUNCTIONS

  const onFinish = values => {
    const formdata = new FormData();

    formdata?.append("principal_investigator", values.investigator);
    formdata?.append("co_investigator", values.investigators);
    formdata?.append("funding_agency", values.agency);
    formdata?.append("country_funding_agency", values.country);
    formdata?.append("type", values.type);
    formdata?.append("starting_date", values.sdate);
    formdata?.append("end_date", values.edate);
    formdata?.append("duration", values.duration);
    formdata?.append("funds", values.funds);

    axios({
      method: "POST",
      url: `${URLObj.base}/research/project/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Project added successfully");
        router.push("/profile");
        form.resetFields();
      })
      .catch(err => {
        message.error("Something went wrong");
      });
  };

  const onFinishFailed = errorInfo => {
    message.error("Something went wrong");
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Add Projects</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
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

            <div className={styles.container}>
              <Top user={user} />

              <div className={styles.formContainer}>
                <h1 className={styles.heading}>Add Projects</h1>

                <Form
                  name="project"
                  form={form}
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Principal Investigator"
                    name="investigator"
                    rules={[
                      {
                        required: true,
                        message: "Please input investigator name!",
                      },
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
                    rules={[
                      { required: true, message: "Please input agency name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Country of Agency"
                    name="country"
                    rules={[
                      { required: true, message: "Please input country name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Type of Project"
                    name="type"
                    rules={[
                      { required: true, message: "Please input project type!" },
                    ]}
                  >
                    <Select showSearch placeholder="Select a type" allowClear>
                      <Select.Option value="government">
                        Government
                      </Select.Option>
                      <Select.Option value="private">Private</Select.Option>
                      <Select.Option value="non-government">
                        Non-Government
                      </Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Starting Date"
                    name="sdate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter starting date!",
                      },
                    ]}
                  >
                    <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    label="Ending Date"
                    name="edate"
                    rules={[
                      { required: true, message: "Please enter ending date!" },
                    ]}
                  >
                    <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    label="Project Duration"
                    name="duration"
                    rules={[
                      {
                        required: true,
                        message: "Please enter project duration!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Funds (INR Lakhs)"
                    name="funds"
                    rules={[
                      {
                        required: true,
                        message: "Please enter project funds!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      className={styles.primary}
                      type="primary"
                      htmlType="submit"
                    >
                      SUBMIT
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};
export default Projects;
