import { Button, DatePicker, Form, Select, Upload } from "antd";
import { Input, message } from "antd";
import styles from "../../styles/add.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import URLObj from "../baseURL";
import { useUser } from "../context/userContext";
import { useAccess } from "../context/accessContext";

const AddDepartmentInfo = () => {
  // HOOKS

  const router = useRouter();
  const [form] = Form.useForm();

  const { user } = useUser();
  const { access } = useAccess();

  // STATES

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
    const AGE = Math.floor(
      (new Date() - new Date(values.age).getTime()) / 3.15576e10
    );

    const formdata = new FormData();
    // formdata?.append("organisation_name", values?.org_name);
    // formdata?.append("organisation_domain", values?.org_domain);
    formdata?.append("first_name", values?.first_name);
    formdata?.append("middle_name", values?.middle_name);
    formdata?.append("last_name", values?.last_name);
    formdata?.append("age", Math.max(0, AGE));
    formdata?.append("department", values?.department);
    formdata?.append("access_level", values?.access_level);
    // formdata?.append("mobile", values?.mobile);
    // formdata?.append("gender", values?.gender);
    formdata?.append("profile_picture", file);
    formdata?.append("designation", values?.designation);
    formdata?.append("email", values?.email);
    // formdata?.append("username", values?.username);

    axios({
      method: "POST",
      url: `${URLObj.base}/faculty/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
        "X-ACCESS-LEVEL": access == 2 ? "department" : "hospital",
      },
      data: formdata,
    })
      .then(res => {
        message.success("Student added successfully");
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
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Add Department</h1>

      <Form
        form={form}
        style={{ width: "80vw", padding: "0 10vw" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={
          access === 2
            ? {
                department: user?.department,
                access_level: 1,
              }
            : {}
        }
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
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: "Please input your department!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Access Level"
          name="access_level"
          rules={[{ required: true, message: "Please input access level!" }]}
        >
          <Select
            showSearch
            placeholder="Choose access level"
            allowClear
            options={["Individual", "Department", "Institute"].map(
              (item, index) => {
                return { value: index + 1, label: item };
              }
            )}
          />
        </Form.Item>

        {/* <Form.Item
                    label="Mobile"
                    name="mobile"
                    rules={[
                      { required: true, message: "Please input mobile!" },
                    ]}
                  >
                    <Input />
                  </Form.Item> */}

        {/* <Form.Item
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
                  </Form.Item> */}

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

        <Form.Item
          label="Designation"
          name="designation"
          rules={[
            {
              required: true,
              message: "Please choose your designation!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Choose designation"
            allowClear
            options={[
              "Professor Emeritus",
              "Professor and HOD",
              "Professor",
              "Associate Professor",
              "Assistant Professor",
              "Senior Resident/Tutor/Registrar",
            ].map((item, index) => {
              return { value: index + 1, label: item };
            })}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item> */}

        <Form.Item>
          <Button className={styles.primary} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className={styles.secondary} type="primary" htmlType="reset">
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const EditDepartmentInfo = () => {
  // HOOKS

  const router = useRouter();
  const [form] = Form.useForm();

  const { user } = useUser();
  const { access } = useAccess();

  // STATES

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
    const AGE = Math.floor(
      (new Date() - new Date(values.age).getTime()) / 3.15576e10
    );

    const formdata = new FormData();
    // formdata?.append("organisation_name", values?.org_name);
    // formdata?.append("organisation_domain", values?.org_domain);
    formdata?.append("first_name", values?.first_name);
    formdata?.append("middle_name", values?.middle_name);
    formdata?.append("last_name", values?.last_name);
    formdata?.append("age", Math.max(0, AGE));
    formdata?.append("department", values?.department);
    formdata?.append("access_level", values?.access_level);
    // formdata?.append("mobile", values?.mobile);
    // formdata?.append("gender", values?.gender);
    formdata?.append("profile_picture", file);
    formdata?.append("designation", values?.designation);
    formdata?.append("email", values?.email);
    // formdata?.append("username", values?.username);

    axios({
      method: "POST",
      url: `${URLObj.base}/faculty/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
        "X-ACCESS-LEVEL": access == 2 ? "department" : "hospital",
      },
      data: formdata,
    })
      .then(res => {
        message.success("Student added successfully");
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
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Edit Department</h1>

      <Form
        form={form}
        style={{ width: "80vw", padding: "0 10vw" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={
          access === 2
            ? {
                department: user?.department,
                access_level: 1,
              }
            : {}
        }
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
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: "Please input your department!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Access Level"
          name="access_level"
          rules={[{ required: true, message: "Please input access level!" }]}
        >
          <Select
            showSearch
            placeholder="Choose access level"
            allowClear
            options={["Individual", "Department", "Institute"].map(
              (item, index) => {
                return { value: index + 1, label: item };
              }
            )}
          />
        </Form.Item>

        {/* <Form.Item
                    label="Mobile"
                    name="mobile"
                    rules={[
                      { required: true, message: "Please input mobile!" },
                    ]}
                  >
                    <Input />
                  </Form.Item> */}

        {/* <Form.Item
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
                  </Form.Item> */}

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

        <Form.Item
          label="Designation"
          name="designation"
          rules={[
            {
              required: true,
              message: "Please choose your designation!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Choose designation"
            allowClear
            options={[
              "Professor Emeritus",
              "Professor and HOD",
              "Professor",
              "Associate Professor",
              "Assistant Professor",
              "Senior Resident/Tutor/Registrar",
            ].map((item, index) => {
              return { value: index + 1, label: item };
            })}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item> */}

        <Form.Item>
          <Button className={styles.primary} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className={styles.secondary} type="primary" htmlType="reset">
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { AddDepartmentInfo, EditDepartmentInfo };
