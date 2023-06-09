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

const IPR = () => {
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
  }, [form, visible]);

  // FUNCTIONS

  const onFinish = values => {
    const formdata = new FormData();

    formdata?.append("faculty", values.faculty);
    formdata?.append("department", values.department);
    formdata?.append("ipr_awarded", values.ipr);
    formdata?.append("ipr_title", values.title);
    formdata?.append("status", values.status);
    formdata?.append("awarding_agency", values.agency);

    const date = values.date;
    formdata?.append(
      "date",
      `${date.year()}-${date.month() + 1}-${date.date()}`
    );

    axios({
      method: "POST",
      url: `${URLObj.base}/research/IPR/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("IPR added successfully");
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
        <title>Add IPR</title>
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
                <h1 className={styles.heading}>Add IPR</h1>

                <Form
                  name="ipr"
                  form={form}
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{
                    faculty: user?.name,
                    department: user?.department,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Name Of Faculty"
                    name="faculty"
                    rules={[
                      { required: true, message: "Please input faculty name!" },
                    ]}
                  >
                    <Input />
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
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="IPR Awarded"
                    name="ipr"
                    rules={[
                      { required: true, message: "Please input IPR awarded!" },
                    ]}
                  >
                    <Select showSearch placeholder="Select an IPR" allowClear>
                      <Select.Option value="patent">Patent</Select.Option>
                      <Select.Option value="patent-design">
                        Patent Design
                      </Select.Option>
                      <Select.Option value="copyright">Copyright</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="IPR Title"
                    name="title"
                    rules={[
                      { required: true, message: "Please input IPR title!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Award Status"
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Please input current status!",
                      },
                    ]}
                  >
                    <Select showSearch placeholder="Select a status" allowClear>
                      <Select.Option value="published">Published</Select.Option>
                      <Select.Option value="awarded">Awarded</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Awarding Agency"
                    name="agency"
                    rules={[
                      { required: true, message: "Please input agency name!" },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select an agency"
                      allowClear
                    >
                      <Select.Option value="india">India</Select.Option>
                      <Select.Option value="international">
                        International
                      </Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Date Awarded"
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Please enter recieving date!",
                      },
                    ]}
                  >
                    <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      className={styles.primary}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
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

export default IPR;
