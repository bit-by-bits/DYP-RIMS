import { Button, Menu, Skeleton } from "antd";
import { createElement, useState, useEffect } from "react";
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
import axios from "axios";
import URLObj from "../baseURL";

const Side = ({ sets = () => {} }) => {
  // HOOKS

  const router = useRouter();

  const { user } = useUser();
  const { access } = useAccess();

  // DATA

  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [faculty, setFaculty] = useState([]);

  // EFFECTS

  useEffect(() => {
    if (user?.token) {
      setFirst(
        [
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
        }))
      );

      axios({
        method: "GET",
        url: `${URLObj.base}/faculty/`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
          "X-ACCESS-LEVEL": "department",
        },
      })
        .then(res => setFaculty(res.data?.faculty))
        .catch(err => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (faculty) {
      setMenuData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faculty]);

  // FUNCTIONS

  const setMenuData = () => {
    let DATA_SECOND = [];
    Object.entries(faculty)?.forEach(([key, value]) => {
      DATA_SECOND.push({
        label: key,
        children: value.map(e => [
          e.id,
          e.user.first_name + " " + e.user.last_name,
        ]),
      });
    });

    setSecond(
      DATA_SECOND.map((e, i) => ({
        key: `2.${i}`,
        label: `${e.label} (${e.children?.length})`,
        children: e.children.map((child, index) => ({
          key: `2.${i}.${index}`,
          label: <Link href={`/profile/${child[0]}`}>{child[1]}</Link>,
        })),
      }))
    );
  };

  return (
    <div className={styles.sideWrapper}>
      <Skeleton loading={!user?.name} active paragraph={{ rows: 10 }}>
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

          <div className={styles.sideButtons}>
            <Button className={styles.sideButton} type="primary">
              <Link href="/profile/edit">Edit Profile</Link>
            </Button>
            {access > 1 && (
              <Button className={styles.sideButton} type="primary">
                <Link href="/add/faculty">Add Faculty</Link>
              </Button>
            )}
          </div>
        </div>
      </Skeleton>

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
                children: access == 1 ? first : second,
                label: item.label,
              }
            : {
                ...ITEM,
                label: <Link href={item.link}>{item.label}</Link>,
              };
        })}
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
    </div>
  );
};

export default Side;
