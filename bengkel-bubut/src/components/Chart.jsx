import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { MdNoEncryption } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "./store/AuthContext";
import Filter from "./Filter";
import styles from "../styles/Chart.module.css";
import moment from "moment";
import { AiOutlineTransaction } from "react-icons/ai";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = () => {
  const authCtx = useContext(AuthContext);
  const [saleData, setSaleData] = useState([]);
  const [filterChart, setFilterChart] = useState({
    month: "",
    year: moment().year().toString(),
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Overview Transaction Report - Year ${filterChart.year}`,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const initialFilterData = {
    filter: {
      month: filterChart.month,
      year: filterChart.year,
    },
  };
  const filterData = useRef(initialFilterData);

  const data = {
    labels,
    datasets: [
      {
        label: "Sale",
        data: saleData.map((data) => data.sale),
        backgroundColor: "#F9BD6C",
      },
      {
        label: "Expense",
        data: saleData.map((data) => data.expense),
        backgroundColor: "#F58A6D",
      },
      {
        label: "Revenue",
        data: saleData.map((data) => data.revenue),
        backgroundColor: "#23B064",
      },
    ],
  };

  const allValue = async () => {
    var newData = [];
    for (let i = 0; i < 12; i++) {
      filterData.current = {
        ...initialFilterData,
        filter: {
          month: (i + 1).toString(),
          year: filterChart.year,
        },
      };
      await fetch("http://localhost:8080/transaction/getReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: JSON.stringify(filterData.current),
      })
        .then((res) => res.json())
        .then((response) => {
          const updated = newData.slice(0);
          updated.splice(i, 1, response.result);
          newData = updated;
        });
    }
    setSaleData(newData);
  };

  useEffect(() => {
    allValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterChart]);

  return (
    <>
      <div className={styles.overview}>
        <div className={styles.overviewHeader}>
          <AiOutlineTransaction size={40} className={styles.icon} />
          <div className="mb-auto mt-auto">
            <div className={styles.title}>
              OVERVIEW TRANSACTION REPORT - YEAR {filterChart.year}
            </div>
            <div className={styles.updateDate}>
              Last Updated: {moment().format("dddd, MMMM Do YYYY, h:mm:ss A")}
            </div>
          </div>
          <div className={styles.filterDiv}>
            <Filter
              chart={true}
              filterChart={filterChart}
              setFilterChart={setFilterChart}
              className={styles.filter}
            />
          </div>
        </div>

        <Bar
          options={{ options, maintainAspectRatio: false }}
          data={data}
          className={styles.bar}
        />
      </div>
    </>
  );
};
