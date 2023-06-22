import { Button, DatePicker, FloatButton, Form } from "antd";
import { Input, Select, Spin, message } from "antd";
import styles from "../../styles/add.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Side from "../../src/Common/Side";
import { useRouter } from "next/router";
import Top from "../../src/Common/Top";
import axios from "axios";
import URLObj from "../../src/baseURL";
import { useUser } from "../../src/context/userContext";

const Students = () => {
  // HOOKS

  const router = useRouter();
  const { user } = useUser();
  const [form] = Form.useForm();

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
  }, [visible, form]);

  // FUNCTIONS

  const onFinish = values => {
    const formdata = new FormData();

    formdata?.append("faculty", values.faculty);
    formdata?.append("department", values.department);
    formdata?.append("student_name", values.student);
    formdata?.append("student_degree", values.degree);
    formdata?.append("thesis_topic", values.topic);
    formdata?.append("year", values.year?.$y);

    axios({
      method: "POST",
      url: `${URLObj.base}/research/student/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Student added successfully");
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
        <title>DYPU RIMS | Add Students Guided</title>
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
                <h1 className={styles.heading}>Add Students Guided</h1>

                <Form
                  name="students"
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
                    <DatePicker style={{ width: "100%" }} picker="year" />
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

export default Students;
