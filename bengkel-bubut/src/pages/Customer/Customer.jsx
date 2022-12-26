import { Row, Col } from "reactstrap";
import CustomerList from "../../components/Customer/Table.jsx";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import { MdSupervisedUserCircle } from "react-icons/md";
import Table from "../../components/Table";

const Customer = () => {
  const allTableDatas = {
    title: "ALL CUSTOMER",
    buttonText: "Add Customer",
    filterStatus: true,
    header: true,
    buttonNavigation: "/addCustomer",
    editNavigation: "/editCustomer",
    iconTable: <MdSupervisedUserCircle size={40} />,
    tableHeaderTitles: [
      "CUSTOMER ID",
      "CUSTOMER NAME",
      "DATE OF BIRTH",
      "GENDER",
      "ADDRESS",
      "PHONE NUMBER",
      "EMAIL",
      "ACTION",
    ],
    variableName: ["id", "name", "dob", "gender", "address", "phone", "email"],
    postAPIWithPagination: "http://localhost:8080/customer/getList",
  };
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Customer" />
      </Row>
      <Col>
        <Table data={allTableDatas} />
      </Col>
    </div>
  );
};

export default Customer;
