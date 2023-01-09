import { Input, Button, Row, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import { MdInventory2 } from "react-icons/md";
import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import { useFormik } from "formik";
import { changePasswordSchema, stockSchema } from "../../components/Schema.jsx";
import moment from "moment";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const handleClickCancel = () => {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to discard the changes?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Discard",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
  };

  const onSubmit = (values) => {
    const data = {
      id: userData.id,
      password: values.password,
    };

    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to change the password?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Update",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await swal.fire({
            title: "Please Wait...",
            timer: 1000,
            showConfirmButton: false,
            didOpen: () => {
              swal.showLoading();
            },
          });
          await fetch("http://localhost:8080/user/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify(data),
          })
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              } else {
                await swal.fire(
                  "Added!",
                  "The Password has been changed.",
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
  };


  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        oldPassword: "",
        passwordConfirmation: "",
      },
      validationSchema: changePasswordSchema(userData?.password),
      onSubmit,
    });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const data = { token: authCtx.token };
    fetch("http://localhost:8080/user/getbytoken", {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
   console.log(userData?.password);
  // console.log(userData.password)

  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Change Password" />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <MdInventory2 className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>Change Password</div>
        </div>
        <Form onSubmit={handleSubmit}>
        <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Old Password</Label>
            <Input
              id="oldPassword"
              type="password"
              value={values.oldPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.oldPassword && touched.oldPassword
                  ? styles.inputError
                  : styles.input
              }
              placeholder="Old Password"
            />
            {errors.oldPassword && touched.oldPassword && (
              <p className={styles.error}>{errors.oldPassword}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>New Password</Label>
            <Input
              id="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password
                  ? styles.inputError
                  : styles.input
              }
              placeholder="Password"
            />
            {errors.password && touched.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>New Password Confirmation</Label>
            <Input
              id="passwordConfirmation"
              type="password"
              value={values.passwordConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.passwordConfirmation && touched.passwordConfirmation
                  ? styles.inputError
                  : styles.input
              }
              placeholder="Password Confirmation"
            />
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <p className={styles.error}>{errors.passwordConfirmation}</p>
            )}
          </FormGroup>
          <div className={styles.formgroupButton}>
            <div className={styles.button}>
              <Button
                className={styles.batal}
                outline
                onClick={handleClickCancel}
              >
                Cancel
              </Button>
              <Button
                className={styles.tambahTransaksi}
                type="submit"
              >
                Update Password
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
