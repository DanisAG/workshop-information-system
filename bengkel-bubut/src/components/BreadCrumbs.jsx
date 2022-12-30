import moment from "moment";
import styles from "../styles/Breadcrumbs.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Collapsible from "react-collapsible";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import AuthContext from "./store/AuthContext";
import {useNavigate} from "react-router-dom";

const Breadcrumbs = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  // const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  }


  useEffect(() => {
    const data = {token: authCtx.token};
    fetch("http://localhost:8080/user/getbytoken",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setUserData(result.user);
      });
  }, []);  
  
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex" style={{minWidth: "70vw"}}>
        <h3 className={styles.breadcrumbs}>
          <b>{moment().format("dddd, MMMM Do YYYY")}</b>
          <div className="d-flex" style={{height: "6vh"}}>
            <img
              src={props.icon}
              className={styles.icon}
              width="17px"
              height="18px"
              alt=""
            />
            <small className={styles.slash}>/</small>
            <Breadcrumb>
              {props.name && (
                <BreadcrumbItem className={styles.text}>
                  <Link to={props.url} style={{color: "#6F6AF8"}}>{props.name}</Link>
                </BreadcrumbItem>
              )}
              <BreadcrumbItem className={styles.text} active>
                {props.activeName}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </h3>
        <div></div>
      </div>
      <div className={styles.collapsible} onClick={toggle}>
        <div className={isOpen ? styles.userExpand : styles.user}>
          <div
            className={
              isOpen ? styles.profilePictureDivExpand : styles.profilePictureDiv
            }
          >
            <FaRegUserCircle className={styles.profilePicture} size={23} />
          </div>
          <div className={isOpen ? styles.userDetailExpand : styles.userDetail}>
            <div className={isOpen ? styles.usernameExpand : styles.username}>
              {userData.username}
            </div>
            <div className={styles.userRole}>Administrator</div>
            {isOpen ? <div className={styles.logout} onClick={logoutHandler}>Log Out</div> : ""}
          </div>
          <div
            className={isOpen ? styles.dropdownDivExpand : styles.dropdownDiv}
          >
            {isOpen ? (
              <AiOutlineUp size={23}></AiOutlineUp>
            ) : (
              <AiOutlineDown size={23}></AiOutlineDown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
