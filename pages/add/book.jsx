import { Button, FloatButton, Form, Input, Select, Spin, message } from "antd";
import styles from "../../styles/add.module.css";
import styles2 from "../../styles/upload.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Side from "../../src/Common/Side";
import { useRouter } from "next/router";
import Top from "../../src/Common/Top";
import Image from "next/image";
import axios from "axios";
import URLObj from "../../src/baseURL";

const Books = () => {
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

  const [step, setStep] = useState(0);
  const [ISBN, setISBN] = useState("");
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState({});

  // EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1200);
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [form, data, visible]);

  // FUNCTIONS

  const onFinish = values => {
    const formdata = new FormData();
    formdata?.append("faculty", values.faculty);
    formdata?.append("department", values.department);
    formdata?.append("type", values.type);
    formdata?.append("title", values.title);
    formdata?.append("book", values.book);
    formdata?.append("year", values.year);
    formdata?.append("isbn", values.isbn);

    axios({
      method: "POST",
      url: `${URLObj.base}/books/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Book added successfully");
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

  const add = () => {
    setSearching(true);

    const formdata = new FormData();
    formdata?.append("isbn", ISBN);

    axios({
      method: "GET",
      url: `${URLObj.base}/books/?isbn=${ISBN}`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
    })
      .then(res => {
        message.success("Book found");
        setSearching(false);

        setStep(1);
        setData(res?.data?.volumeInfo);
      })
      .catch(err => {
        setSearching(false);
        message.error("Enter a valid ISBN number");
      });
  };

  return (
    <>
      <Head>
        <title>Add Books/Chapters</title>
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

              <div
                style={step ? { display: "none" } : { height: "max-content" }}
                className={styles2.wrapper}
              >
                <div
                  style={{ width: "65vw", minHeight: "0" }}
                  className={styles2.upload_wrapper}
                >
                  <div className={styles2.upload_left}>
                    <Image
                      width={60}
                      height={60}
                      alt="ADD"
                      src="/upload/upload.png"
                      className={styles2.upload_img}
                    />
                    <div className={styles2.upload_title}>Add a file</div>

                    <div className={styles2.upload_msg}>
                      Kindly enter the ISBN number of the book you want to add
                    </div>

                    <Input
                      style={{ width: "40vw", margin: "20px 0 10px 0" }}
                      autoComplete={true}
                      placeholder="enter isbn here"
                      onChange={e => setISBN(e.target.value)}
                      onPressEnter={add}
                    />

                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      {searching ? (
                        <div className={styles2.upload_btn}>
                          <div className={styles2.dots} />
                        </div>
                      ) : (
                        <div onClick={add} className={styles2.upload_btn}>
                          Add File
                        </div>
                      )}

                      <div
                        onClick={() => setStep(1)}
                        className={styles2.upload_btn2}
                      >
                        Skip
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={styles.formContainer}
                style={step ? {} : { display: "none" }}
              >
                <h1 className={styles.heading}>Add Books/Chapters</h1>

                <Form
                  name="book"
                  form={form}
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{
                    faculty: user?.name,
                    department: user?.department,
                    title:
                      (data?.title ?? "") +
                      (data?.subtitle ? ": " : "") +
                      (data?.subtitle ?? ""),
                    year: data?.publishedDate,
                    isbn: ISBN,
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

                  <Form.Item
                    label="Publication Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input publication title!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Book Name"
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
                    <Input />
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
                      className={styles.secondary}
                      htmlType="submit"
                    >
                      SUBMIT
                    </Button>
                    <Button
                      onClick={() => setStep(0)}
                      className={styles.primary}
                      type="primary"
                      htmlType="reset"
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
export default Books;
