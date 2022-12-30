import { Table } from "reactstrap";
import styles from "../../styles/TableRangkuman.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { HiDocumentReport } from "react-icons/hi";
import Filter from "../Filter";
import AuthContext from "../store/AuthContext";
import { NumericFormat } from "react-number-format";

const TableRangkumanLaporan = (props) => {
  const countData = [""];
  const [filter, setFilter] = useState(true);
  const [reportData, setReportData] = useState([]);
  const authCtx = useContext(AuthContext);
  const [filterDataPerPeriod, setFilterDataPerPeriod] = useState({
    month: "",
    year: "",
  });

  const monthLists = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const monthInString = monthLists.find(
    (data) => data.value === filterDataPerPeriod.month
  )?.label;
  console.log(monthInString);
  const initialFilterData = {
    filter: {
      month: filterDataPerPeriod.month,
      year: filterDataPerPeriod.year,
    },
  };
  const filterData = useRef(initialFilterData);

  const postFilterData = (data) => {
    fetch(props.data.financialReportFilterAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setReportData(result.result);
      });
  };

  console.log(props);
  console.log(initialFilterData);

  const checkFilterData =
    filterDataPerPeriod.month === "" && filterDataPerPeriod.year === ""
      ? "overall"
      : filterDataPerPeriod.month === "" && filterDataPerPeriod.year !== ""
      ? "yearOnly"
      : filterDataPerPeriod.month !== "" && filterDataPerPeriod.year !== ""
      ? "yearMonth"
      : "monthOnly";
  useEffect(() => {
    filterData.current = initialFilterData;
    postFilterData(filterData.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDataPerPeriod]);
  return (
    <div className={styles.divTable}>
      <div className={styles.header}>
        <div className="d-flex">
          <HiDocumentReport className={styles.iconTransaction} size={40} />
          <div className={styles.headerTitle}>
            {checkFilterData === "overall"
              ? " TOTAL TRANSACTION REPORT DETAIL"
              : checkFilterData === "yearOnly"
              ? `TRANSACTION REPORT DETAIL - YEAR OF ${filterDataPerPeriod.year}`
              : checkFilterData === "monthOnly"
              ? `TRANSACTION REPORT DETAIL`
              : checkFilterData === "yearMonth"
              ? `TRANSACTION REPORT DETAIL - ${monthInString}, ${filterDataPerPeriod.year}`
              : "TRANSACTION REPORT DETAIL"}
          </div>
        </div>

        <div className={styles.divButton}>
          <Filter
            reportFilter={filter}
            filterDataPerPeriod={filterDataPerPeriod}
            setFilterDataPerPeriod={setFilterDataPerPeriod}
          />
        </div>
      </div>
      <Table responsive className={`${styles.table} text-nowrap shadow-sm`}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>SALE</th>
            <th className={styles.th}>EXPENSE</th>
            <th className={styles.th}>REVENUE</th>
          </tr>
        </thead>
        <tbody>
          {countData.map((item, index) => {
            return (
              <tr className={styles.tr}>
                {index + 1 == countData.length ? (
                  <td className={styles.tdFirstLastChild}>
                    <div className={styles.tdFirstLastChildContent}>
                      {reportData.sale ? (
                        <NumericFormat
                          value={reportData.sale}
                          displayType={"text"}
                          decimalScale={2}
                          thousandSeparator=","
                          prefix="Rp. "
                          fixedDecimalScale={2}
                        />
                      ) : (
                        "No Data"
                      )}
                    </div>
                  </td>
                ) : (
                  <td className={styles.tdFirstChild}>
                    <div className={styles.tdFirstLastChildContent}>
                      {reportData.sale ? (
                        <NumericFormat
                          value={reportData.sale}
                          displayType={"text"}
                          decimalScale={2}
                          thousandSeparator=","
                          prefix="Rp. "
                          fixedDecimalScale={2}
                        />
                      ) : (
                        "No Data"
                      )}
                    </div>
                  </td>
                )}
                <td className={styles.tdMiddle}>
                  <div className={styles.tdMiddleContent}>
                    {reportData.sale ? (
                      <NumericFormat
                        value={reportData.expense}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator=","
                        prefix="Rp. "
                        fixedDecimalScale={2}
                      />
                    ) : (
                      "No Data"
                    )}
                  </div>
                </td>
                <td
                  className={
                    index + 1 == countData.length
                      ? styles.tdLastChild
                      : styles.td
                  }
                >
                  <div className={styles.tdLastContent}>
                    {reportData.sale ? (
                      <NumericFormat
                        value={reportData.revenue}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator=","
                        prefix="Rp. "
                        fixedDecimalScale={2}
                        allowNegative
                      />
                    ) : (
                      "No Data"
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableRangkumanLaporan;
