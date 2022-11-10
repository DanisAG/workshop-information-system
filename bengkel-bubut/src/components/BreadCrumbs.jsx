import moment from "moment";
import styles from "../styles/Breadcrumbs.module.css";
const Breadcrumbs = (props) => {
  return (
    <div>
      <h3 className={styles.breadcrumbs}>
        <b>{moment().format("dddd, MMMM Do YYYY")}</b>
        <div className="d-flex">
           <img src={props.icon} className={styles.icon} width="17px" height="18px"/> 
           <small className={styles.text}>/</small>
           <small className={styles.text}> {props.nama}</small>
        </div>
      </h3>
    </div>
  );
};

export default Breadcrumbs;
