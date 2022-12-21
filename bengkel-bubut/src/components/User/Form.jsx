import { Input, Button, Row, Col, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/FormUser.module.css";
import Select from "react-select";
import { MdSupervisedUserCircle } from "react-icons/md";
import DatePicker from "react-datepicker";
import React, { useState, useEffect, useContext } from "react";
import swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { GiMechanicGarage } from "react-icons/gi";
import { useFormik } from "formik";
import { loginSchema } from "../Schema";
import { UserContext } from "../../App.js";
import AuthContext from "../store/AuthContext.jsx";
const FormUser = (props) => {
  // console.log(props);
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      borderRadius: 12,
    }),
  };
  const options = [
    { value: "lakilaki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [cancelStatus, setCancelStatus] = useState(false);
  const handleClickCancel = () => {
    setCancelStatus(true);
    swal
      .fire({
        title: "KONFIRMASI",
        text: "Anda yakin untuk membuang perubahan ini?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Hapus",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
  };

  const location = useLocation();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(false);
  const onSubmit = (values, actions) => {
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            errorMessage = data?.error?.message;
            console.log(data);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if(data.user.password !== values.password || data.user.username !== values.username) {
          setErrorMessage(true);
          return;
        }
        console.log(data.user.token);
        authCtx.login(data.user.token);
        navigate("/");
      })
      
  };

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  const handleChange = (name,e) => {
    loginFormik.setFieldValue(name, e.target.value);
    setErrorMessage(false);
  }


  return (
    <div
      className={
        props.signupStatus ? styles.formContentSignup : styles.formContentLogin
      }
    >
      <div className={styles.header}>
        {props.signupStatus ? (
          <div className={styles.title}>CREATE YOUR ACCOUNT</div>
        ) : (
          <div className={styles.title}>LOG IN ACCOUNT</div>
        )}
      </div>
      <Form onSubmit={loginFormik.handleSubmit} autoComplete="off">
        {props.signupStatus && (
          <>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Nama Lengkap</Label>
              <Input placeholder="Nama Lengkap" className={styles.input} />
            </FormGroup>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Username</Label>
              <Input placeholder="@Username" className={styles.input} />
            </FormGroup>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Email</Label>
              <Input placeholder="username@user.com" className={styles.input} />
            </FormGroup>

            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Password</Label>
              <Input
                type="password"
                placeholder="Minimal 5 karakter, 1 Huruf Besar, 1 Angka"
                className={styles.input}
              />
            </FormGroup>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Konfirmasi Password</Label>
              <Input
                type="password"
                placeholder="Ulangi Password"
                className={styles.input}
              />
            </FormGroup>
          </>
        )}

        {props.loginStatus && (
          <>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Email</Label>
              <Input
                id="username"
                placeholder="username@user.com"
                value={loginFormik.values.username}
                onChange={(e) => handleChange("username", e)}
                onBlur={loginFormik.handleBlur}
                autoComplete="off"
                className={
                  loginFormik.errors.username && loginFormik.touched.username
                    ? styles.inputError
                    : styles.input
                }
                // className={styles.input}
              />
              {loginFormik.errors.username && loginFormik.touched.username && (
                <p className={styles.error}>{loginFormik.errors.username}</p>
              )}
            </FormGroup>

            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Password</Label>
              <Input
                id="password"
                type="password"
                value={loginFormik.values.password}
                onChange={(e) => handleChange("password", e)}
                onBlur={loginFormik.handleBlur}
                className={
                  loginFormik.errors.password && loginFormik.touched.password
                    ? styles.inputError
                    : styles.input
                }
                placeholder="Minimal 5 karakter, 1 Huruf Besar, 1 Angka"
              />
              {loginFormik.errors.password && loginFormik.touched.password && (
                <p className={styles.error}>{loginFormik.errors.password}</p>
              )}
            </FormGroup>
            <FormGroup className={styles.formgroup}>
            {errorMessage && <p className={styles.error}>Username or password is incorrect!</p>}

            </FormGroup>

          </>
        )}
        <div className="d-flex">
          <div className={styles.button}>
            {props.loginStatus && (
              <Button className={styles.buatAkun} type="submit" >
                Login
              </Button>
            )}
            {props.signupStatus && (
              <Button className={styles.buatAkun} type="submit">
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FormUser;
