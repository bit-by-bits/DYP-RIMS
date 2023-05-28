import { Button, Menu, message } from "antd";
import React, { createElement } from "react";
import {
  HomeOutlined,
  ProjectOutlined,
  DownloadOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/profile.module.css";

const Side = ({ user }) => {
  // STATES

  // EFFECTS

  // FUNCTIONS

  const edit = () => {
    message.error("This feature is not available yet");
  };

  return (
    <div className={styles.sideWrapper}>
      <div className={styles.sideProfile}>
        <Image
          priority={true}
          className={styles.sideImage}
          alt={user?.user?.username ?? "user"}
          src={
            user?.profile_picture ??
            "https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png"
          }
          width={100}
          height={100}
        />
        <div>
          {user?.user
            ? user?.user?.first_name + " " + user?.user?.last_name
            : "N/A"}
        </div>
        <div>{user?.email}</div>
        <div className={styles.sideContent}>
          <div>
            <span className={styles.sideCircle} />
            <span>{user?.designation ?? "N/A"}</span>
          </div>
          <div>
            <span className={styles.sideCircle} />
            <span>
              {user?.access_level
                ? user?.access_level[0]?.display_text ?? "N/A"
                : "N/A"}
            </span>
          </div>
        </div>
        <Button className={styles.sideButton} onClick={edit} type="primary">
          Edit Profile
        </Button>
      </div>

      <Menu
        mode="inline"
        className="sideMenu"
        defaultSelectedKeys={["1"]}
        items={[
          { link: "/profile", icon: HomeOutlined, label: "Home" },
          { link: "/upload", icon: ProjectOutlined, label: "Add Research" },
          { link: "/downloads", icon: DownloadOutlined, label: "Downloads" },
          { link: "/profile", icon: ProfileOutlined, label: "Profile" },
        ].map((item, index) => ({
          key: String(index + 1),
          icon: createElement(item.icon),
          label: (
            <Link
              href={item.link}
              style={{ fontWeight: "bold", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ),
        }))}
      />
    </div>
  );
};

export default Side;
