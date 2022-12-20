import { Input, Button, Row, Col } from "reactstrap";
import styles from "../../styles/Searchbar.module.css";
import customerStyles from "../../styles/Customer.module.css";
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
      <Row className={customerStyles.topSection}>
        <Col className={customerStyles.search} lg={8}>
          <Input
            type="text"
            placeholder="Cari Mekanik"
            className={styles.searchBar}
          />
        </Col>
        <Col className={customerStyles.divButton}>
          <Button
            className={customerStyles.button}
            onClick={() => {
              navigate("/tambahMekanik", {
                state: {
                  userId: "2",
                },
              });
            }}
          >
            <div>
              <FaPlus className={customerStyles.plusIcon} />
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
