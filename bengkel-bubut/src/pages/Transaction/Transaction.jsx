import { Col, Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Transaksi.png";
import Table from "../../components/Table";
import { AiOutlineTransaction } from "react-icons/ai";

const Transaction = () => {
  const allTableDatas = {
    title: "ALL TRANSACTIONS",
    buttonText: "Add Transaction",
    filterStatus: true,
    header: true,
    buttonNavigation: "/addTransaction",
    editNavigation: "/editTransaction",
    iconTable: <AiOutlineTransaction size={40} />,
    tableHeaderTitles: [
      "TRANSACTION NAME",
      "TRANSACTION DATE",
      "CUSTOMER",
      "MECHANIC",
      "SERVICE TYPE",
      "STOCK",
      "QUANTITY",
      "SALE",
      "STATUS",
      "ACTION",
    ],
    variableName: [
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
    getAllCustomersAPI: "http://localhost:8080/customer/getAll",
    getAllMechanicsAPI: "http://localhost:8080/mechanic/getAll",
    getAllStocksAPI: "http://localhost:8080/stock/getAll",
    addAPI: "http://localhost:8080/transaction/add",
    updateAPI: "http://localhost:8080/transaction/update",
    orderBy: {field: "updated", sort: "DESC"}
  };

  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Transaction" url="/Transaction" />
      </Row>
      <Col>
        <Table data={allTableDatas} />
      </Col>
    </div>
  );
};

export default Transaction;
