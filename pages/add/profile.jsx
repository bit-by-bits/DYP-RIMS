import { Form, Tabs } from "antd";
import styles from "../../src/styles/add.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Side from "../../src/components/Common/Side";
import Top from "../../src/components/Common/Top";
import Spinner from "../../src/components/Common/Spinner";
import AllowPage from "../../src/components/Common/AllowPage";
import {
  AddFacultyInfo,
  EditFacultyInfo,
} from "../../src/components/Add/FacultyInfo";

const Faculty = () => {
  // HOOKS

  const [form] = Form.useForm();

  // STATES

  const [visible, setVisible] = useState(true);

  // EFFECTS

  useEffect(() => {
    setTimeout(() => setVisible(false), 1200);
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [visible, form]);

  // FUNCTIONS

  return (
    <AllowPage accesses={[2]}>
      <Head>
        <title>DYPU RIMS | Add Faculty</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spinner show={visible} />

        <div style={{ paddingLeft: "20vw" }}>
          <Side />

          <div className={styles.container}>
            <Top />

            <Tabs
              defaultActiveKey="1"
              centered
              items={[
                {
                  key: "1",
                  label: "Add Faculty",
                  children: <AddFacultyInfo />,
                },
                {
                  key: "2",
                  label: "Edit Faculty",
                  children: <EditFacultyInfo />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </AllowPage>
  );
};

export default Faculty;
