import { Button, FloatButton, Form, Input, Select, Spin, message } from "antd";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../src/styles/add.module.css";
import Side from "../../../src/components/Common/Side";
import Top from "../../../src/components/Common/Top";
import URLObj from "../../../src/components/baseURL";
import { useUser } from "../../../src/components/context/userContext";

const Student = () => {
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
        url: `${URLObj.base}/research/student/?id=${ID}`,
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
          student: DATA?.student_name,
          degree: DATA?.student_degree,
          topic: DATA?.thesis_topic,
          year: DATA?.year,
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

    formdata?.append("faculty", values.faculty);
    formdata?.append("department", values.department);
    formdata?.append("student_name", values.student);
    formdata?.append("student_degree", values.degree);
    formdata?.append("thesis_topic", values.topic);
    formdata?.append("year", values.year);
    formdata?.append("id", ID);

    axios({
      method: "PATCH",
      url: `${URLObj.base}/research/student/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Student edited successfully");
        router.push(`/student/${ID}`);
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
        <title>DYPU RIMS | Edit Students Guided</title>
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
              <Top />

              <div className={styles.formContainer}>
                <h1 className={styles.heading}>Edit Students Guided</h1>

                <Form
                  name="students"
                  form={form}
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
                    label="Student Name"
                    name="student"
                    rules={[
                      {
                        required: true,
                        message: "Please input the student's name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Student Degree"
                    name="degree"
                    rules={[
                      {
                        required: true,
                        message: "Please input student's degree!",
                      },
                    ]}
                  >
                    <Select showSearch placeholder="Select a degree" allowClear>
                      <Select.Option value="MD">MD</Select.Option>
                      <Select.Option value="MS">MS</Select.Option>
                      <Select.Option value="MSc">MSc</Select.Option>
                      <Select.Option value="PhD">PhD</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Thesis Topic"
                    name="topic"
                    rules={[
                      { required: true, message: "Please input thesis topic!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Guiding Year"
                    name="year"
                    rules={[
                      { required: true, message: "Please input the year!" },
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

export default Student;
