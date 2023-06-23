import { Button, Menu, Spin } from "antd";
import React, { createElement } from "react";
import {
  HomeOutlined,
  ProjectOutlined,
  DownloadOutlined,
  TrophyOutlined,
  MessageOutlined,
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
import { useAccess } from "../context/accessContext";
import { useUser } from "../context/userContext";

const Side = ({ sets = () => {} }) => {
  // HOOKS

  const router = useRouter();
  const { user } = useUser();
  const { access } = useAccess();

  // FUNCTIONS

  const edit = () => {
    router.push("/profile/edit");
  };

  // DATA STORE

  const FIRST = [
    {
      icon: FileTextOutlined,
      link: "/upload",
      label: "Add Publication",
    },
    {
      icon: MessageOutlined,
      link: "/add/conference",
      label: "Add Conference",
    },
    {
      icon: BookOutlined,
      link: "/add/book",
      label: "Add Book/Chapter",
    },
    {
      icon: ProjectOutlined,
      link: "/add/project",
      label: "Add Project",
    },
    {
      icon: TrophyOutlined,
      link: "/add/award",
      label: "Add Award",
    },
    {
      icon: BulbOutlined,
      link: "/add/ipr",
      label: "Add IPR",
    },
    {
      icon: UserAddOutlined,
      link: "/add/student",
      label: "Add Student",
    },
  ].map((e, i) => ({
    key: `2.${i}`,
    icon: createElement(e.icon),
    label: <Link href={e.link}>{e.label}</Link>,
  }));

  const SECOND = [
    {
      label: "Professor",
      children: ["1", "2"],
    },
    {
      label: "Associate Professor",
      children: ["1", "2"],
    },
    {
      label: "Assistant professor",
      children: ["1", "2"],
    },
    {
      label: "Senior Resident/Registrar",
      children: ["1", "2"],
    },
  ].map((e, i) => ({
    key: `2.${i}`,
    label: `(${e.children.length}) ${e.label}`,
    children: e.children.map((child, index) => ({
      key: `2.${i}.${index}`,
      label: `${e.label} ${child}`,
    })),
  }));

  return (
    <div className={styles.sideWrapper}>
      <Spin
        style={{
          width: "18vw",
          height: "max-content",
          backgroundColor: "rgba(256, 256, 256, 0.8)",
        }}
        spinning={user?.name ? false : true}
        tip="FETCHING PROFILE"
      >
        <div className={styles.sideProfile}>
          <Image
            priority={true}
            className={styles.sideImage}
            alt={user?.username ?? "user"}
            src={
              user?.picture ??
              `https://xsgames.co/randomusers/avatar.php?g=${user?.gender?.toLowerCase()}`
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
              <span>{user?.level ?? "N/A"}</span>
            </div>
          </div>

          <div className={styles.sideEmail}>{user?.department}</div>

          <Button className={styles.sideButton} onClick={edit} type="primary">
            Edit Profile
          </Button>
        </div>
      </Spin>

      <Menu
        mode="inline"
        className="sideMenu"
        selectable={false}
        onClick={() => sets("all")}
        items={[
          { link: "/profile", icon: HomeOutlined, label: "Home" },
          { link: "/downloads", icon: DownloadOutlined, label: "Downloads" },
          {
            icon: access == 1 ? FileAddOutlined : UserAddOutlined,
            label: access == 1 ? "Add Research" : "Faculty",
          },
        ].map((item, index) => {
          const ITEM = {
            key: `${index}`,
            icon: createElement(item.icon),
          };

          return index == 2
            ? {
                ...ITEM,
                children: access == 1 ? FIRST : SECOND,
                label: item.label,
              }
            : {
                ...ITEM,
                label: <Link href={item.link}>{item.label}</Link>,
              };
        })}
      />

      {access == 1 && (
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
              icon: MessageOutlined,
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
      )}
    </div>
  );
};

export default Side;
