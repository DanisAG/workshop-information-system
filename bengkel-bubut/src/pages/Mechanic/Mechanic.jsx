import { Input, Button, Row, Col } from "reactstrap";

import { FaPlus } from "react-icons/fa";
import MekanikTable from "../../components/Mechanic/Table.jsx";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Mekanik.png";
import { useNavigate } from "react-router-dom";

const Mechanic = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Mechanic" />
      </Row>
      <Row>
        <Col>
          <MekanikTable />
        </Col>
      </Row>
    </div>
  );
};

export default Mechanic;
