import { Input, Button, Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Transaksi.png";
import TransaksiTable from "../../components/Pelanggan/Table.jsx";

const Transaksi = () => {
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} nama="Transaksi" />
      </Row>
      <Row>
        <TransaksiTable/>
      </Row>
    </div>
  );
};

export default Transaksi;
