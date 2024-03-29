import { Button, Form, Input, Select, message } from "antd";
import styles from "../../src/styles/add.module.css";
import styles2 from "../../src/styles/upload.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Side from "../../src/components/Common/Side";
import { useRouter } from "next/router";
import Top from "../../src/components/Common/Top";
import Image from "next/image";
import axios from "axios";
import URLObj from "../../src/components/baseURL";
import { useUser } from "../../src/components/context/userContext";
import { useAccess } from "../../src/components/context/accessContext";
import Spinner from "../../src/components/Common/Spinner";

const Books = () => {
  // HOOKS

  const router = useRouter();
  const [form] = Form.useForm();

  const { access } = useAccess();
  const { user } = useUser();

  // STATES

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
    formdata?.append("title", values.title ?? "-");
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

  const add = () => {
    setSearching(true);

    const formdata = new FormData();
    formdata?.append("isbn", ISBN);

    axios({
      method: "PUT",
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
        <title>DYPU RIMS | Add Books/Chapters</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spinner show={visible} />

        <div style={{ paddingLeft: "20vw" }}>
          <Side />

          <div className={styles.container}>
            <Top />

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
                    src="/upload.png"
                    className={styles2.upload_img}
                  />
                  <div className={styles2.upload_title}>Add a file</div>

                  <div className={styles2.upload_msg}>
                    Kindly enter the ISBN number of the book you want to add
                  </div>

                  <Input
                    style={{ width: "40vw", margin: "20px 0 10px 0" }}
                    onPressEnter={add}
                    placeholder="enter isbn here"
                    onChange={e => setISBN(e.target.value)}
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
                form={form}
                style={{ width: "80vw", padding: "0 10vw" }}
                initialValues={{
                  faculty: user?.name,
                  department: user?.department,
                  book:
                    (data?.title ?? "") +
                    (data?.subtitle ? ": " : "") +
                    (data?.subtitle ?? ""),
                  year: data?.publishedDate,
                  isbn: ISBN,
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

                <Form.Item>
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
      </div>
    </>
  );
};

export default Books;
