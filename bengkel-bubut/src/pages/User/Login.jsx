import styles from "../../styles/Login.module.css";
import logo from "../../Images/login.png";
import Form from "../../components/User/Form";
import { Link } from "react-router-dom";
import {useState} from "react";
const Login = () => {
    const [status, setStatus] = useState(true);
  return (
    <div className="d-flex">
      <div className={styles.leftContentDiv}>
        <div className={styles.leftContent}>
          <div className={styles.textContent}>
            <div className={styles.welcome}>WELCOME!</div>
            <div className={styles.description}>
              Let's Arrange <br /> Your Data With Us
            </div>
          </div>
          <div className={styles.image}>
            <img src={logo} width="90%" height="85%" />
          </div>
        </div>
      </div>
      <div className={styles.rightContentDiv}>
        <div className={styles.rightTop}>
          Belum Punya Akun?{" "}
          <Link to="/s" style={{ color: "#6F6AF8" }}>
            Sign Up
          </Link>
        </div>
        <Form loginStatus ={status}/>
      </div>
    </div>
  );
};

export default Login;
