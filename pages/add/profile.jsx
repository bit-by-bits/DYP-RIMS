import { Button, DatePicker, FloatButton, Form, Radio, Upload } from "antd";
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

const Faculty = () => {
  // HOOKS

  const router = useRouter();
  const [form] = Form.useForm();

  const { access } = useAccess();
  const { user } = useUser();

  // STATES

  const [file, setFile] = useState(null);
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
    formdata?.append("organisation_name", values?.org_name);
    formdata?.append("organisation_domain", values?.org_domain);
    formdata?.append(
      "age",
      Math.max(
        Math.floor((new Date() - new Date(values.age).getTime()) / 3.15576e10),
        0
      )
    );
    formdata?.append("access_level", values?.access_level);
    formdata?.append("mobile", values?.mobile);
    formdata?.append("gender", values?.gender);
    formdata?.append("profile_picture", file);
    formdata?.append("department", values?.department);
    formdata?.append("designation", values?.designation);
    formdata?.append("first_name", values?.first_name);
    formdata?.append("last_name", values?.last_name);
    formdata?.append("email", values?.email);
    formdata?.append("username", values?.username);

    axios({
      method: "POST",
      url: `${URLObj.base}/faculty/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
        "X-ACCESS-LEVEL": "department",
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
        <title>DYPU RIMS | Add Faculty</title>
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
                <h1 className={styles.heading}>Add Faculty</h1>

                <Form
                  name="Faculty"
                  form={form}
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Org Name"
                    name="org_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input organisation name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Org Domain"
                    name="org_domain"
                    rules={[
                      {
                        required: true,
                        message: "Please input organisation domain!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Date of Birth"
                    name="age"
                    rules={[
                      {
                        required: true,
                        message: "Please input your age!",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                  </Form.Item>

                  <Form.Item
                    label="Access Level"
                    name="access_level"
                    rules={[
                      { required: true, message: "Please input access level!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Mobile"
                    name="mobile"
                    rules={[
                      { required: true, message: "Please input mobile!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: "Please input your gender!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female">Female</Radio>
                      <Radio value="Non-binary">Non-binary</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Profile Picture"
                    name="picture"
                    rules={[
                      {
                        required: true,
                        message: "Please input your profile picture!",
                      },
                    ]}
                  >
                    <Upload
                      maxCount={1}
                      listType="picture"
                      beforeUpload={file => {
                        const isJpgOrPng =
                          file.type === "image/png" ||
                          file.type === "image/jpeg" ||
                          file.type === "image/jpg";

                        if (isJpgOrPng) {
                          setFile(file);
                          message.success(
                            "JPEG/PNG file uploaded successfully"
                          );
                        } else {
                          message.error("You can only upload JPG/PNG file!");
                        }

                        return isJpgOrPng || Upload.LIST_IGNORE;
                      }}
                    >
                      <Button>Click to Upload</Button>
                    </Upload>
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
                    label="Designation"
                    name="designation"
                    rules={[
                      {
                        required: true,
                        message: "Please input your designation!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
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
                      Submit
                    </Button>
                    <Button
                      className={styles.secondary}
                      type="primary"
                      htmlType="reset"
                    >
                      Reset
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

export default Faculty;
