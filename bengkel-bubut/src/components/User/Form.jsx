import { Input, Button, FormGroup, Form, Label } from "reactstrap";
import styles from "../../styles/FormUser.module.css";
import React, { useState, useContext } from "react";
import swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema, signupSchema } from "../Schema";
import AuthContext from "../store/AuthContext.jsx";
import { useRef } from "react";
import { useEffect } from "react";
const FormUser = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(false);
  const [allStocks, setAllStocks] = useState([]);
  const [error, setError] = useState("");
  const getAllStocks = async (token) => {
    await fetch("http://localhost:8080/stock/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET"
    })
      .then((res) => {
        if (!res.ok) {
          // eslint-disable-next-line no-throw-literal
          throw "Error";
        }
        return res.json();
      })
      .then((result) => {
        console.log(result)
        setAllStocks(result.stock);
      });
  };

  console.log(allStocks)
  console.log(authCtx.token)

  const onSubmit = (values) => {
    let filteredStocks = [];
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
        .then(async(data) => {
          if (
            data.user.password !== values.password ||
            data.user.email !== values.email
          ) {
            setErrorMessage(true);
            return;
          }
          console.log(data.user)
          await fetch("http://localhost:8080/stock/getAll", {
            headers: {
              Authorization: `Bearer ${data.user.token}`,
            },
            method: "GET"
          })
            .then((res) => {
              if (!res.ok) {
                // eslint-disable-next-line no-throw-literal
                throw "Error";
              }
              return res.json();
            })
            .then((result) => {
              console.log(result)
              filteredStocks = result.stock
              setAllStocks(result.stock);
            });
          console.log(allStocks)
          filteredStocks = filteredStocks?.filter(
            (data) => data.quantity < data.minimumQty
          );
          console.log(filteredStocks)
          authCtx.login(data.user.token, data.user.expiredDate, filteredStocks);
         
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
