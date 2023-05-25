import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const Scite = ({ DOI }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cdn.scite.ai/badge/scite-badge-latest.min.js";
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <Helmet />
      {/* <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.scite.ai/badge/scite-badge-latest.min.css"
        />

        <script
          async
          type="application/javascript"
          src="https://cdn.scite.ai/badge/scite-badge-latest.min.js"
        /> */}

      <div
        data-doi={DOI}
        className="scite-badge"
        data-layout="horizontal"
        data-show-zero="true"
        data-small="false"
        data-show-labels="false"
        data-tally-show="true"
      />
    </>
  );
};

export default Scite;
