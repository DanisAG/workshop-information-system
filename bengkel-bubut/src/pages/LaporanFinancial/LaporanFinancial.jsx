import { Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Laporan Financial.png";

const LaporanFinancial = () => {
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Laporan Financial" />
      </Row>
    </div>
  );
};

export default LaporanFinancial;
