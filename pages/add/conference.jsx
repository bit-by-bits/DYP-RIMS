// IMPORT DEPENDENCIES
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../styles/add.module.css";
import styles2 from "../../styles/upload.module.css";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";
import axios from "axios";
import URLObj from "../../src/baseURL";
import { Button, DatePicker, Form } from "antd";
import { Input, message, Select, Upload } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Side from "../../src/Common/Side";

// CONVERT STRING TO DATE
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

// MAIN FUNCTION
const Conferences = () => {
  // STATES AND VARIABLES
  const router = useRouter();
  const [form] = Form.useForm();
  const [user, setUser] = useState({});

  // FETCH USER
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  // STATES AND VARIABLES
  const [poster, setPoster] = useState(0);
  const [paper, setPaper] = useState(0);

  const [dept, setDept] = useState({});
  const [depts, setDepts] = useState([]);

  const [step, setStep] = useState(0);
  const [file, setFile] = useState();
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState({});

  // RESET FORM EFFECT
  useEffect(() => form.resetFields(), [form, dept, data]);
  useEffect(() => console.log(step), [step]);

  // FETCH DEPARTMENTS
  useEffect(() => {
    axios({
      method: "GET",
      url: `${URLObj.base}/departments/all/`,
    })
      .then(res => {
        setDepts(
          res.data.departments.map(dept => ({
            value: dept.id,
            label: dept.name,
          }))
        );
      })
      .catch(err => console.log(err));
  }, [user]);

  // AUTOFILL DEPARTMENT
  useEffect(() => {
    depts.forEach(dept => {
      if (dept.label === user.dept) setDept(dept.value);
    });
  }, [user, depts]);

  // FORM SUBMIT
  const onFinish = values => {
    console.log(values);

    let data = new FormData();
    data.append("name", values.attendee);
    data.append("dept_id", values.department);
    data.append("conference_name", values.conference);
    data.append("date", convert(values.date));
    data.append("type", values.type);
    data.append("location", values.location);
    data.append("certificate", file);

    data.append("is_poster", poster ? 1 : 0);
    data.append("is_paper", paper ? 1 : 0);

    if (poster) {
      const posterTitles = new Array(poster);
      const posters = new Array(poster);

      for (let i = 0; i < poster; i++) {
        posterTitles[i] = values[`tposter${i}`];
        posters[i] = values[`poster${i}`].file.originFileObj;
      }

      data.append("poster_title", posterTitles);
      data.append("poster", posters);
    }

    if (paper) {
      const paperTitles = new Array(paper);
      const papers = new Array(paper);

      for (let i = 0; i < paper; i++) {
        paperTitles[i] = values[`tpaper${i}`];
        papers[i] = values[`paper${i}`].file.originFileObj;
      }

      data.append("paper_title", paperTitles);
      data.append("paper", papers);
    }

    axios({
      method: "POST",
      maxBodyLength: Infinity,
      url: `${URLObj.base}/conference/data/add/`,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then(res => {
        message.success("Conference added successfully!");
        setTimeout(() => router.push(`/profile`), 1001);
      })
      .catch(err => message.error("Something went wrong!"));
  };

  // FORM ERROR
  const onFinishFailed = errorInfo => message.error("Something went wrong!");

  // UPLOAD CERTIFICATE
  const add = () => {
    setSearching(true);

    if (!file) {
      setSearching(false);
      message.error("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "conference");

    axios({
      method: "POST",
      url: URLObj.ai,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(res => {
        setData(res.data?.response);
        setSearching(false);
        setStep(1);

        console.log(res.data?.response);
      })
      .catch(err => {
        setSearching(false);
        message.error("Enter a valid file");
      });
  };

  // RENDER
  return (
    <>
      <Head>
        <title>Add Conferences</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <Side />

        <h1 style={step ? {} : { display: "none" }} className={styles.heading}>
          Add Conferences
        </h1>

        <Form
          form={form}
          name="conference"
          style={
            step
              ? { width: "80vw", transform: "translateX(-10vw)" }
              : { display: "none" }
          }
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            attendee: data.name,
            department: dept,
            conference: data.conference_name,
            start_date: new Date(data.start_date),
            end_date: new Date(data.end_date),
            location: data.location,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name Of Attendee"
            name="attendee"
            rules={[{ required: true, message: "Please input attendee name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: "Please input your department!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Choose your department"
              allowClear
              options={depts}
            />
          </Form.Item>

          <Form.Item
            label="Conference Name"
            name="conference"
            rules={[
              { required: true, message: "Please input conference name!" },
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
            label="Conference Start"
            name="start_date"
            rules={[
              {
                required: true,
                message: "Please enter conference starting date!",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Conference End"
            name="end_date"
            rules={[
              { required: true, message: "Please enter conference end date!" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </div>
          ))}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className={styles.primary} type="primary" htmlType="submit">
              Submit
            </Button>

            <Button
              type="primary"
              onClick={() => {
                setStep(0);
                setPaper(0);
                setPoster(0);
              }}
              className={styles.secondary}
            >
              Upload
            </Button>
          </Form.Item>
        </Form>

        <div
          style={step ? { display: "none" } : {}}
          className={styles2.wrapper}
        >
          <div style={{ margin: "4rem" }} className={styles2.upload_wrapper}>
            <div style={{ maxWidth: "90vw" }} className={styles2.upload_left}>
              <Image
                width={60}
                height={60}
                alt="ADD"
                src="/upload/upload.png"
                className={styles2.upload_img}
              />
              <div className={styles2.upload_title}>Add a file</div>

              <div className={styles2.upload_msg}>
                Kindly upload a pdf or an image file
              </div>

              <label htmlFor="file" className={styles2.label}>
                <input
                  className={styles2.upload_input1}
                  onChange={e => setFile(e.target.files[0])}
                  accept="image/jpeg,image/png,application/pdf"
                  type="file"
                  id="file"
                />

                <div className={styles2.upload_btn2}>Select File</div>
                <div className={styles2.upload_text}>
                  {file ? "Selected " + file.name : "No File Selected"}
                </div>
              </label>

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

                <div onClick={() => setStep(1)} className={styles2.upload_btn2}>
                  Skip
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conferences;
