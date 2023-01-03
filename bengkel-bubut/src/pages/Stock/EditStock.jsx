import { Input, Button, Row, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import { MdInventory2 } from "react-icons/md";
import { json, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import { useFormik } from "formik";
import { stockSchema } from "../../components/Schema.jsx";
import moment from "moment";
const EditStock = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authCtx = useContext(AuthContext);
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

  const filteredData = location.state.allData.filter(
    (stock) => stock.id === location.state.id
  );

  const onSubmit = (values) => {
    const submittedData = {
      id: location.state.id,
      name: values.name,
      price: values.price,
      quantity: values.quantity,
      minimumQty: values.minimumQty,
      updated: moment().format(),
    };

    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to update the data?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Update",
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:8080/stock/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify(submittedData),
          })
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              } else {
                await swal.fire(
                  "Updated!",
                  "The Data has been updated.",
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

  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: {
      name: filteredData.map((data) => data.name).toString(),
      price: parseInt(filteredData.map((data) => data.price)),
      quantity: parseInt(filteredData.map((data) => data.quantity)),
      minimumQty: parseInt(filteredData.map((data) => data.minimumQty)),

    },
    validationSchema: stockSchema,
    onSubmit,
  });

  return (
    <div>
      <Row>
        <Breadcrumbs
          icon={icon}
          name="Stock"
          activeName="Edit Stock"
          url="/stock"
        />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <MdInventory2 className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>EDIT STOCK</div>
        </div>
        <Form onSubmit={handleSubmit}>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Item Name</Label>
            <Input
              id="name"
              placeholder="Item Name"
              value={values.name}
              onChange={handleChange}
              className={
                errors.name && touched.name ? styles.inputError : styles.input
              }
            />
            {errors.name && touched.name && (
              <p className={styles.error}>{errors.name}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Price</Label>
            <Input
              id="price"
              placeholder="Nominal Price"
              value={values.price}
              onChange={handleChange}
              className={
                errors.price && touched.price ? styles.inputError : styles.input
              }
            />
            {errors.price && touched.price && (
              <p className={styles.error}>{errors.price}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Quantity</Label>
            <Input
              id="quantity"
              placeholder="Quantity"
              value={values.quantity}
              onChange={handleChange}
              className={
                errors.quantity && touched.quantity
                  ? styles.inputError
                  : styles.input
              }
            />
            {errors.quantity && touched.quantity && (
              <p className={styles.error}>{errors.quantity}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Minimum Quantity</Label>
            <Input
              id="minimumQty"
              placeholder="Minimum Quantity"
              className={
                errors.minimumQty && touched.minimumQty
                  ? styles.inputError
                  : styles.input
              }
              onChange={handleChange}
              value={values.minimumQty}
            />
            {errors.minimumQty && touched.minimumQty && (
              <p className={styles.error}>{errors.minimumQty}</p>
            )}
          </FormGroup>
          <div className="d-flex">
            <div className={styles.button}>
              <Button
                className={styles.batal}
                outline
                onClick={handleClickCancel}
              >
                Cancel
              </Button>
              <Button className={styles.tambahTransaksi} type="submit">
                Update Stock
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditStock;
