import {
  Button,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
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

const Conferences = () => {
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

  const { RangePicker } = DatePicker;
  const { Dragger } = Upload;

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);

  const [step, setStep] = useState(0);
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState({});

  const [file, setFile] = useState(null);
  const [paper, setPaper] = useState(0);
  const [poster, setPoster] = useState(0);

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

    formdata.append("faculty", values.faculty);
    formdata.append("department", values.department);
    formdata.append("conference_type", values.type);
    formdata.append("conference_name", values.conference);
    formdata.append("certificate_file", file);
    formdata.append("attended_as", values.attended_as);

    if (data?.start_date && data?.end_date) {
      formdata.append("start_date", data?.start_date);
      formdata.append("end_date", data?.end_date);
    } else {
      formdata.append("start_date", values.date[0]);
      formdata.append("end_date", values.date[1]);
    }

    formdata.append("location", values.location);
    formdata.append("is_paper_presented", paper ? 1 : 0);
    formdata.append("is_poster_presented", poster ? 1 : 0);

    new Array(paper).fill(0).forEach((e, i) => {
      formdata.append(`paper${i}`, values[`paper${i}`]?.file);
      formdata.append(`tpaper${i}`, values[`tpaper${i}`]);
    });

    new Array(poster).fill(0).forEach((e, i) => {
      formdata.append(`poster${i}`, values[`poster${i}`]?.file);
      formdata.append(`tposter${i}`, values[`tposter${i}`]);
    });

    axios({
      method: "POST",
      url: `${URLObj.base}/research/conference/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Conference details added successfully");
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
    formData?.append("type", "conference");

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
        message.success("Conference details fetched successfully");
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
        <title>Add Conferences</title>
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
                      src="/upload/upload.png"
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
                <h1 className={styles.heading}>Add Conferences</h1>

                <Form
                  form={form}
                  name="conference"
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={
                    data?.start_date && data?.end_date
                      ? {
                          faculty: user?.name,
                          department: user?.department,
                          conference: data?.conference_name,
                          start_date: data?.start_date?.split(" ")?.shift(),
                          end_date: data?.end_date?.split(" ")?.shift(),
                          location: data?.location,
                        }
                      : {
                          faculty: user?.name,
                          department: user?.department,
                          conference: data?.conference_name,
                          location: data?.location,
                        }
                  }
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
                    label="Conference Name"
                    name="conference"
                    rules={[
                      {
                        required: true,
                        message: "Please input conference name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Type Of Conference"
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "Please select type of conference!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Choose type of conference"
                      allowClear
                      options={[
                        { value: "state", label: "State" },
                        { value: "national", label: "National" },
                        { value: "international", label: "International" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Attended As"
                    name="attended_as"
                    rules={[
                      {
                        required: true,
                        message: "Please select type of conference!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Choose type of conference"
                      allowClear
                      options={[
                        {
                          value: "delegate",
                          label: "Delegate",
                        },
                        {
                          value: "chairperson",
                          label: "Chairperson",
                        },
                        {
                          value: "faculty",
                          label: "Faculty",
                        },
                        {
                          value: "judge",
                          label: "Judge",
                        },
                      ]}
                    />
                  </Form.Item>

                  {data?.start_date && data?.end_date ? (
                    <>
                      <Form.Item
                        label="Conference Start"
                        name="start_date"
                        rules={[
                          {
                            required: true,
                            message: "Please enter conference start date!",
                          },
                        ]}
                      >
                        <Input placeholder="YYYY-MM-DD" />
                      </Form.Item>

                      <Form.Item
                        label="Conference End"
                        name="end_date"
                        rules={[
                          {
                            required: true,
                            message: "Please enter conference end date!",
                          },
                        ]}
                      >
                        <Input placeholder="YYYY-MM-DD" />
                      </Form.Item>
                    </>
                  ) : (
                    <Form.Item
                      label="Conference Dates"
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: "Please enter conference dates!",
                        },
                      ]}
                    >
                      <RangePicker style={{ width: "100%" }} />
                    </Form.Item>
                  )}

                  <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: "Please input conference location!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      onClick={() => setPaper(paper + 1)}
                      type="primary"
                      className={styles.primary}
                    >
                      Add Paper Presentation
                    </Button>

                    <Button
                      onClick={() => setPoster(poster + 1)}
                      type="primary"
                      className={styles.secondary}
                    >
                      Add Poster Presentation
                    </Button>
                  </Form.Item>

                  {new Array(poster).fill(0).map((e, i) => (
                    <div key={i}>
                      <Form.Item label="Poster Title" name={`tposter${i}`}>
                        <Input />
                      </Form.Item>

                      <Form.Item label="Upload Poster" name={`poster${i}`}>
                        <Upload
                          onValuesChange={info => {
                            if (info.file.status === "done") {
                              message.success(
                                `${info.file.name} file uploaded successfully`
                              );
                            } else if (info.file.status === "error") {
                              message.error(
                                `${info.file.name} file upload failed.`
                              );
                            }
                          }}
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button>
                        </Upload>
                      </Form.Item>
                    </div>
                  ))}

                  {new Array(paper).fill(0).map((e, i) => (
                    <div key={i}>
                      <Form.Item label="Paper Title" name={`tpaper${i}`}>
                        <Input />
                      </Form.Item>

                      <Form.Item label="Upload Paper" name={`paper${i}`}>
                        <Upload
                          onValuesChange={info => {
                            if (info.file.status === "done") {
                              message.success(
                                `${info.file.name} file uploaded successfully`
                              );
                            } else if (info.file.status === "error") {
                              message.error(
                                `${info.file.name} file upload failed.`
                              );
                            }
                          }}
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to Upload
                          </Button>
                        </Upload>
                      </Form.Item>
                    </div>
                  ))}

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
                      onClick={() => {
                        setStep(0);
                        setPaper(0);
                        setPoster(0);
                      }}
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
export default Conferences;
