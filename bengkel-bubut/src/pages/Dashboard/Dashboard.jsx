import { Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/dashboard.png";
import styles from "../../styles/Dashboard.module.css";
import { AiFillWarning, AiOutlineTransaction } from "react-icons/ai";
import { Chart } from "../../components/Chart.jsx";
import { HiDocumentReport } from "react-icons/hi";
import moment from "moment";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { BsArrowUpShort } from "react-icons/bs";
import { BsArrowDownShort } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import TableData from "../../components/Table.jsx";

const Dashboard = (props) => {
  const [reportData, setReportData] = useState([]);
  const [previousReportData, setPreviousReportData] = useState([]);
  const [currentDayFilter, setCurrentDayFilter] = useState([]);
  const [previousReportDataByDay, setPreviousReportDataByDay] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const filterTransaction = {
    filter: {
      month: moment().month() + 1,
      year: moment().year(),
    },
  };

  const previousFilterTransaction =
    moment().month() === 0
      ? {
          filter: {
            month: 12,
            year: moment().year() - 1,
          },
        }
      : {
          filter: {
            month: moment().month(),
            year: moment().year(),
          },
        };

  const previousDay = moment().subtract(1, "days");
  const currentDayFilterTransaction = {
    filter: {
      month: moment().month() + 1,
      year: moment().year(),
      day: moment().date(),
    },
  };
  const previousDayFilterTransaction = {
    filter: {
      month: previousDay.month() + 1,
      year: previousDay.year(),
      day: previousDay.date(),
    },
  };

  const authCtx = useContext(AuthContext);

  const postFilterData = (data) => {
    fetch("http://localhost:8080/transaction/getReport", {
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

  const postPreviousFilterData = (data) => {
    fetch("http://localhost:8080/transaction/getReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setPreviousReportData(result.result);
      });
  };
  const postCurrentDayFilterData = (data) => {
    fetch("http://localhost:8080/transaction/getReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setCurrentDayFilter(result.result);
      });
  };

  const postPreviousDayFilterData = (data) => {
    fetch("http://localhost:8080/transaction/getReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setPreviousReportDataByDay(result.result);
      });
  };
  const getAllStocks = async () => {
    await fetch("http://localhost:8080/stock/getAll", {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          // eslint-disable-next-line no-throw-literal
          throw "Error";
        }
        return res.json();
      })
      .then((result) => {
        setAllStocks(result.stock);
      });
  };

  const filteredStocks = allStocks?.filter(
    (data) => data.quantity < data.minimumQty
  );

  const allTableDatas = {
    title: "OVERALL REPORT",
    buttonText: "Add Transaction",
    filterStatus: true,
    filterDashboard: true,
    header: true,
    buttonNavigation: "/addTransaction",
    editNavigation: "/editTransaction",
    iconTable: <AiOutlineTransaction size={40} />,
    tableHeaderTitles: [
      "TRANSACTION NAME",
      "TRANSACTION DATE",
      "SERVICE TYPE",
      "STATUS",
      "ACTION",
    ],
    variableName: ["name", "created", "type", "status"],
    postAPIWithPagination:
      "http://localhost:8080/transaction/getList/financial",
    financialReportFilterAPI: "http://localhost:8080/transaction/getReport",
    addAPI: "http://localhost:8080/transaction/add",
    updateAPI: "http://localhost:8080/transaction/update",
    orderBy: { field: "updated", sort: "DESC" },
  };

  useEffect(() => {
    postFilterData(filterTransaction);
    postPreviousFilterData(previousFilterTransaction);
    postPreviousDayFilterData(previousDayFilterTransaction);
    postCurrentDayFilterData(currentDayFilterTransaction);
    getAllStocks();
  }, []);

  return (
    <>
      <Row>
        <Breadcrumbs icon={icon} activeName="Dashboard" />
      </Row>
      <div className="d-flex">
        <div className={styles.left}>
          <div className={styles.leftTop}>
            <div className={styles.leftTopCard}>
              <div className={styles.saleTitle}>TOTAL SALES TODAY</div>
              <div className="d-flex">
                <AiOutlineTransaction size={35} className={styles.icon} />
                <div>
                  <div className={styles.saleValue}>
                    {" "}
                    <NumericFormat
                      value={currentDayFilter.sale}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator=","
                      prefix="Rp. "
                      fixedDecimalScale={2}
                    />
                  </div>
                  <div
                    className={
                      currentDayFilter.sale - previousReportDataByDay.sale > 0
                        ? styles.saleValueDifference
                        : styles.saleValueDifference2
                    }
                  >
                    {currentDayFilter.sale - previousReportDataByDay.sale > 0
                      ? "+ "
                      : currentDayFilter.sale - previousReportDataByDay.sale < 0
                      ? "- "
                      : ""}

                    {currentDayFilter.sale - previousReportDataByDay.sale > 0
                      ? currentDayFilter.sale - previousReportDataByDay.sale
                      : previousReportDataByDay.sale - currentDayFilter.sale}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.leftTopCard}>
              <div className={styles.saleTitle}>TOTAL REVENUE TODAY</div>
              <div className="d-flex ">
                <HiDocumentReport size={35} className={styles.icon} />
                <div>
                  <div className={styles.saleValue}>
                    {" "}
                    <NumericFormat
                      value={currentDayFilter.revenue}
                      displayType={"text"}
                      decimalScale={2}
                      thousandSeparator=","
                      prefix="Rp. "
                      fixedDecimalScale={2}
                    />
                  </div>
                  <div
                    className={
                      currentDayFilter.revenue -
                        previousReportDataByDay.revenue >
                      0
                        ? styles.saleValueDifference
                        : styles.saleValueDifference2
                    }
                  >
                    {currentDayFilter.revenue -
                      previousReportDataByDay.revenue >
                    0
                      ? "+ "
                      : currentDayFilter.revenue -
                          previousReportDataByDay.revenue <
                        0
                      ? "- "
                      : ""}

                    {currentDayFilter.revenue -
                      previousReportDataByDay.revenue >
                    0
                      ? currentDayFilter.revenue -
                        previousReportDataByDay.revenue
                      : previousReportDataByDay.revenue -
                        currentDayFilter.revenue}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.leftTopCard}>
              <div className={styles.saleTitle}>TOTAL TRANSACTIONS TODAY</div>
              <div className="d-flex ">
                <HiDocumentReport size={35} className={styles.icon} />
                <div>
                  <div className={styles.saleValue}>
                    {currentDayFilter.totalTransaction}
                  </div>
                  <div
                    className={
                      currentDayFilter.totalTransaction -
                        previousReportDataByDay.totalTransaction >
                      0
                        ? styles.saleValueDifference
                        : styles.saleValueDifference2
                    }
                  >
                    {currentDayFilter.totalTransaction -
                      previousReportDataByDay.totalTransaction >
                    0
                      ? "+ "
                      : currentDayFilter.totalTransaction -
                          previousReportDataByDay.totalTransaction <
                        0
                      ? "- "
                      : ""}

                    {currentDayFilter.totalTransaction -
                      previousReportDataByDay.totalTransaction >
                    0
                      ? currentDayFilter.totalTransaction -
                        previousReportDataByDay.totalTransaction
                      : previousReportDataByDay.totalTransaction -
                        currentDayFilter.totalTransaction}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.chart}>
            <Chart />
          </div>
          <div>
            <TableData data={allTableDatas} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.lowStock}>
            <div className={styles.lowStockTitleDiv}>
              <AiFillWarning size={35} />
              <div className={styles.lowStockTitle}>LOW STOCK ITEMS</div>
            </div>
            <div>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((item) => {
                  return (
                    <div
                      className={styles.clickedItem}
                      key={item.id}
                      onClick={() => {
                        navigate("/editStock", {
                          state: {
                            id: item.id,
                            allData: allStocks,
                            status: "Edit",
                          },
                        });
                      }}
                    >
                      <div className={styles.leftData}>
                        <div className={styles.namaBarang}>{item.name}</div>
                        <div className={styles.minQuantity}>
                          Min Qty : {item.minimumQty}
                        </div>
                      </div>
                      <div className={styles.quantity}>{item.quantity}</div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.nodata}>NO DATA FOUND</div>
              )}
            </div>
          </div>
          <div className={styles.lowStock}>
            <div className={styles.lowStockTitleDiv}>
              <HiDocumentReport size={35} />
              <div className={styles.lowStockTitle}>SALE</div>
            </div>
            <div>
              <div>
                <div className={styles.dateTransaction}>
                  {moment().format("MMMM YYYY")}
                </div>
                <div className={styles.nominal}>
                  <NumericFormat
                    value={reportData.sale}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator=","
                    prefix="Rp. "
                    fixedDecimalScale={2}
                  />
                </div>
                <div
                  className={
                    reportData.sale - previousReportData.sale >= 0
                      ? styles.difference
                      : styles.difference2
                  }
                >
                  {reportData.sale - previousReportData.sale > 0 ? (
                    <BsArrowUpShort size={15} />
                  ) : reportData.sale - previousReportData.sale < 0 ? (
                    <BsArrowDownShort size={15} />
                  ) : (
                    ""
                  )}

                  <NumericFormat
                    value={reportData.sale - previousReportData.sale}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator=","
                    prefix="Rp. "
                    fixedDecimalScale={2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.lowStock}>
            <div className={styles.lowStockTitleDiv}>
              <HiDocumentReport size={35} />
              <div className={styles.lowStockTitle}>EXPENSE</div>
            </div>
            <div>
              <div>
                <div className={styles.dateTransaction}>
                  {moment().format("MMMM YYYY")}
                </div>
                <div className={styles.nominal}>
                  <NumericFormat
                    value={reportData.expense}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator=","
                    prefix="Rp. "
                    fixedDecimalScale={2}
                  />
                </div>
                <div
                  className={
                    reportData.expense - previousReportData.expense < 0
                      ? styles.difference
                      : styles.difference2
                  }
                >
                  {reportData.expense - previousReportData.expense > 0 ? (
                    <BsArrowUpShort size={15} />
                  ) : reportData.expense - previousReportData.expense < 0 ? (
                    <BsArrowDownShort size={15} />
                  ) : (
                    ""
                  )}

                  <NumericFormat
                    value={reportData.expense - previousReportData.expense}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator=","
                    prefix="Rp. "
                    fixedDecimalScale={2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.lowStock}>
            <div className={styles.lowStockTitleDiv}>
              <HiDocumentReport size={35} />
              <div className={styles.lowStockTitle}>REVENUE</div>
            </div>
            <div>
              <div>
                <div className={styles.dateTransaction}>
                  {moment().format("MMMM YYYY")}
                </div>
                <div className={styles.nominal}>
                  <NumericFormat
                    value={reportData.revenue}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator=","
                    prefix="Rp. "
                    fixedDecimalScale={2}
                  />
                </div>
                <div
                  className={
                    reportData.revenue - previousReportData.revenue >= 0
                      ? styles.difference
                      : styles.difference2
                  }
                >
                  {reportData.revenue - previousReportData.revenue > 0 ? (
                    <BsArrowUpShort size={15} />
                  ) : reportData.revenue - previousReportData.revenue < 0 ? (
                    <BsArrowDownShort size={15} />
                  ) : (
                    ""
                  )}

                  <NumericFormat
                    value={reportData.revenue - previousReportData.revenue}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator=","
                    prefix="Rp. "
                    fixedDecimalScale={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
