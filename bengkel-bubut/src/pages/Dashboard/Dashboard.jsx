import { Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/dashboard.png";
import {useLocation} from 'react-router-dom';

const Dashboard = (props) => {
    
  return (
    <Row>
      <Breadcrumbs icon={icon} activeName="Dashboard" />
    </Row>
  );
};

export default Dashboard;
