import {
  Button,
  FloatButton,
  Menu,
  Popconfirm,
  Skeleton,
  Tooltip,
  message,
} from "antd";
import { createElement, useState, useEffect } from "react";
import {
  BookOutlined,
  DeleteOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { UpCircleOutlined, UserAddOutlined } from "@ant-design/icons";
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

const Side = () => {
  // HOOKS

  const { BackTop } = FloatButton;

  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const { user, change: setU } = useUser();
  const { access, change: setA } = useAccess();

  const { useMessage } = message;
  const [messageApi, contextHolder] = useMessage();

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
          "X-ACCESS-LEVEL": access == 2 ? "department" : "hospital",
        },
      })
        .then(res => setFaculty(res.data?.faculty))
        .catch(err => console.log(err));
    }
  }, [access, user]);

  useEffect(() => {
    if (faculty) setMenuData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faculty]);

  useEffect(() => {
    if (typeof window !== "undefined") setPrev(localStorage.getItem("prev"));
  }, []);

  // FUNCTIONS

  const switchUser = (token, to) => {
    axios({
      method: "GET",
      url: `${URLObj.base}/home`,
      headers: { "X-ACCESS-KEY": URLObj.key, "X-AUTH-TOKEN": token },
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

        messageApi.open({
          key: "login",
          type: "success",
          content: "Login Successful",
          duration: 4,
        });

        router.push("/profile");
      })
      .catch(err => {
        console.log(err);

        messageApi.open({
          key: "login",
          type: "error",
          content: "Login Failed",
          duration: 2,
        });
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
          styles: { maxWidth: "200px" },
          label: (
            <Popconfirm
              title="Switch levels"
              description="Do you want to switch to this profile?"
              onConfirm={() => {
                const str = JSON.stringify({ token: user?.token });

                setPrev(str);
                localStorage.setItem("prev", str);

                messageApi.open({
                  key: "login",
                  type: "loading",
                  content: "Please wait while we log you in",
                  duration: 100,
                });

                axios({
                  method: "PUT",
                  url: `${URLObj.base}/faculty/?id=${child[0]}`,
                  headers: {
                    "X-ACCESS-KEY": URLObj.key,
                    "X-AUTH-TOKEN": user?.token,
                    "X-ACCESS-LEVEL": access == 2 ? "department" : "hospital",
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
              <Tooltip
                placement="bottom"
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>{child[1]}</span>
                    <DeleteOutlined
                      style={{ cursor: "pointer", marginLeft: 5 }}
                      onClick={() => {
                        message.error("Not implemented yet");
                      }}
                    />
                  </div>
                }
              >
                {child[1]}
              </Tooltip>
            </Popconfirm>
          ),
        })),
      }))
    );
  };

  return (
    <div className={styles.sideWrapper}>
      {contextHolder}

      <Skeleton loading={!user?.name} active paragraph={{ rows: 10 }}>
        <div className={styles.sideProfile}>
          <Image
            priority={true}
            className={styles.sideImage}
            alt={user?.username ?? "you"}
            src={user?.picture ?? URLObj.dummy}
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
            {access == 1 ? (
              prev && (
                <Button
                  onClick={() => {
                    messageApi.open({
                      key: "login",
                      type: "loading",
                      content: "Please wait while we take you back",
                      duration: 100,
                    });

                    switchUser(JSON.parse(prev)?.token, 2);
                    setPrev(null);
                    localStorage.removeItem("prev");
                  }}
                  className={styles.sideButton}
                  type="primary"
                >
                  Return Back
                </Button>
              )
            ) : (
              <Button className={styles.sideButton} type="primary">
                {access == 2 ? (
                  <Link href="/add/profile">Add/Edit Faculty</Link>
                ) : (
                  <Link href="/add/department">
                    {innerWidth > 1600
                      ? "Add/Edit Department"
                      : "Add/Edit Dept"}
                  </Link>
                )}
              </Button>
            )}
          </div>
        </div>
      </Skeleton>
      <Menu
        mode="inline"
        className="sideMenu"
        selectable={false}
        items={[
          { link: "/profile", icon: HomeOutlined, label: "Home" },
          { link: "/downloads", icon: DownloadOutlined, label: "Downloads" },
          { link: null, icon: FileAddOutlined, label: "Add Research" },
          { link: null, icon: UserAddOutlined, label: "Faculty" },
        ]
          ?.filter((_, i) => (access > 1 ? true : i < 3))
          ?.map((item, index) => {
            if (index == 2 && access > 1) return null;

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
        items={[
          {
            link: "publications",
            icon: FileTextOutlined,
            label: "Publications",
          },
          {
            link: "conferences",
            icon: MessageOutlined,
            label: "Conferences",
          },
          {
            link: "books",
            icon: BookOutlined,
            label: "Books/Chapters",
          },
          {
            link: "projects",
            icon: ProjectOutlined,
            label: "Research Projects",
          },
          {
            link: "awards",
            icon: TrophyOutlined,
            label: "Awards",
          },
          {
            link: "ipr",
            icon: BulbOutlined,
            label: "IPR",
          },
          {
            link: "students",
            icon: UserAddOutlined,
            label: "Students Guided",
          },
        ].map((item, index) => ({
          key: String(index + 1),
          icon: createElement(item.icon),
          label: <Link href={`/profile#${item.link}`}>{item.label}</Link>,
        }))}
      />
      <BackTop
        icon={<UpCircleOutlined />}
        style={{ left: 30, bottom: 30, borderRadius: "50%" }}
      />
    </div>
  );
};

export default Side;
