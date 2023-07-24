import { Button, Menu, Popconfirm, Skeleton, message } from "antd";
import { createElement, useState, useEffect } from "react";
import { BookOutlined, TrophyOutlined } from "@ant-design/icons";
import { UserAddOutlined } from "@ant-design/icons";
import { HomeOutlined, BulbOutlined, MessageOutlined } from "@ant-design/icons";
import { DownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import { ProjectOutlined, FileAddOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/profile.module.css";
import { useAccess } from "../context/accessContext";
import { useUser } from "../context/userContext";
import { useWindowSize } from "rooks";
import axios from "axios";
import URLObj from "../baseURL";
import { useRouter } from "next/router";

const Side = ({ sets = () => {} }) => {
  // HOOKS

  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const { user, change: setU } = useUser();
  const { access, change: setA } = useAccess();

  // DATA

  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [prev, setPrev] = useState(null);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrev(localStorage.getItem("prev"));
    }

    return () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("prev");
      }
    };
  }, []);

  // FUNCTIONS

  const switchUser = (token, to) => {
    axios({
      method: "GET",
      url: `${URLObj.base}/home`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": token,
      },
    })
      .then(resp => {
        const DATA = resp.data?.user;
        const LEVEL = DATA?.access_level?.find(e =>
          e.id === (to === 1)
            ? 1
            : Math.max(...DATA?.access_level?.map(e => e.id))
        );

        setA(1);
        setU({
          token: token,
          setUpTime: Date.now(),
          username: DATA?.username,
          name: DATA?.user?.first_name + " " + DATA?.user?.last_name,
          email: DATA?.user?.email,
          picture: DATA?.profile_picture,
          gender: DATA?.gender,
          designation: DATA?.designation,
          department: DATA?.department?.name,
          level: LEVEL?.display_text,
          max_access: LEVEL?.id,
          access: 1,
        });

        message.success("Login Successful");
        router.push("/profile");
      })
      .catch(err => {
        console.log(err);
        message.error("Login Failed");
      });
  };

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
        key: `3.${i}`,
        label: `${e.label} (${e.children?.length})`,
        children: e.children.map((child, index) => ({
          key: `3.${i}.${index}`,
          label: (
            <Popconfirm
              title="Switch levels"
              description="Do you want to switch to this profile?"
              onConfirm={() => {
                localStorage.setItem(
                  "prev",
                  JSON.stringify({ token: user?.token })
                );

                axios({
                  method: "PUT",
                  url: `${URLObj.base}/faculty/?id=${child[0]}`,
                  headers: {
                    "X-ACCESS-KEY": URLObj.key,
                    "X-AUTH-TOKEN": user?.token,
                    "X-ACCESS-LEVEL": "department",
                  },
                })
                  .then(res => {
                    const TOKEN = res.data?.token;
                    switchUser(TOKEN, 1);
                  })
                  .catch(err => {
                    console.log(err);
                    message.error("Login Failed");
                  });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              {child[1]}
            </Popconfirm>
          ),
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
            {access > 1 ? (
              <Button className={styles.sideButton} type="primary">
                <Link href="/add/profile">
                  {innerWidth > 1600 ? "Add/Edit Faculty" : "Add Faculty"}
                </Link>
              </Button>
            ) : (
              prev && (
                <Button
                  onClick={() => switchUser(JSON.parse(prev)?.token, 2)}
                  className={styles.sideButton}
                  type="primary"
                >
                  Return Back
                </Button>
              )
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
          { link: null, icon: FileAddOutlined, label: "Add Research" },
          { link: null, icon: UserAddOutlined, label: "Faculty" },
        ]
          ?.filter((_, i) => (access > 1 ? true : i < 3))
          ?.map((item, index) => {
            const ITEM = {
              key: `${index}`,
              icon: createElement(item.icon),
            };

            return item?.link
              ? {
                  ...ITEM,
                  label: <Link href={item.link}>{item.label}</Link>,
                }
              : {
                  ...ITEM,
                  children: index == 2 ? first : second,
                  label: item.label,
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
