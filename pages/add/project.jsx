import { Button, DatePicker, FloatButton, Form } from "antd";
import { Input, Select, Spin, message } from "antd";
import styles from "../../src/styles/add.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Side from "../../src/components/Common/Side";
import { useRouter } from "next/router";
import Top from "../../src/components/Common/Top";
import axios from "axios";
import URLObj from "../../src/components/baseURL";
import { useUser } from "../../src/components/context/userContext";
import { useAccess } from "../../src/components/context/accessContext";

const Projects = () => {
  // HOOKS

  const router = useRouter();
  const [form] = Form.useForm();

  const { access } = useAccess();
  const { user } = useUser();

  const { RangePicker } = DatePicker;

  // STATES

  const [visible, setVisible] = useState(true);

  // EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1200);
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [form, visible]);

  // FUNCTIONS

  const onFinish = values => {
    const formdata = new FormData();

    formdata?.append("faculty", values.faculty);
    formdata?.append("department", values.department);
    formdata?.append("project_title", values.project_title);
    formdata?.append("funding_agency", values.agency);
    formdata?.append("country_funding_agency", values.country);
    formdata?.append("type", values.type);
    formdata?.append("starting_date", values.date[0].format("YYYY-MM-DD"));
    formdata?.append("end_date", values.date[1].format("YYYY-MM-DD"));
    formdata?.append("funds", values.funds);

    formdata?.append(
      "duration",
      `${values.date[1].year() - values.date[0].year()} years ${
        values.date[1].month() - values.date[0].month()
      } months`
    );

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
        <title>DYPU RIMS | Add Projects</title>
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
              <Top />

              <div className={styles.formContainer}>
                <h1 className={styles.heading}>Add Projects</h1>

                <Form
                  name="project"
                  form={form}
                  style={{ width: "80vw" }}
                  initialValues={{
                    faculty: user?.name,
                    department: user?.department,
                  }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Name Of Faculty"
                    name="faculty"
                    rules={[
                      { required: true, message: "Please input faculty name!" },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    label="Department"
                    name="department"
                    rules={[
                      {
                        required: true,
                        message: "Please input your department!",
                      },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    label="Title of Project"
                    name="project_title"
                    rules={[
                      {
                        required: true,
                        message: "Please input project title!",
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
                    label="Project Dates"
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Please enter project dates!",
                      },
                    ]}
                  >
                    <RangePicker style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    label="Funds (INR Lakhs)"
                    name="funds"
                    rules={[
                      {
                        pattern: /^[1-9]\d*(\.\d+)?$/,
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
