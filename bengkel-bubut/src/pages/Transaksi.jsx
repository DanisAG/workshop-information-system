import { Input, Button, Row, Col } from "reactstrap";
import Breadcrumbs from "../components/BreadCrumbs.jsx";
import icon from "../Images/notSelected/Transaksi.png";

const Transaksi = () => {
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} nama="Transaksi" />
      </Row>
    </div>
  );
};

export default Transaksi;
