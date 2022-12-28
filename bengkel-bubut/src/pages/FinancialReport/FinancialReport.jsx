import { Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Laporan Financial.png";
import styles from "../../styles/LaporanFinancial.module.css";
import { HiDocumentReport } from "react-icons/hi";
import TableRangkumanLaporan from "../../components/Laporan Financial/TableRangkumanLaporan";
import Table from "../../components/Table";
import {
  AiOutlineTransaction,
} from "react-icons/ai";
const FinancialReport = () => {
  const allTableDatas = {
    title: "OVERALL REPORT",
    buttonText: "Add Transaction",
    filterStatus: true,
    header: true,
    buttonNavigation: "/addTransaction",
    editNavigation: "/editTransaction",
    iconTable: <AiOutlineTransaction size={40}/>,
    tableHeaderTitles: ["TRANSACTION ID", "TRANSACTION DATE", "SALE", "EXPENSE", "REVENUE", "ACTION"],
    variableName: [
      "id",
      "created",
      "price",
      "expense",
      "revenue"
    ],
    postAPIWithPagination: "http://localhost:8080/transaction/getList",
    addAPI: "http://localhost:8080/transaction/add",
    updateAPI: "http://localhost:8080/transaction/update",
    orderBy: {field: "updated", sort: "DESC"}
  };
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Financial Report" />
      </Row>
      <div>
        <TableRangkumanLaporan />
      </div>
      <div>
        <Table data={allTableDatas} />
      </div>
    </div>
  );
};

export default FinancialReport;
