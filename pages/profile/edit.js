import Head from "next/head";
import axios from "axios";
import URLObj from "../../src/components/baseURL";
import Side from "../../src/components/Common/Side";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Top from "../../src/components/Common/Top";
import styles from "../../src/styles/add.module.css";
import { Button, DatePicker, FloatButton, Input, Radio } from "antd";
import { Select, Upload, Form, message } from "antd";
import { useUser } from "../../src/components/context/userContext";

const Edit = () => {
  // BOILERPLATE

  const router = useRouter();
  const { user } = useUser();

  // STATES

  const [form] = Form.useForm();
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

    formdata?.append("first_name", values.first_name);
    formdata?.append("last_name", values.last_name);
    formdata?.append(
      "age",
      Math.max(
        Math.floor((new Date() - new Date(values.age).getTime()) / 3.15576e10),
        0
      )
    );
    formdata?.append("gender", values.gender);
    formdata?.append("position", values.position);
    formdata?.append("profile_picture", file);

    axios({
      method: "PATCH",
      url: `${URLObj.base}/profiles/users/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        form.resetFields();
        message.success("Profile edited successfully");
        setTimeout(() => router.push("/profile"), 1200);
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
        <title>DYPU RIMS | Edit Profile</title>
        <link rel="icon" href="../../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spinner show={visible} />

        <FloatButton.BackTop
          style={{ left: 30, bottom: 30, borderRadius: "50%" }}
        />

        <div style={{ paddingLeft: "18vw" }}>
          <Side />

          <div className={styles.container}>
            <Top />

            <div className={styles.formContainer}>
              <h1 className={styles.heading}>Edit Profile</h1>

              <Form
                name="edit"
                form={form}
                style={{ width: "80vw", padding: "0 10vw" }}
                initialValues={{
                  first_name: user?.name?.split(" ")[0],
                  last_name: user?.name?.split(" ")?.slice(-1),
                  gender: user?.gender,
                  department: user?.department,
                  level: user?.level,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
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

                <Form.Item label="Middle Name" name="middle_name">
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
                  label="Current Position"
                  name="position"
                  rules={[
                    {
                      required: true,
                      message: "Please input your position!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select your position"
                    showSearch
                    options={[
                      "Senior resident/registrar/tutor",
                      "Assistant professor",
                      "Associate Professor",
                      "Professor",
                      "Professor emeritus",
                      "Admin staff",
                    ].map(item => ({ value: item, label: item }))}
                  />
                </Form.Item>

                <Form.Item label="Access Level" name="level">
                  <Input disabled />
                </Form.Item>

                <Form.Item label="Department" name="department">
                  <Input disabled />
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
                        message.success("JPEG/PNG file uploaded successfully");
                      } else {
                        message.error("You can only upload JPG/PNG file!");
                      }

                      return isJpgOrPng || Upload.LIST_IGNORE;
                    }}
                  >
                    <Button>Click to Upload</Button>
                  </Upload>
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
      </div>
    </>
  );
};

export default Edit;
