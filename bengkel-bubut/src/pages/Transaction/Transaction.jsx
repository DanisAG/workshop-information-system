import { Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Transaksi.png";
import TransaksiTable from "../../components/Transaksi/Table.jsx";
import Table from "../../components/Table";
import { AiOutlineTransaction } from "react-icons/ai";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import { useState } from "react";
import { useEffect } from "react";
const Transaction = () => {
  const authCtx = useContext(AuthContext);
  const [allTransactionData, setAllTransactionData] = useState();
  const allTableDatas = {
    title: "ALL TRANSACTION",
    buttonText: "Add Transaction",
    filterStatus: true,
    header: true,
    buttonNavigation: "/addTransaction",
    editNavigation: "/editTransaksi",
    iconTable: <AiOutlineTransaction size={40} />,
    tableHeaderTitles: [
      "TRANSACTION ID",
      "TRANSACTION NAME",
      "TRANSACTION DATE",
      "CUSTOMER",
      "MECHANIC",
      "SERVICE TYPE",
      "STOCK",
      "QUANTITY",
      "PRICE",
      "STATUS",
      "ACTION",
    ],
    postAPIWithPagination: "http://localhost:8080/transaction/getList"
  };

  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Transaksi" url="/Transaksi" />
      </Row>
      <Row>
        <Table data={allTableDatas} />
      </Row>
    </div>
  );
};

export default Transaction;
