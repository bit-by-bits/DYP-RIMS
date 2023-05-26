import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const Scite = ({ DOI, type }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://cdn.scite.ai/badge/scite-badge-latest.min.js";
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, [DOI, type]);

  return (
    <>
      <Helmet />

      {type ? (
        <div
          data-doi={DOI}
          className="scite-badge"
          data-layout="horizontal"
          data-show-zero="true"
          data-small="false"
          data-show-labels="false"
          data-tally-show="true"
        />
      ) : (
        <div
          style={{
            display: "flex",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div
            className="scite-badge"
            data-doi={DOI}
            data-tally-show="true"
            data-show-labels="true"
            data-section-tally-show="false"
          />

          <div
            className="scite-badge"
            data-doi={DOI}
            data-tally-show="false"
            data-section-tally-show="true"
            data-show-labels="true"
            data-section-tally-layout="vertical"
            data-chart-type="donut"
          />
        </div>
      )}
    </>
  );
};

export default Scite;
