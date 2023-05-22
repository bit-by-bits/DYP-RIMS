import React, { useEffect, useState } from "react";
import { Menu, message } from "antd";
import Link from "next/link";
import styles from "../../styles/common.module.css";
import {
  AppstoreAddOutlined,
  DownloadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const download = () => message.error("CV functionality is still unavailable");

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
          label: <Link href="/upload">Add Publication</Link>,
          key: "upload",
        },
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
      children: [],
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
          style={{
            backgroundColor: "transparent",
            color: "white",
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
