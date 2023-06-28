import React, { useState, useEffect, Fragment, createElement } from "react";
import styles from "../../styles/profile.module.css";
import router from "next/router";
import axios from "axios";
import { useDebounce } from "rooks";
import URLObj from "../baseURL";
import { AutoComplete, Button, Input, message, Typography } from "antd";
import {
  BellOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Drop from "./Drop";
import Altmetric from "../Profile/Altmetric";
import Scite from "../Profile/Scite";

import medline from "../../../public/logos/medline.jpg";
import doaj from "../../../public/logos/doaj.png";
import pmc from "../../../public/logos/pmc.png";
import scopus from "../../../public/logos/scopus.svg";
import wos from "../../../public/logos/wos.svg";
import { useUser } from "../context/userContext";

const Top = ({ main = {} }) => {
  // STATES

  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);

  // HOOKS

  const { Search } = Input;
  const { Paragraph } = Typography;
  const { user, change } = useUser();
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

      if (e) {
        main?.setPublications({
          title: main?.publications?.title,
          body: publicationsMaker(
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
          ),
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
        main?.setPublications({
          title: main?.publications?.title,
          body: publicationsMaker(data),
        });

        main?.setSections("all");
      }
    } else {
      localStorage.setItem("search", JSON.stringify({ query: e }));

      router.push("/profile");
    }
  };

  const publicationsMaker = arr =>
    arr?.map((e, i) => ({
      key: `${i + 1}.`,
      publication: (
        <div className={styles.publication}>
          <div className={styles.publicationTitle}>{e.publication_title}</div>
          <Paragraph
            className={styles.publicationAuthors}
            ellipsis={{
              rows: 3,
              expandable: true,
              symbol: "more",
            }}
          >
            {e.author_name?.map((e, i) =>
              e?.user ? (
                <span key={`first-${i}`}>
                  {e?.user?.first_name + " " + e?.user?.last_name}
                  <sup>1</sup>
                  <span>, </span>
                </span>
              ) : null
            )}
            {e.corresponding_authors?.map(e =>
              e?.user ? (
                <span key={`corresponding-${e.id}`}>
                  {e?.user?.first_name + " " + e?.user?.last_name}
                  <sup>*</sup>
                  <span>, </span>
                </span>
              ) : null
            )}
            {e.other_authors?.map(e => e).join(", ")}
          </Paragraph>
          <div className={styles.publicationJournal}>{e.journal_name}</div>
          <div
            className={styles.publicationStats}
          >{`Volume: ${e.volume} • Issue: ${e.issue} • Pages: ${e.pages}`}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Scite DOI={e.doi_id} type={1} />
            <Altmetric DOI={e.doi_id} type={1} />
          </div>
        </div>
      ),
      impact_factor: e.impact_factor,
      sjr: e.sjr_quartile,
      h_index: e.h_index,
      index: [
        {
          name: "PubMed",
          bool: e.in_pmc,
        },
        {
          name: "Scopus",
          bool: e.in_scopus,
        },
        {
          name: "DOAJ",
          bool: e.in_doaj,
        },
        {
          name: "WOS",
          bool: e.in_wos,
        },
        {
          name: "Medline",
          bool: e.in_medline,
        },
      ]
        .filter(e => e.bool)
        .map(e => e.name),
      indexed_in: (
        <div className={styles.publicationGrid}>
          {[
            {
              name: "PubMed",
              logo: pmc,
              bool: e.in_pmc,
            },
            {
              name: "Scopus",
              logo: scopus,
              bool: e.in_scopus,
            },
            {
              name: "DOAJ",
              logo: doaj,
              bool: e.in_doaj,
            },
            {
              name: "WOS",
              logo: wos,
              bool: e.in_wos,
            },
            {
              name: "Medline",
              logo: medline,
              bool: e.in_medline,
            },
          ]
            .filter(e => e.bool)
            .map(e => (
              <Fragment key={e.name}>
                <Image src={e.logo} alt={e.name} height={30} width={30} />
                {e.name}
              </Fragment>
            ))}
        </div>
      ),
      citations: {
        total: e.citations_total,
        crossref: e.citations_crossref,
        scopus: e.citations_scopus,
        wos: e.citations_wos,
      },
      published: e.year,
      action: (
        <Button
          type="primary"
          icon={<FileTextOutlined />}
          style={innerWidth > 1400 ? { padding: "2px 10px" } : {}}
          className={styles.tableButton}
          onClick={() => router.push(`/file/${e.doi_id}`)}
        >
          {innerWidth > 1400 ? "View More" : null}
        </Button>
      ),
    }));

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
          className={styles.topInput}
          placeholder="Search for research within RIMS using title or keywords"
          onSearch={e => searchPubs(e, data)}
          onChange={e => debouncedQuery(e.target.value)}
          allowClear
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
