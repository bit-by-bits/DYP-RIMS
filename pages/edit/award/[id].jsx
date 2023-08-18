import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../src/styles/add.module.css";
import Side from "../../../src/components/Common/Side";
import Top from "../../../src/components/Common/Top";
import URLObj from "../../../src/components/baseURL";
import { Button, DatePicker, FloatButton } from "antd";
import { message, Form, Input, Select } from "antd";
import { useUser } from "../../../src/components/context/userContext";
import Spinner from "../../../src/components/Common/Spinner";

const Awards = () => {
  // HOOKS

  const router = useRouter();
  const { user } = useUser();

  const { id } = router.query;
  const [ID, setID] = useState("");

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
        <Spinner show={visible} />

        <FloatButton.BackTop
          style={{ left: 30, bottom: 30, borderRadius: "50%" }}
        />

        <div style={{ paddingLeft: "20vw" }}>
          <Side />

          <div className={styles.container}>
            <Top />

            <div className={styles.formContainer}>
              <h1 className={styles.heading}>Edit Awards</h1>

              <Form
                form={form}
                name="award"
                style={{ width: "80vw", padding: "0 10vw" }}
                initialValues={
                  initialValues ?? {
                    faculty: user?.name,
                    department: user?.department,
                  }
                }
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

                <Form.Item>
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
      </div>
    </>
  );
};

export default Awards;
