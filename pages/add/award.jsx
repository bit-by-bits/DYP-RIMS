import { Button, DatePicker, FloatButton, Form } from "antd";
import { Input, Select, Spin, Upload, message } from "antd";
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

const Awards = () => {
  // HOOKS

  const router = useRouter();
  const { user } = useUser();
  const { Dragger } = Upload;
  const [form] = Form.useForm();

  // STATES

  const [visible, setVisible] = useState(true);

  const [step, setStep] = useState(0);
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);

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
    formdata?.append("agency", values.agency);
    formdata?.append("award", values.title);
    formdata?.append("type", values.type);
    formdata?.append(
      "date",
      data?.start_date
        ? values.date
        : `${values.date.year()}-${
            values.date.month() + 1
          }-${values.date.date()}`
    );
    formdata?.append("location", values.location);
    formdata?.append("file", file);

    axios({
      method: "POST",
      url: `${URLObj.base}/research/award/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Award added successfully");
        router.push("/profile");
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

  const add = () => {
    setSearching(true);

    if (!file) {
      setSearching(false);
      message.error("Select a file first");
      return;
    }

    const formData = new FormData();
    formData?.append("file", file);
    formData?.append("type", "award");

    axios({
      method: "POST",
      url: URLObj.ai,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(res => {
        message.success("Award details fetched successfully");
        setSearching(false);

        setStep(1);
        setData(res.data?.response);
      })
      .catch(err => {
        message.error("Something went wrong while fetching details");
        setSearching(false);
      });
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | Add Awards</title>
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
                  <Dragger
                    name="file"
                    multiple={false}
                    style={{ border: "none" }}
                    className={styles2.upload_left}
                    beforeUpload={file => setFile(file)}
                  >
                    <Image
                      width={60}
                      height={60}
                      alt="ADD"
                      src="/upload.png"
                      className={styles2.upload_img}
                    />
                    <div className={styles2.upload_title}>Add a file</div>

                    <div className={styles2.upload_msg}>
                      Click or drag file to this area to upload
                    </div>
                  </Dragger>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
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
                    onClick={() => {
                      setStep(1);
                      setData({});
                    }}
                    className={styles2.upload_btn2}
                  >
                    Skip
                  </div>
                </div>
              </div>

              <div
                className={styles.formContainer}
                style={step ? {} : { display: "none" }}
              >
                <h1 className={styles.heading}>Add Awards</h1>

                <Form
                  form={form}
                  name="award"
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={
                    data?.start_date
                      ? {
                          faculty: user?.name,
                          department: user?.department,
                          title: data?.award_name,
                          date: data?.start_date?.split(" ")?.shift(),
                          location: data?.location,
                        }
                      : {
                          faculty: user?.name,
                          department: user?.department,
                          title: data?.award_name,
                          location: data?.location,
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

                  {data?.start_date ? (
                    <Form.Item
                      label="Date"
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: "Please input award date!",
                        },
                      ]}
                    >
                      <Input disabled />
                    </Form.Item>
                  ) : (
                    <Form.Item
                      label="Date"
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: "Please input award date!",
                        },
                      ]}
                    >
                      <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  )}

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
