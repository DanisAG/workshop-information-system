import { Input, Button, Row, Col } from "reactstrap";
import styles from "../../styles/Searchbar.module.css";
import pelangganStyles from "../../styles/Pelanggan.module.css";
import { FaPlus } from "react-icons/fa";
import MekanikTable from "../../components/Mekanik/Table.jsx";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Mekanik.png";
import { useNavigate } from "react-router-dom";

const Mekanik = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Mekanik" />
      </Row>
      <Row className={pelangganStyles.topSection}>
        <Col className={pelangganStyles.search} lg={8}>
          <Input
            type="text"
            placeholder="Cari Mekanik"
            className={styles.searchBar}
          />
        </Col>
        <Col className={pelangganStyles.divButton}>
          <Button
            className={pelangganStyles.button}
            onClick={() => {
              navigate("/tambahMekanik", {
                state: {
                  userId: "2",
                },
              });
            }}
          >
            <div>
              <FaPlus className={pelangganStyles.plusIcon} />
            </div>
            <div>Tambah Mekanik</div>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <MekanikTable />
        </Col>
      </Row>
    </div>
  );
};

export default Mekanik;
