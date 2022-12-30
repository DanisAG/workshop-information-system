import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Mekanik.png";
import { GiMechanicGarage } from "react-icons/gi";
import TableData from "../../components/Table.jsx";

const Mechanic = () => {
  const allTableDatas = {
    title: "ALL MECHANICS",
    buttonText: "Add Mechanic",
    filterStatus: false,
    header: true,
    buttonNavigation: "/addMechanic",
    editNavigation: "/editMechanic",
    iconTable: <GiMechanicGarage size={40} />,
    tableHeaderTitles: [
      "MECHANIC NAME",
      "DATE OF BIRTH",
      "GENDER",
      "ADDRESS",
      "PHONE NUMBER",
      "EMAIL",
      "ACTION",
    ],
    variableName: ["name", "dob", "gender", "address", "phone", "email"],
    postAPIWithPagination: "http://localhost:8080/mechanic/getList",
    deleteAPI: "http://localhost:8080/mechanic/delete/",
    orderBy: { field: "name", sort: "ASC" },
  };
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Mechanic" />
      </Row>
      <Col>
        <TableData data={allTableDatas} />
      </Col>
    </div>
  );
};

export default Mechanic;
