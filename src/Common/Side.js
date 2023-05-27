import { Menu } from "antd";
import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
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
          alt={user.user.username ?? "user"}
          src={
            user.profile_picture ??
            "https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png"
          }
          width={100}
          height={100}
        />
        <div style={{ color: "white" }}>
          {user.first_name + " " + user.last_name}
        </div>
        <div style={{ color: "white" }}>{user.email}</div>
        <div></div>
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
          { link: "profile", icon: UserOutlined, label: "Home" },
          { link: "profile", icon: VideoCameraOutlined, label: "Add Research" },
          { link: "profile", icon: UploadOutlined, label: "Downloads" },
          { link: "profile", icon: UserOutlined, label: "Profile" },
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
