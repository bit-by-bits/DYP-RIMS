import React, { useEffect, useState } from "react";
import { Menu, message } from "antd";
import Link from "next/link";
import styles from "../../styles/common.module.css";
import {
  AppstoreAddOutlined,
  DownloadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import axios from "axios";
import URLObj from "../baseURL";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const download = item => () => {
    const data = new FormData();
    data?.append("userID", user?.id);

    axios({
      url: `${URLObj.base}/export/schedule/${item}/`,
      method: "POST",
      data: data,
    }).then(res => {
      message.success(
        `Download in progress. Check after ${res.eta_min} minutes.`
      );

      setTimeout(() => {
        router.push(`/download/${item}`);
      }, 1000);
    });
  };

  const ITEMS = [
    {
      label: "Add Research",
      key: "SubMenu",
      icon: <AppstoreAddOutlined />,
      children: [
        {
          type: "group",
          label: "Primary",
          children: [
            {
              label: <Link href="/upload">Add Publication</Link>,
              key: "upload",
            },
          ],
        },
        {
          type: "group",
          label: "Others",
          children: [
            {
              label: <Link href="/add/award">Add Award</Link>,
              key: "award",
            },
            {
              label: <Link href="/add/ipr">Add IPR</Link>,
              key: "ipr",
            },
            {
              label: <Link href="/add/conference">Conference Attended</Link>,
              key: "conference",
            },
            {
              label: <Link href="/add/project">Add Research Project</Link>,
              key: "project",
            },
            {
              label: <Link href="/add/book">Add Book/Chapter</Link>,
              key: "book",
            },
            {
              label: <Link href="/add/student">Student Guided</Link>,
              key: "student",
            },
          ],
        },
      ],
    },
    {
      label: (
        <span onClick={download} className={styles.logout}>
          Download
        </span>
      ),
      key: "download",
      icon: <DownloadOutlined />,
      children: [
        {
          label: <div onClick={download("publication")}>Publications</div>,
          key: "upload-d",
        },
        {
          label: <div onClick={download("award")}>Awards</div>,
          key: "award-d",
        },
        {
          label: <div onClick={download("ipr")}>IPRs</div>,
          key: "ipr-d",
        },
        {
          label: <div onClick={download("conference")}>Conferences</div>,
          key: "conference-d",
        },
        {
          label: <div onClick={download("project")}>Research Projects</div>,
          key: "project-d",
        },
        {
          label: <div onClick={download("book")}>Books/Chapters</div>,
          key: "book-d",
        },
        {
          label: <div onClick={download("student")}>Students</div>,
          key: "student-d",
        },
      ],
    },
    {
      label: (
        <Link
          href="/"
          onClick={() => localStorage.clear()}
          className={styles.logout}
        >
          Logout
        </Link>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.nav_left}>
        <Link href="/profile">
          <div>Home</div>
        </Link>
      </div>

      <div className={styles.nav_right}>
        <Menu
          items={ITEMS}
          mode="horizontal"
          style={{ backgroundColor: "transparent", color: "white" }}
        />
      </div>
    </div>
  );
};

export default Navbar;
