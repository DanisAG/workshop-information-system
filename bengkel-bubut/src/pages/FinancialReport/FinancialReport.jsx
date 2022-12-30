import { Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Laporan Financial.png";
import styles from "../../styles/LaporanFinancial.module.css";
import { HiDocumentReport } from "react-icons/hi";
import TableRangkumanLaporan from "../../components/Financial Report/TableRangkumanLaporan";
import Table from "../../components/Table";
import {
  AiOutlineTransaction,
} from "react-icons/ai";
import { Chart } from "../../components/Chart.jsx";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
const FinancialReport = () => {
  const allTableDatas = {
    title: "OVERALL REPORT",
    buttonText: "Add Transaction",
    filterStatus: true,
    header: true,
    buttonNavigation: "/addTransaction",
    editNavigation: "/editTransaction",
    iconTable: <AiOutlineTransaction size={40}/>,
    tableHeaderTitles: ["TRANSACTION NAME", "TRANSACTION DATE", "SALE", "EXPENSE", "REVENUE", "ACTION"],
    variableName: [
      "name",
      "created",
      "sale",
      "expense",
      "revenue"
    ],
    postAPIWithPagination: "http://localhost:8080/transaction/getList/financial",
    financialReportFilterAPI: "http://localhost:8080/transaction/getReport",
    addAPI: "http://localhost:8080/transaction/add",
    updateAPI: "http://localhost:8080/transaction/update",
    orderBy: {field: "updated", sort: "DESC"}
  };

  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Financial Report" />
      </Row>
      <div className={styles.chart}>
        <Chart />
      </div>
      <div>
        <TableRangkumanLaporan data={allTableDatas}/>
      </div>
      <div>
        <Table data={allTableDatas} />
      </div>
    </div>
  );
};

export default FinancialReport;
