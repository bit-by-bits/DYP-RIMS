import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../src/styles/add.module.css";
import Side from "../../../src/components/Common/Side";
import Top from "../../../src/components/Common/Top";
import URLObj from "../../../src/components/baseURL";
import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, FloatButton } from "antd";
import { Spin, Upload, message, Form, Input, Select } from "antd";
import { useUser } from "../../../src/components/context/userContext";

const Conferences = () => {
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
  const { RangePicker } = DatePicker;
  const [visible, setVisible] = useState(true);

  const [paper, setPaper] = useState(0);
  const [poster, setPoster] = useState(0);
  const [initialValues, setInitialValues] = useState({});

  // EFFECTS

  useEffect(() => {
    if (ID && user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/research/conference/?id=${ID}`,
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
          conference: DATA?.conference_name,
          type: DATA?.conference_type,
          file: DATA?.certificate_file,
          attended_as: DATA?.attended_as,
          location: DATA?.location,
        });

        DATA?.is_paper_presented &&
          DATA?.papers?.forEach((e, i) =>
            setInitialValues({
              ...initialValues,
              [`tpaper${i}`]: e.title,
              [`paper${i}`]: e.file,
            })
          );

        DATA?.is_poster_presented &&
          DATA?.posters?.forEach((e, i) =>
            setInitialValues({
              ...initialValues,
              [`tposter${i}`]: e.title,
              [`poster${i}`]: e.file,
            })
          );

        setPaper(DATA?.papers?.length);
        setPoster(DATA?.posters?.length);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ID, user]);

  useEffect(() => {
    form.resetFields();
  }, [form, initialValues]);

  // FUNCTIONS

  const onFinish = values => {
    const formdata = new FormData();

    formdata?.append("id", ID);
    formdata?.append("faculty", values.faculty);
    formdata?.append("department", values.department);
    formdata?.append("conference_name", values.conference);
    formdata?.append("conference_type", values.type);
    formdata?.append("certificate_file", initialValues?.file);
    formdata?.append("attended_as", values.attended_as);
    formdata?.append(
      "start_date",
      `${values.date[0]?.$y}-${values.date[0]?.$M + 1}-${values.date[0]?.$D}`
    );
    formdata?.append(
      "end_date",
      `${values.date[1]?.$y}-${values.date[1]?.$M + 1}-${values.date[1]?.$D}`
    );
    formdata?.append("location", values.location);
    formdata?.append("is_paper_presented", paper ? 1 : 0);
    formdata?.append("is_poster_presented", poster ? 1 : 0);

    new Array(paper).fill(0).forEach((e, i) => {
      formdata?.append(`paper${i}`, values[`paper${i}`]?.file);
      formdata?.append(`tpaper${i}`, values[`tpaper${i}`]);
    });

    new Array(poster).fill(0).forEach((e, i) => {
      formdata?.append(`poster${i}`, values[`poster${i}`]?.file);
      formdata?.append(`tposter${i}`, values[`tposter${i}`]);
    });

    axios({
      method: "PATCH",
      url: `${URLObj.base}/research/conference/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Conference details edited successfully");
        router.push(`/conference/${ID}`);
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

  return (
    <>
      <Head>
        <title>DYPU RIMS | Edit Conferences</title>
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
                <h1 className={styles.heading}>Edit Conferences</h1>

                <Form
                  form={form}
                  name="conference"
                  style={{ width: "80vw" }}
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
