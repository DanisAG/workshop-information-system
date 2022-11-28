import { Input, Button, Row, Col } from "reactstrap";
import styles from "../styles/Searchbar.module.css";
import pelangganStyles from "../styles/Pelanggan.module.css";
import { FaPlus } from "react-icons/fa";
import PelangganTable from "../components/Pelanggan/Table.jsx";
import Breadcrumbs from "../components/BreadCrumbs.jsx";
import icon from "../Images/notSelected/Pelanggan.png";
const Pelanggan = () => {
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} nama="Pelanggan"/>
      </Row>
      <Row className={pelangganStyles.topSection}>
        <Col className={pelangganStyles.search} lg={8} >
          <Input
            type="text"
            placeholder="Cari Pelanggan"
            className={styles.searchBar}
          />
        </Col>
        <Col className={pelangganStyles.divButton}  >
          <Button className={pelangganStyles.button}>
            <div>
              <FaPlus className={pelangganStyles.plusIcon} />
            </div>
            <div>Tambah Pelanggan</div>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <PelangganTable />
        </Col>
      </Row>
    </div>
  );
};

export default Pelanggan;
