import { Button, DatePicker, FloatButton, Form } from "antd";
import { Input, Select, message } from "antd";
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
import Spinner from "../../src/components/Common/Spinner";

const IPR = () => {
  // HOOKS

  const router = useRouter();
  const [form] = Form.useForm();

  const { access } = useAccess();
  const { user } = useUser();

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
    formdata?.append("ipr_awarded", values.ipr);
    formdata?.append("ipr_title", values.title);
    formdata?.append("status", values.status);
    formdata?.append("awarding_agency", values.agency);
    formdata?.append("date", values.date.format("YYYY-MM-DD"));
    formdata?.append("ipr_number", values.ipr_number);

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
        <title>DYPU RIMS | Add IPR</title>
        <link rel="icon" href="../logos/dpu-2.png" />
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
              <h1 className={styles.heading}>Add IPR</h1>

              <Form
                name="ipr"
                form={form}
                style={{ width: "80vw", padding: "0 10vw" }}
                initialValues={{
                  faculty: user?.name,
                  department: user?.department,
                }}
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
                  <Select showSearch placeholder="Select an agency" allowClear>
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

                <Form.Item
                  label="IPR Number"
                  name="ipr_number"
                  rules={[
                    {
                      required: true,
                      message: "Please input IPR number!",
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
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IPR;
