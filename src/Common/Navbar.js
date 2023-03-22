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
          label: "Publications",
          children: [
            {
              label: <Link href="/upload">Publications</Link>,
              key: "upload",
            },
          ],
        },
        {
          type: "group",
          label: "Others",
          children: [
            {
              label: <Link href="/add/conference">Conferences</Link>,
              key: "conference",
            },
            {
              label: <Link href="/add/poster">Poster Presentations</Link>,
              key: "poster",
            },
            {
              label: <Link href="/add/paper">Paper Presentations</Link>,
              key: "paper",
            },
            {
              label: <Link href="/add/project">Research Projects</Link>,
              key: "project",
            },
            {
              label: <Link href="/add/award">Awards</Link>,
              key: "award",
            },
            {
              label: <Link href="/add/ipr">IPR</Link>,
              key: "ipr",
            },
            {
              label: <Link href="/add/book">Books/Chapters</Link>,
              key: "book",
            },
            {
              label: <Link href="/add/student">Students Guided</Link>,
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
