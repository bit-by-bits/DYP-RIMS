import React, { useState, useEffect, createElement } from "react";
import styles from "../../styles/profile.module.css";
import router from "next/router";
import axios from "axios";
import { useDebounce } from "rooks";
import URLObj from "../baseURL";
import { AutoComplete, Button, Input, message, Typography } from "antd";
import { BellOutlined, LogoutOutlined } from "@ant-design/icons";
import Drop from "./Drop";
import { useUser } from "../context/userContext";
import usePubSetter from "../../utils/dataSetters/usePubSetter";

const Top = ({ main = {} }) => {
  // STATES

  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);

  // HOOKS

  const { Search } = Input;
  const { user, change } = useUser();
  const { pubData } = usePubSetter();
  const debouncedQuery = useDebounce(setQuery, 1000);

  // EFFECTS

  useEffect(() => {
    if (user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/publications/`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      })
        .then(res => {
          setData(res.data?.data);

          const SEARCH = localStorage.getItem("search");
          if (SEARCH && JSON.parse(SEARCH)) {
            searchPubs(JSON.parse(SEARCH)?.query, res.data?.data);
            localStorage.removeItem("search");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // FUNCTIONS

  const openNotifications = () => {
    message.error("Notifications are not available yet!");
  };

  const getHistory = () => {
    if (user?.token) {
      axios({
        method: "GET",
        url: `${URLObj.base}/search/`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      })
        .then(res => setHistory(res.data?.history?.map(e => e?.search_query)))
        .catch(err => console.log(err));
    }
  };

  const searchPubs = (e, data) => {
    if (main?.publications) {
      const fixString = str => str?.replaceAll(" ", "").toLowerCase();

      if (e && e?.trim() != "") {
        const { TITLE, BODY } = pubData(
          data?.filter(p => {
            const keywords = [
              ...p.keywords?.map(k => fixString(k.display_name)),
              fixString(p.publication_title),
            ];

            const currQuery = fixString(e);

            return (
              keywords?.includes(currQuery) ||
              keywords?.includes(currQuery.slice(0, -1)) ||
              keywords?.some(k => k?.includes(currQuery)) ||
              keywords?.some(k => k?.includes(currQuery.slice(0, -1)))
            );
          })
        );

        main?.setPublications({
          ...main?.publications,
          body: BODY,
        });

        let formdata = new FormData();
        formdata?.append("query", e);

        axios({
          method: "POST",
          url: `${URLObj.base}/search/`,
          headers: {
            "X-ACCESS-KEY": URLObj.key,
            "X-AUTH-TOKEN": user?.token,
          },
          data: formdata,
        });

        main?.setSections("publications");
      } else {
        const { TITLE, BODY } = pubData(data);

        main?.setPublications({
          ...main?.publications,
          body: BODY,
        });

        main?.setSections("all");
      }
    } else {
      localStorage.setItem("search", JSON.stringify({ query: e }));

      router.push("/profile");
    }
  };

  return (
    <div className={styles.top}>
      <AutoComplete
        className={styles.topInput}
        options={history?.map((e, i) => ({
          key: i,
          value: e,
          label: e,
        }))}
      >
        <Search
          allowClear
          className={styles.topInput}
          onChange={e => debouncedQuery(e.target.value)}
          placeholder="Search for research within RIMS using title or keywords"
          onSearch={e => searchPubs(e, data)}
        />
      </AutoComplete>

      <Button
        type="primary"
        className={styles.topButton}
        onClick={() => router.push("/upload")}
      >
        Add Publications
      </Button>

      {[
        {
          fxn: () => change({}),
          icon: LogoutOutlined,
        },
        {
          fxn: openNotifications,
          icon: BellOutlined,
        },
      ].map((e, i) => (
        <Button
          key={i}
          type="primary"
          className={`${styles.topButtonCircle} ${styles.topButton}`}
          onClick={e.fxn}
        >
          {createElement(e.icon)}
        </Button>
      ))}

      <Drop />
    </div>
  );
};

export default Top;
