import { Input, Button, Row, Col } from "reactstrap";
import styles from "../../styles/Searchbar.module.css";
import customerStyles from "../../styles/Customer.module.css";
import { FaPlus } from "react-icons/fa";
import CustomerList from "../../components/Customer/Table.jsx";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();
 
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Customer" />
      </Row>
      <Row className={customerStyles.topSection}>
        <Col className={customerStyles.search} lg={8}>
          <Input
            type="text"
            placeholder="Search Customer"
            className={styles.searchBar}
          />
        </Col>
        <Col className={customerStyles.divButton}>
          <Button
            className={customerStyles.button}
            onClick={() => {
              navigate("/addCustomer", {
                state: {
                  userId: "2",
                },
              });
            }}
          >
            <div>
              <FaPlus className={customerStyles.plusIcon} />
            </div>
            <div>Add Customer</div>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomerList />
        </Col>
      </Row>
    

    </div>
  );
};

export default Customer;
