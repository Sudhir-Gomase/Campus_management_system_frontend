import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ labels , datavalues}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tasks",
        data: datavalues, // your values
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
    cutout: "70%", // ✅ makes it a donut (hollow center)
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutChart;
