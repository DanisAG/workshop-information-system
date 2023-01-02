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

const Dashboard = (props) => {
  const [reportData, setReportData] = useState([]);
  const [previousReportData, setPreviousReportData] = useState([]);
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

  console.log(reportData);
  console.log(moment().year());

  useEffect(() => {
    postFilterData(filterTransaction);
    postPreviousFilterData(previousFilterTransaction);
  }, []);
  return (
    <>
      <Row>
        <Breadcrumbs icon={icon} activeName="Dashboard" />
      </Row>
      <div className="d-flex justify-content-between">
        <div>
          <div className={styles.leftTop}>
            <div className={styles.leftTopCard}>
              <div className={styles.saleTitle}>TOTAL SALES TODAY</div>
              <div className="d-flex">
                <AiOutlineTransaction size={35} className={styles.icon} />
                <div>
                  <div className={styles.saleValue}>Rp100.000,00</div>
                  <div className={styles.saleValueDifference}>
                    + Rp100.000,00
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.leftTopCard}>
              <div className={styles.saleTitle}>TOTAL TRANSACTION TODAY</div>
              <div className="d-flex ">
                <AiOutlineTransaction size={35} className={styles.icon} />
                <div>
                  <div className={styles.saleValue}>5000</div>
                  <div className={styles.saleValueDifference}>+ 20</div>
                </div>
              </div>
            </div>{" "}
            <div className={styles.leftTopCard}>
              <div className={styles.saleTitle}>TOTAL CUSTOMER TODAY</div>
              <div className="d-flex">
                <AiOutlineTransaction size={35} className={styles.icon} />
                <div>
                  <div className={styles.saleValue}>1231</div>
                  <div className={styles.saleValueDifference}>+ 30</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.chart}>
            <Chart />
          </div>
        </div>
        <div>
          <div className={styles.lowStock}>
            <div className={styles.lowStockTitleDiv}>
              <AiFillWarning size={35} />
              <div className={styles.lowStockTitle}>LOW STOCK ITEM</div>
            </div>
            <div>
              <div className="d-flex">
                <div className={styles.leftData}>
                  <div className={styles.namaBarang}>Besi 1</div>
                  <div className={styles.minQuantity}>Min Qty : 50</div>
                </div>
                <div className={styles.quantity}>10</div>
              </div>
              <div className="d-flex">
                <div className={styles.leftData}>
                  <div className={styles.namaBarang}>Besi 2</div>
                  <div className={styles.minQuantity}>Min Qty : 50</div>
                </div>
                <div className={styles.quantity}>20</div>
              </div>
              <div className="d-flex">
                <div className={styles.leftData}>
                  <div className={styles.namaBarang}>Besi 3</div>
                  <div className={styles.minQuantity}>Min Qty : 50</div>
                </div>
                <div className={styles.quantity}>30</div>
              </div>
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
