import { Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/dashboard.png";
import { useLocation } from "react-router-dom";
import styles from "../../styles/Dashboard.module.css";

const Dashboard = (props) => {
  return (
    <>
      <Row>
        <Breadcrumbs icon={icon} activeName="Dashboard" />
      </Row>
      <div className={styles.leftTop}>
        <div>
          PENJUALAN HARI INI
        </div>
        <div>TOTAL TRANSAKSI</div>
        <div>TOTAL PELANGGAN</div>
      </div>
    </>
  );
};

export default Dashboard;
