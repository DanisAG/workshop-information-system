import { Col, Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Transaksi.png";
import Table from "../../components/Table";
import { AiOutlineTransaction } from "react-icons/ai";

const Transaction = () => {
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
    variableName: [
      "id",
      "name",
      "created",
      "customer",
      "mechanic",
      "type",
      "stock",
      "quantity",
      "price",
      "status",
    ],
    postAPIWithPagination: "http://localhost:8080/transaction/getList",
  };

  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Transaksi" url="/Transaksi" />
      </Row>
      <Col>
        <Table data={allTableDatas} />
      </Col>
    </div>
  );
};

export default Transaction;
