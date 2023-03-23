import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";
import Loader from "../../src/Common/Loader";
import Status from "../../src/Upload/Status";
import Details from "../../src/Upload/Details";
import styles from "../../styles/uploading.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../../src/userContext";

const Uploading = () => {
  const router = useRouter();
  const { doi } = router.query;

  const [loading, setLoading] = useState(true),
    [visible, setVisible] = useState(true);

  const [ID, setID] = useState(0),
    [DOI, setDOI] = useState("");

  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  useEffect(() => {
    if (!router.isReady) return;
    setDOI(doi.join("/"));
  }, [router.isReady, doi]);

  return (
    <>
      <Head>
        <title>{loading ? "Confirm Upload" : "Uploaded"}</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <Loader visible={visible} />

        <div className={styles.uploading_wrapper}>
          <Status
            img={
              loading ? "/../upload/uploading.png" : "/../upload/uploaded.png"
            }
            top={
              loading
                ? "Your file is being uploaded to RIMS."
                : "Your file has been successfully uploaded to RIMS."
            }
            bottom={
              loading ? "Kindly confirm and edit the following details." : ""
            }
          />

          {loading && (
            <Details
              setVisible={setVisible}
              setLoading={setLoading}
              setID={setID}
              doi={DOI}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Uploading;
