import styles from "../../styles/Login.module.css";
import logo from "../../Images/login.png";
import Form from "../../components/User/Form";
import { Link, Navigate } from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import {useFormik} from "formik";
import { UserContext } from "../../App";
import AuthContext from "../../components/store/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [status, setStatus] = useState(true);
    const [userData, setUserData] = useState();
    useEffect(() => {
      fetch("http://localhost:8080/user/getAll")
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setUserData(result);
        });
    }, []);  

    const navigate = useNavigate();
    const authCtx = useContext(AuthContext)

    if(authCtx.isLoggedIn) {
      return <Navigate to="/"/>;
    }
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
          <Link to="/signup" style={{ color: "#6F6AF8" }}>
            Sign Up
          </Link>
        </div>
        <Form loginStatus ={status} userData = {userData}/>
      </div>
    </div>
  );
};

export default Login;
