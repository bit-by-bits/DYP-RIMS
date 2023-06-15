import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/add.module.css";
import Side from "../../../src/Common/Side";
import Top from "../../../src/Common/Top";
import URLObj from "../../../src/baseURL";
import { Button, DatePicker, FloatButton } from "antd";
import { Spin, message, Form, Input, Select } from "antd";

const Awards = () => {
  // BOILERPLATE

  const router = useRouter();
  const [user, setUser] = useState({});

  const { id } = router.query;
  const [ID, setID] = useState("");

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

  useEffect(() => {
    if (router.isReady) setID(id);
  }, [router, id]);

  // STATES

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  // EFFECTS

  useEffect(() => {
    if (ID && user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/research/award/?id=${ID}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      }).then(res => {
        const DATA = res?.data?.data?.[0];
        setVisible(false);
        setInitialValues({
          faculty: user?.name,
          department: user?.department,
          agency: DATA?.awarding_agency,
          title: DATA?.title,
          type: DATA?.award_type,
          location: DATA?.location,
        });
      });
    }
  }, [ID, user]);

  useEffect(() => {
    form.resetFields();
  }, [form, initialValues]);

  // FUNCTIONS

  const onFinish = values => {
    const formdata = new FormData();
    console.log(values.date);

    formdata?.append("faculty", values.faculty);
    formdata?.append("department", values.department);
    formdata?.append("agency", values.agency);
    formdata?.append("title", values.title);
    formdata?.append("type", values.type);
    formdata?.append("date", `${values.date?.format("YYYY-MM-DD")}`);
    formdata?.append("location", values.location);

    axios({
      method: "PATCH",
      url: `${URLObj.base}/research/award/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Award added successfully");
        router.push(`/award/${ID}`);
        form.resetFields();
      })
      .catch(err => {
        message.error("Something went wrong");
        console.log(err);
      });
  };

  const onFinishFailed = errorInfo => {
    message.error("Something went wrong");
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | Edit Awards</title>
        <link rel="icon" href="../../logos/dpu-2.png" />
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
                <h1 className={styles.heading}>Edit Awards</h1>

                <Form
                  form={form}
                  name="award"
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={
                    initialValues ?? {
                      faculty: user?.name,
                      department: user?.department,
                    }
                  }
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
                    label="Awarding Agency"
                    name="agency"
                    rules={[
                      { required: true, message: "Please input agency name!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Title Of Award"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input title of award!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Type Of Award"
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "Please select type of award!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Choose type of award"
                      allowClear
                      options={[
                        { value: "state", label: "State" },
                        { value: "national", label: "National" },
                        { value: "international", label: "International" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Award Dates"
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Please enter award dates!",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                  </Form.Item>

                  <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: "Please input award location!",
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

                    <Button
                      type="primary"
                      className={styles.secondary}
                      htmlType="reset"
                      onClick={() => setStep(0)}
                    >
                      RETURN BACK
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

export default Awards;
