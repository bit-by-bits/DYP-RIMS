import React from "react";
import { Avatar, Button, Col, Divider } from "antd";
import { List, Row, Typography } from "antd";
import publication from "../../../public/publication.svg";
import styles from "../../styles/profile.module.css";
import useNumber from "../../utils/useNumber";
import Image from "next/image";
import Link from "next/link";

import scopus from "../../../public/logos/scopus.svg";
import crossref from "../../../public/logos/crossref.jpg";
import wos from "../../../public/logos/wos.svg";
import URLObj from "../baseURL";

const PubItem = ({ item, index, limit, type }) => {
  const { Item } = List;
  const { Meta } = Item;

  const { number } = useNumber();
  const { Text, Paragraph } = Typography;

  return (
    <Item
      key={index}
      style={
        index === limit - 1
          ? { borderBottom: "none" }
          : { borderBottom: "1px solid #9a2827" }
      }
    >
      <Meta
        avatar={<Image height={50} width={50} alt="" src={publication.src} />}
        title={
          <>
            <div
              style={{
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              className={styles.publicationTitle}
              dangerouslySetInnerHTML={{
                __html: item?.title ?? "N/A",
              }}
            />

            <Paragraph
              className={styles.publicationAuthors}
              ellipsis={{ rows: 1 }}
            >
              <Text strong>Authors: </Text>
              {item.authors}
            </Paragraph>
          </>
        }
        description={
          <>
            <Divider style={{ backgroundColor: "#97AAB5" }} />

            {type === "pubs_citns" ? (
              <Meta
                title={<Text strong>{"Citations: "}</Text>}
                description={
                  <Row gutter={16}>
                    {[
                      {
                        label: "Crossref",
                        value: item.citations?.crossref,
                        logo: crossref,
                      },
                      {
                        label: "Scopus",
                        value: item.citations?.scopus,
                        logo: scopus,
                      },
                      {
                        label: "WOS",
                        value: item.citations?.wos,
                        logo: wos,
                      },
                    ].map((e, i) => (
                      <Col
                        key={i}
                        span={8}
                        style={{
                          gap: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src={e.logo}
                          alt={e.label}
                          height={30}
                          width={30}
                        />
                        <Text
                          style={{ color: "#9a2827", minWidth: "max-content" }}
                          strong
                        >{`${e.label}: ${number(e.value)}`}</Text>
                      </Col>
                    ))}
                  </Row>
                }
              />
            ) : (
              <Meta
                title={<Text strong>{"Statistics: "}</Text>}
                description={
                  <Row gutter={16}>
                    {[
                      {
                        label: "H-Index",
                        value: number(item.h_index),
                      },
                      {
                        label: "Impact Factor",
                        value: number(item.impact_factor).toFixed(2),
                      },
                      {
                        label: "SJR Quartile",
                        value: item.sjr,
                      },
                    ].map((e, i) => (
                      <Col
                        key={i}
                        span={8}
                        style={{
                          gap: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ height: 30 }} />
                        <Text
                          style={{ color: "#9a2827", minWidth: "max-content" }}
                          strong
                        >{`${e.label}: ${e.value}`}</Text>
                      </Col>
                    ))}
                  </Row>
                }
              />
            )}
          </>
        }
      />
    </Item>
  );
};

const AuthItem = ({ item, index, limit }) => {
  const { Item } = List;
  const { Meta } = Item;
  const { user } = item;

  return (
    <Item
      key={index}
      style={
        index === limit - 1
          ? { borderBottom: "none" }
          : { borderBottom: "1px solid #9a2827" }
      }
    >
      <Meta
        avatar={<Avatar src={item.profile_picture ?? URLObj.dummy} />}
        title={
          <Row justify="space-between">
            <div
              className={styles.publicationTitle}
              dangerouslySetInnerHTML={{
                __html: user?.first_name + " " + user?.last_name,
              }}
            />

            <Button className={styles.sectionButton} type="primary">
              <Link href={`/profile/${user?.id}`}>View Profile</Link>
            </Button>
          </Row>
        }
      />
    </Item>
  );
};

const ScrollBox = ({ title, subtitle, data, type }) => {
  const SIZE = data?.length;
  const { Text } = Typography;

  let DATA;

  if (type === "pubs_citns")
    DATA = data?.sort((a, b) => b.citations?.crossref - a.citations?.crossref);
  else if (type === "pubs_impact")
    DATA = data?.sort((a, b) => b.impact_factor - a.impact_factor);

  return (
    <>
      <Col
        style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}
      >
        <Text
          strong
          style={{ textAlign: "center", fontSize: 20, color: "#9a2827" }}
        >
          {title}
        </Text>
        <Text strong style={{ textAlign: "center", fontSize: 18 }}>
          {subtitle}
        </Text>
      </Col>

      <List
        bordered
        style={{
          borderRadius: 20,
          border: "2px solid #9a2827",
          overflow: "hidden",
        }}
        itemLayout="horizontal"
        dataSource={type === "auths" ? data : DATA}
        pagination={{ position: "bottom", align: "center", pageSize: 5 }}
        renderItem={(item, index) =>
          type === "auths" ? (
            <AuthItem item={item} index={index} limit={SIZE} />
          ) : (
            <PubItem item={item} index={index} type={type} limit={SIZE} />
          )
        }
      />
    </>
  );
};

export default ScrollBox;
