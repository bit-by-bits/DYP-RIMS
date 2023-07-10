import axios from "axios";
import URLObj from "../src/components/baseURL";
import Head from "next/head";
import Side from "../src/components/Common/Side";
import Top from "../src/components/Common/Top";
import { useEffect, useState } from "react";
import styles2 from "../src/styles/add.module.css";
import { useUser } from "../src/components/context/userContext";
import { Form, Radio, message, Spin, Table } from "antd";
import { Button, DatePicker, FloatButton, Select } from "antd";

const Downloads = () => {
  // HOOKS

  const { user } = useUser();
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  // STATES

  const [data, setData] = useState([]);
  const [allDates, setAllDates] = useState(true);
  const [visible, setVisible] = useState(true);

  // EFFECTS

  useEffect(() => {
    const DATA = JSON.parse(localStorage.getItem("downloads"));

    if (DATA && DATA?.length) {
      setData(DATA);
    }

    setTimeout(() => {
      setVisible(false);
    }, 1200);
  }, []);

  // FUNCTIONS

  const onFinish = values => {
    const formdata = new FormData();

    formdata.append("export", values.export?.join(","));
    formdata.append("is_softcopy_required", values.softcopy);
    formdata.append(
      "date",
      values.mode
        ? "all"
        : `${values.range[0].format("YYYY-MM")} ## ${values.range[1].format(
            "YYYY-MM"
          )}`
    );

    axios({
      method: "POST",
      url: `${URLObj.base}/export/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        onReset();
        updateData(values, res.data?.url);
        message.success("Data fetched successfully");
      })
      .catch(err => {
        console.log("Failed:", err);
        message.error("Something went wrong");
      });
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
    message.error("Something went wrong");
  };

  const onReset = () => {
    form.resetFields();
    setAllDates(true);
  };

  const updateData = (values, link) => {
    const DATA = {
      key: data?.length + 1,
      items: values?.export
        ?.map(
          i => i?.charAt(0).toUpperCase() + i?.slice(1)?.toLowerCase() + "s"
        )
        .join(", "),
      date: values?.mode
        ? "All"
        : values?.range?.map(i => i?.format("YYYY-MM"))?.join(" to "),
      softcopy:
        values?.softcopy?.charAt(0).toUpperCase() +
        values?.softcopy?.slice(1)?.toLowerCase(),
      file: link,
    };

    setData([DATA, ...data]);
    localStorage.setItem("downloads", JSON.stringify([DATA, ...data]));
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | Downloads</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles2.wrapper}>
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

            <div className={styles2.container}>
              <Top />

              <div className={styles2.formContainer}>
                <h1 className={styles2.heading}>Request Download</h1>

                <Form
                  name="request"
                  form={form}
                  style={{ width: "80vw", transform: "translateX(-10vw)" }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  onReset={onReset}
                >
                  <Form.Item
                    label="What to Download?"
                    name="export"
                    rules={[
                      {
                        required: true,
                        message: "Please input the items you want to download!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select what you want to download"
                      style={{ width: "100%" }}
                      showSearch
                      mode="multiple"
                      allowClear
                    >
                      {[
                        "Publications",
                        "Awards",
                        "Conferences",
                        "Books",
                        "IPRs",
                      ].map((item, index) => (
                        <Select.Option
                          key={index}
                          value={item?.slice(0, -1)?.toLowerCase()}
                        >
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Provide Softcopy?"
                    name="softcopy"
                    rules={[
                      {
                        required: true,
                        message: "Please mention if you want softcopy!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">No</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Duration of Data"
                    name="mode"
                    rules={[
                      {
                        required: true,
                        message: "Please input if you want all data!",
                      },
                    ]}
                  >
                    <Radio.Group onChange={e => setAllDates(e.target.value)}>
                      <Radio value={true}>All</Radio>
                      <Radio value={false}>Custom</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {!allDates && (
                    <Form.Item
                      label="Pick Time Period"
                      name="range"
                      rules={[
                        {
                          required: !allDates,
                          message:
                            "Please input from when you want to download!",
                        },
                      ]}
                    >
                      <RangePicker picker="month" style={{ width: "100%" }} />
                    </Form.Item>
                  )}

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={styles2.primary}
                    >
                      Submit
                    </Button>

                    <Button
                      type="primary"
                      htmlType="reset"
                      className={styles2.secondary}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </Form>

                <h1 className={styles2.heading}>My Downloads</h1>

                <Table
                  className={styles2.table}
                  columns={[
                    {
                      title: "No.",
                      dataIndex: "no",
                      key: "no",
                      render: (a, b, c) => `${c + 1}.`,
                    },
                    ...["Items", "Date", "Softcopy"].map(item => ({
                      title: item,
                      dataIndex: item?.toLowerCase(),
                      key: item?.toLowerCase(),
                    })),
                    {
                      title: "File",
                      dataIndex: "file",
                      key: "file",
                      render: a => (
                        <Button
                          type="primary"
                          htmlType="submit"
                          className={styles2.primary}
                          onClick={() => window.open(a)}
                        >
                          Download
                        </Button>
                      ),
                    },
                  ]}
                  dataSource={data}
                />
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Downloads;
