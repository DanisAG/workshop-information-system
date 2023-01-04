import styles from "../../styles/Login.module.css";
import logo from "../../Images/login.png";
import Form from "../../components/User/Form";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../components/store/AuthContext";
const SignUp = () => {
  const [status, setStatus] = useState(true);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  if (authCtx.isLoggedIn) {
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
            <img src={logo} width="90%" height="85%" alt="" />
          </div>
        </div>
      </div>
      <div className={styles.rightContentDiv}>
        <div className={styles.rightTop}>
          Already Have An Account?{" "}
          <Link to="/" style={{ color: "#6F6AF8" }}>
            Log In
          </Link>
        </div>
        <Form signupStatus={status} />
      </div>
    </div>
  );
};

export default SignUp;
