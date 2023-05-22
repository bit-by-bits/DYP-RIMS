import {
  BookOutlined,
  BulbOutlined,
  CommentOutlined,
  FileDoneOutlined,
  ProfileOutlined,
  ProjectOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TrophyOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Upload } from "antd";
import Link from "next/link";
import { useState } from "react";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const ITEMS = [
  getItem("Profile", "1", <ProfileOutlined />, [
    getItem(<Link href="/profile">User Profile</Link>, "1.1", <UserOutlined />),
    getItem(
      <Link href="/profile#awards">Awards</Link>,
      "1.2",
      <TrophyOutlined />
    ),
    getItem(
      <Link href="/profile#patents">Patents</Link>,
      "1.3",
      <SafetyCertificateOutlined />
    ),
    getItem(
      <Link href="/profile#publications">Publications</Link>,
      "1.4",
      <FileDoneOutlined />
    ),
    getItem(
      <Link href="/profile#conferences">Conferences</Link>,
      "1.5",
      <CommentOutlined />
    ),
  ]),
  {
    type: "divider",
  },
  getItem("Add More", "2", <UploadOutlined />, [
    getItem(
      <Link href="/upload">Publication</Link>,
      "2.1",
      <FileDoneOutlined />
    ),
    getItem(<Link href="/add/award">Award</Link>, "2.2", <TrophyOutlined />),
    getItem(<Link href="/add/ipr">IPR</Link>, "2.3", <BulbOutlined />),
    getItem(
      <Link href="/add/conference">Conference</Link>,
      "2.4",
      <CommentOutlined />
    ),
    getItem(
      <Link href="/add/project">Research Project</Link>,
      "2.5",
      <ProjectOutlined />
    ),
    getItem(
      <Link href="/add/book">Book/Chapter</Link>,
      "2.6",
      <BookOutlined />
    ),
    getItem(
      <Link href="/add/student">Student Guided</Link>,
      "2.7",
      <UserAddOutlined />
    ),
  ]),
];

const Side = () => {
  const KEYS = ["1", "2"];
  const [openKeys, setOpenKeys] = useState([]);

  const change = keys => {
    const lastKey = keys.find(key => openKeys.indexOf(key) === -1);

    if (KEYS.indexOf(lastKey) === -1) setOpenKeys(keys);
    else setOpenKeys(lastKey ? [lastKey] : []);
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={change}
      items={ITEMS}
      style={{
        width: 200,
        position: "fixed",
        border: "1px solid #9a2827",
        borderRadius: 5,
        bottom: 10,
        left: 10,
        zIndex: 3,
      }}
    />
  );
};

export default Side;
