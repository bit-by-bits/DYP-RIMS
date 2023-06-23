import React from "react";
import { Avatar, Button, Col, Divider, List, Row, Typography } from "antd";
import publication from "../../../public/publication.svg";
import styles from "../../styles/profile.module.css";
import Image from "next/image";
import useNumber from "../../utils/useNumber";

import crossref from "../../../public/logos/crossref.jpg";
import scopus from "../../../public/logos/scopus.svg";
import wos from "../../../public/logos/wos.svg";
import EllipsisBefore from "../Common/EllipsisBefore";

const PubItem = ({ item, index, limit }) => {
  const { Item } = List;
  const { Meta } = Item;
  const { Text, Paragraph } = Typography;

  const { number } = useNumber();

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
            <EllipsisBefore suffixCount={20}>{item.title}</EllipsisBefore>

            <Paragraph
              className={styles.publicationAuthors}
              ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
            >
              <Text strong>Authors: </Text>
              {item.authors}
            </Paragraph>
          </>
        }
        description={
          <>
            <Divider style={{ backgroundColor: "#97AAB5" }} />

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
                      <Text style={{ color: "#9a2827" }} strong>{`${
                        e.label
                      }: ${number(e.value)}`}</Text>
                    </Col>
                  ))}
                </Row>
              }
            />
          </>
        }
      />
    </Item>
  );
};

const AuthItem = ({ item, index, limit }) => {
  const { Item } = List;
  const { Meta } = Item;
  const { Text } = Typography;

  const { user } = item;
  const { number } = useNumber();

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
        avatar={
          <Avatar
            src={
              item.profile_picture ??
              `https://xsgames.co/randomusers/avatar.php?g=${item.gender?.toLowerCase()}`
            }
          />
        }
        title={
          <>
            <div
              className={styles.publicationTitle}
              dangerouslySetInnerHTML={{
                __html: user?.first_name + " " + user?.last_name,
              }}
            />

            <Text strong>{item.department?.name}</Text>
          </>
        }
        description={
          <Col
            style={{
              gap: 10,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#9a2827" }} strong>{`Publications: ${number(
              item?.publications?.length
            )}`}</Text>
            <Button className={styles.sectionButton} type="primary">
              View Profile
            </Button>
          </Col>
        }
      />
    </Item>
  );
};

const ScrollBox = ({ title, subtitle, data, type }) => {
  const { Text } = Typography;

  return (
    <>
      <Col
        style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}
      >
        <Text strong style={{ fontSize: 20, color: "#9a2827" }}>
          {title}
        </Text>
        <Text strong style={{ fontSize: 18 }}>
          {subtitle}
        </Text>
      </Col>

      <List
        bordered
        pagination={{ position: "bottom", align: "center", pageSize: 2 }}
        style={{ borderRadius: 20, border: "2px solid #9a2827" }}
        itemLayout="horizontal"
        dataSource={data?.length % 2 === 0 ? data : data.slice(0, -1)}
        renderItem={(item, index) =>
          type === "pubs" ? (
            <PubItem item={item} index={index} limit={data?.length} />
          ) : (
            <AuthItem item={item} index={index} limit={data?.length} />
          )
        }
      />
    </>
  );
};

export default ScrollBox;
