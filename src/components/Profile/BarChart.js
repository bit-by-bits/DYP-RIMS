import React, { useEffect } from "react";
import "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { LinearScale, Tooltip, Legend } from "chart.js";
import { Chart as ChartJS, CategoryScale, BarElement, Title } from "chart.js";
import { useWindowSize } from "rooks";
import { Helmet, HelmetProvider } from "react-helmet-async";

const BarChart = ({ trends }) => {
  const { innerWidth } = useWindowSize();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );

  ChartJS.defaults.set("plugins.datalabels", {
    color: "#000",
    font: {
      size: innerWidth < 1800 ? 10 : 14,
      family: "Jost",
      weight: 500,
    },
    anchor: "end",
    align: "end",
  });

  const options = {
    responsive: true,
    legend: {
      labels: {
        fontSize: 200,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        color: "black",
        font: {
          size: innerWidth < 1800 ? 16 : 22,
          family: "Jost",
          weight: "500",
        },
        text: "Indexed and Non-Indexed Publications",
      },
      legend: {
        position: "bottom",
        labels: {
          color: "black",
          font: {
            size: innerWidth < 1800 ? 15 : 20,
            family: "Jost",
            weight: "500",
          },
        },
      },
    },
  };

  const labels = trends?.map(e => e.year);

  const datasets = [
    ["Total", "total", "#30145E"],
    ["Scopus", "scopus", "#E780AD"],
    ["Web of Science", "wos", "#FF9855"],
    ["Pubmed", "pubmed", "#52BEBF"],
    ["DOAJ", "doaj", "#FD9489"],
    ["Non-Indexed", "none", "#9A2827"],
  ].map(([label, trend, color]) => ({
    barPercentage: 0.7,
    label: label,
    data: trends?.map(e => e.trends?.[trend]),
    backgroundColor: color,
  }));

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src =
      "https://cdn.jsdelivr.net/npm/chart.js@3.0.0/dist/chart.min.js";
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.async = true;
    script2.src =
      "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0";
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet />
      </HelmetProvider>

      <Bar
        height={"60%"}
        options={options}
        plugins={[ChartDataLabels]}
        data={{ labels: labels, datasets: datasets }}
      />
    </>
  );
};

export default BarChart;
