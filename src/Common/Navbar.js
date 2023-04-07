import React, { useContext } from "react";
import { AppstoreAddOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import styles from "../../styles/navbar.module.css";
import { UserContext } from "../userContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

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
        <Link className={styles.logout} href="/">
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
        <Link href={user.role === "management" ? "/management" : "/profile"}>
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
