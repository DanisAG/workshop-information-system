import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import styles from "../../styles/Chart.module.css";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
  zoomPlugin
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Overview Stok Barang",
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
      },
      zoom: {
        pinch: {
          enabled: true, // Enable pinch zooming
        },
        wheel: {
          enabled: true, // Enable wheel zooming
        },
        mode: "x",
      },
    },
  },
};


const backgroundColor = ["#F58A6D", "#F9BD6C", "#6F6AF8", "#23B064"];

export const Chart = ({sortedStocks}) => {
  console.log(sortedStocks)
  const labels = sortedStocks.map(data => data.name);
  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Minimum Quantity',
        borderColor: '#6F6AF8',
        borderWidth: 2,
        fill: false,
        data: sortedStocks.map((data) => data.count ),
      },
      {
        type: 'bar' ,
        label: 'Quantity',
        backgroundColor: '#F58A6D',
        data: sortedStocks.map((data) => data.count ),
      },
    ]
  };
  return <Bar options={{options,maintainAspectRatio: false}} data={data}  className={styles.bar} 
  />;
};
