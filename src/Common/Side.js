import { Button, Menu, message } from "antd";
import React, { useState, useEffect, createElement } from "react";
import {
  HomeOutlined,
  ProjectOutlined,
  DownloadOutlined,
  TrophyOutlined,
  GroupOutlined,
  BookOutlined,
  BulbOutlined,
  UserAddOutlined,
  FileTextOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/profile.module.css";
import { useRouter } from "next/router";

const Side = ({ sets = () => {} }) => {
  // BOILERPLATE

  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    setTimeout(() => getUser(), 1001);
    setTimeout(() => getUser(), 5001);
    setTimeout(() => getUser(), 9999);
  }, []);

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  };

  useEffect(() => {
    if (typeof window !== "undefined")
      user
        ? Date.now() - user?.setUpTime > 86400000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  // STATES

  // EFFECTS

  // FUNCTIONS

  const edit = () => {
    router.push("/profile/edit");
  };

  return (
    <div className={styles.sideWrapper}>
      <div className={styles.sideProfile}>
        <Image
          priority={true}
          className={styles.sideImage}
          alt={user?.userame ?? "user"}
          src={
            user?.picture ??
            "https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png"
          }
          width={100}
          height={100}
        />

        <div className={styles.sideName}>
          {user?.name?.toUpperCase() ?? "N/A"}
        </div>

        <div className={styles.sideEmail}>{user?.email}</div>

        <div className={styles.sideContent}>
          <div>
            <span className={styles.sideCircle} />
            <span>{user?.designation ?? "N/A"}</span>
          </div>
          <div>
            <span className={styles.sideCircle} />
            <span>{user?.level?.slice(0, -1) ?? "N/A"}</span>
          </div>
        </div>

        <div className={styles.sideEmail}>{user?.department}</div>

        <Button className={styles.sideButton} onClick={edit} type="primary">
          Edit Profile
        </Button>
      </div>

      <Menu
        mode="inline"
        className="sideMenu"
        selectable={false}
        onClick={() => sets("all")}
        items={[
          { link: "/profile", icon: HomeOutlined, label: "Home" },
          { link: null, icon: FileAddOutlined, label: "Add Research" },
          { link: "/downloads", icon: DownloadOutlined, label: "Downloads" },
        ].map((item, index) => ({
          key: String(index + 1),
          icon: createElement(item.icon),
          children:
            index != "1"
              ? null
              : [
                  {
                    key: "1.1",
                    icon: createElement(FileTextOutlined),
                    label: <Link href="/upload">Add Publication</Link>,
                  },
                  {
                    key: "1.2",
                    icon: createElement(GroupOutlined),
                    label: <Link href="/add/conference">Add Conference</Link>,
                  },
                  {
                    key: "1.3",
                    icon: createElement(BookOutlined),
                    label: <Link href="/add/book">Add Book/Chapter</Link>,
                  },
                  {
                    key: "1.4",
                    icon: createElement(ProjectOutlined),
                    label: <Link href="/add/project">Add Project</Link>,
                  },
                  {
                    key: "1.5",
                    icon: createElement(TrophyOutlined),
                    label: <Link href="/add/award">Add Award</Link>,
                  },
                  {
                    key: "1.6",
                    icon: createElement(BulbOutlined),
                    label: <Link href="/add/ipr">Add IPR</Link>,
                  },
                  {
                    key: "1.7",
                    icon: createElement(UserAddOutlined),
                    label: <Link href="/add/student">Add Student</Link>,
                  },
                ],

          label: item.link ? (
            <Link href={item.link}>{item.label}</Link>
          ) : (
            item.label
          ),
        }))}
      />

      <Menu
        mode="inline"
        className="sideMenu"
        selectable={false}
        onClick={() => sets("all")}
        items={[
          {
            link: "/profile#publications",
            icon: FileTextOutlined,
            label: "Publications",
          },
          {
            link: "/profile#conferences",
            icon: GroupOutlined,
            label: "Conferences",
          },
          {
            link: "/profile#books",
            icon: BookOutlined,
            label: "Books/Chapters",
          },
          {
            link: "/profile#projects",
            icon: ProjectOutlined,
            label: "Research Projects",
          },
          {
            link: "/profile#awards",
            icon: TrophyOutlined,
            label: "Awards",
          },
          {
            link: "/profile#ipr",
            icon: BulbOutlined,
            label: "IPR",
          },
          {
            link: "/profile#students",
            icon: UserAddOutlined,
            label: "Students Guided",
          },
        ].map((item, index) => ({
          key: String(index + 1),
          icon: createElement(item.icon),
          label: <Link href={item.link}>{item.label}</Link>,
        }))}
      />
    </div>
  );
};

export default Side;
