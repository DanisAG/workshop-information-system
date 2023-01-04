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
import { loginSchema, signupSchema } from "../Schema";
import { UserContext } from "../../App.js";
import AuthContext from "../store/AuthContext.jsx";
const FormUser = (props) => {
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      borderRadius: 12,
    }),
  };

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
  const [error, setError] = useState("");
  const onSubmit = (values) => {
    if (props.loginStatus) {
      fetch("http://localhost:8080/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
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
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data.user.email);
          console.log(values.email);
          if (
            data.user.password !== values.password ||
            data.user.email !== values.email
          ) {
            setErrorMessage(true);
            return;
          }
          authCtx.login(data.user.token, data.user.expiredDate);
          navigate("/");
        });
    } else {
      swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to add the data?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Add",
      })
      .then(async(result) => {
        if (result.isConfirmed) {
          await swal.fire({
            title: "Please Wait...",
            timer: 1000,
            showConfirmButton: false,
            didOpen: () => {
              swal.showLoading();

            }
          });
         await fetch("http://localhost:8080/user/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
              username: values.username,
            }),
          })
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              } else {
                await swal.fire(
                  "Added!",
                  "The Data has been added.",
                  "success"
                );
                navigate(-1);
              }
            })
            .catch((error) => {
              swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Request failed: ${error}`,
              });
            });
        }
      });
    }
  };
  console.log(error);
  const initialValues = props.loginStatus
    ? {
        email: "",
        password: "",
      }
    : {
        email: "",
        password: "",
        username: "",
        passwordConfirmation: "",
      };

  const loginFormik = useFormik({
    initialValues: initialValues,
    validationSchema: props.loginStatus ? loginSchema : signupSchema,
    onSubmit,
  });

  const handleChange = (name, e) => {
    loginFormik.setFieldValue(name, e.target.value);
    setErrorMessage(false);
  };

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
              <Label className={styles.label}>Username</Label>
              <Input
                id="username"
                placeholder="Username"
                value={loginFormik.values.username}
                onChange={(e) => handleChange("username", e)}
                onBlur={loginFormik.handleBlur}
                autoComplete="off"
                className={
                  loginFormik.errors.username && loginFormik.touched.usernmae
                    ? styles.inputError
                    : styles.input
                }
              />
              {loginFormik.errors.username && loginFormik.touched.username && (
                <p className={styles.error}>{loginFormik.errors.username}</p>
              )}
            </FormGroup>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Email</Label>
              <Input
                id="email"
                placeholder="email@user.com"
                value={loginFormik.values.email}
                onChange={(e) => handleChange("email", e)}
                onBlur={loginFormik.handleBlur}
                autoComplete="off"
                className={
                  loginFormik.errors.email && loginFormik.touched.email
                    ? styles.inputError
                    : styles.input
                }
              />
              {loginFormik.errors.email && loginFormik.touched.email && (
                <p className={styles.error}>{loginFormik.errors.email}</p>
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
                placeholder="Password"
              />
              {loginFormik.errors.password && loginFormik.touched.password && (
                <p className={styles.error}>{loginFormik.errors.password}</p>
              )}
            </FormGroup>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Password Confirmation</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                value={loginFormik.values.passwordConfirmation}
                onChange={(e) => handleChange("passwordConfirmation", e)}
                onBlur={loginFormik.handleBlur}
                className={
                  loginFormik.errors.passwordConfirmation &&
                  loginFormik.touched.passwordConfirmation
                    ? styles.inputError
                    : styles.input
                }
                placeholder="Password Confirmation"
              />
              {loginFormik.errors.passwordConfirmation &&
                loginFormik.touched.passwordConfirmation && (
                  <p className={styles.error}>
                    {loginFormik.errors.passwordConfirmation}
                  </p>
                )}
            </FormGroup>
          </>
        )}

        {props.loginStatus && (
          <>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Email</Label>
              <Input
                id="email"
                placeholder="email@user.com"
                value={loginFormik.values.email}
                onChange={(e) => handleChange("email", e)}
                onBlur={loginFormik.handleBlur}
                autoComplete="off"
                className={
                  loginFormik.errors.email && loginFormik.touched.email
                    ? styles.inputError
                    : styles.input
                }
              />
              {loginFormik.errors.email && loginFormik.touched.email && (
                <p className={styles.error}>{loginFormik.errors.email}</p>
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
                placeholder="Password"
              />
              {loginFormik.errors.password && loginFormik.touched.password && (
                <p className={styles.error}>{loginFormik.errors.password}</p>
              )}
            </FormGroup>
            <FormGroup className={styles.formgroup}>
              {errorMessage && (
                <p className={styles.error}>Email or password is incorrect!</p>
              )}
            </FormGroup>
          </>
        )}
        <div className="d-flex">
          <div className={styles.button}>
            <Button className={styles.buatAkun} type="submit">
              {props.loginStatus ? "Login" : "Sign Up"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FormUser;
