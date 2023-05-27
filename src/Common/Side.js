import { Button, Menu } from "antd";
import React from "react";
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
  return (
    <div
      style={{
        width: "20vw",
        height: "100vh",
        backgroundColor: "#9A2827",
        borderRadius: 15,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          className={styles.profile_image}
          alt={user?.user?.username ?? "user"}
          src={
            user?.profile_picture ??
            "https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png"
          }
          width={100}
          height={100}
        />
        <div style={{ color: "white" }}>
          {user?.first_name + " " + user?.last_name}
        </div>
        <div style={{ color: "white" }}>{user?.email}</div>
        <div>
          <div>{user?.designation ?? "N/A"}</div>
          <div>
            {user?.access_level
              ? user?.access_level[0]?.display_text ?? "N/A"
              : "N/A"}
          </div>
        </div>
        <Button type="primary" style={{ marginTop: 10 }}>
          Edit Profile
        </Button>
      </div>

      <Menu
        mode="inline"
        style={{
          backgroundColor: "#9A2827",
          color: "white",
          border: "none",
          padding: 10,
        }}
        defaultSelectedKeys={["1"]}
        items={[
          { link: "/profile", icon: HomeOutlined, label: "Home" },
          { link: "/upload", icon: ProjectOutlined, label: "Add Research" },
          { link: "/downloads", icon: DownloadOutlined, label: "Downloads" },
          { link: "/profile", icon: ProfileOutlined, label: "Profile" },
        ].map((item, index) => ({
          key: String(index + 1),
          icon: React.createElement(item.icon),
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
