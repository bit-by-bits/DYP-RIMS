import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../src/styles/add.module.css";
import Side from "../../../src/components/Common/Side";
import Top from "../../../src/components/Common/Top";
import URLObj from "../../../src/components/baseURL";
import { Button, DatePicker, FloatButton } from "antd";
import { Spin, message, Form, Input, Select } from "antd";
import { useUser } from "../../../src/components/context/userContext";

const Books = () => {
  // HOOKS

  const router = useRouter();
  const { user } = useUser();

  const { isbn } = router.query;
  const [ISBN, setISBN] = useState("");

  useEffect(() => {
    if (router.isReady) setISBN(isbn);
  }, [router, isbn]);

  // STATES

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  // EFFECTS

  useEffect(() => {
    if (ISBN && user?.token) {
      axios({
        method: "PUT",
        url: `${URLObj.base}/books/?isbn=${ISBN}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      }).then(res => {
        const DATA = res?.data?.volumeInfo;
        setVisible(false);
        setInitialValues({
          faculty: user?.name,
          department: user?.department,
          type: DATA?.printType,
          book:
            (DATA?.title ?? "") +
            (DATA?.subtitle ? ": " : "") +
            (DATA?.subtitle ?? ""),
          isbn: ISBN,
        });
      });
    }
  }, [ISBN, user]);

  useEffect(() => {
    form.resetFields();
  }, [ISBN, initialValues]);

  // FUNCTIONS

  const onFinish = values => {
    const formdata = new FormData();
    formdata?.append("isbn", ISBN);
    formdata?.append("faculty", values.faculty);
    formdata?.append("department", values.department);
    formdata?.append("type", values.type);
    formdata?.append("title", values.title ?? "-");
    formdata?.append("book", values.book);
    formdata?.append("year", values.year?.$y);

    axios({
      method: "PATCH",
      url: `${URLObj.base}/books/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Book edited successfully");
        router.push(`/book/${ISBN}`);
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
        <title>DYPU RIMS | Edit Books/Chapters</title>
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
                <h1 className={styles.heading}>Edit Books/Chapters</h1>

                <Form
                  name="book"
                  form={form}
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={
                    initialValues ?? {
                      faculty: user?.name,
                      department: user?.department,
                      isbn: ISBN,
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
                    label="Publication Type"
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "Please input publication type!",
                      },
                    ]}
                  >
                    <Select showSearch placeholder="Select a type" allowClear>
                      <Select.Option value="book">Book</Select.Option>
                      <Select.Option value="chapter">Chapter</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Chapter Title" name="title">
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Book Title"
                    name="book"
                    rules={[
                      {
                        required: true,
                        message: "Please input the book name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Year Published"
                    name="year"
                    rules={[
                      {
                        required: true,
                        message: "Please enter publishing year!",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} format="YYYY" />
                  </Form.Item>

                  <Form.Item
                    label="ISBN Number"
                    name="isbn"
                    rules={[
                      {
                        required: true,
                        message: "Please input ISBN number!",
                      },
                    ]}
                  >
                    {ISBN ? <Input disabled /> : <Input />}
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      type="primary"
                      className={styles.primary}
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
export default Books;
