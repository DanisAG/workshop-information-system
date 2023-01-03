import { Input, Button, Row, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import { MdInventory2 } from "react-icons/md";
import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import { useFormik } from "formik";
import { stockSchema } from "../../components/Schema.jsx";
import moment from "moment";

const AddStock = () => {
  const navigate = useNavigate();
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
    const stock = {
      name: values.name,
      price: values.price,
      quantity: values.quantity,
      updated: moment().format(),
      created: moment().format()
    };


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
         await fetch("http://localhost:8080/stock/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify(stock),
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
  };

  const stockFormik = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
    },
    validationSchema: stockSchema,
    onSubmit,
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:8080/stock/getAll", {
      method: "GET",
      headers: { Authorization: `Bearer ${authCtx.token}` },
    })
      .then((res) => res.json())
      .then((result) => {
      });
  }, []);
  return (
    <div>
      <Row>
        <Breadcrumbs
          icon={icon}
          name="Stock"
          activeName="Add Stock"
          url="/stock"
        />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <MdInventory2 className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>Add Stock</div>
        </div>
        <Form onSubmit={stockFormik.handleSubmit}>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Item Name</Label>
            <Input
              id="name"
              placeholder="Item Name"
              onChange={stockFormik.handleChange}
              value={stockFormik.values.name}
              className={
                stockFormik.errors.name && stockFormik.touched.name
                  ? styles.inputError
                  : styles.input
              }
            />
            {stockFormik.errors.name && stockFormik.touched.name && (
              <p className={styles.error}>{stockFormik.errors.name}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Price</Label>
            <Input
              id="price"
              placeholder="Price"
              onChange={stockFormik.handleChange}
              value={stockFormik.values.price}
              className={
                stockFormik.errors.price && stockFormik.touched.price
                  ? styles.inputError
                  : styles.input
              }
            />
            {stockFormik.errors.price && stockFormik.touched.price && (
              <p className={styles.error}>{stockFormik.errors.price}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Stock</Label>
            <Input
              id="quantity"
              placeholder="Quantity"
              className={
                stockFormik.errors.quantity && stockFormik.touched.quantity
                  ? styles.inputError
                  : styles.input
              }
              onChange={stockFormik.handleChange}
              value={stockFormik.values.quantity}
            />
            {stockFormik.errors.quantity && stockFormik.touched.quantity && (
              <p className={styles.error}>{stockFormik.errors.quantity}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Minimum Quantity</Label>
            <Input
              id="minimumQty"
              placeholder="Minimum Quantity"
              className={
                stockFormik.errors.minimumQty && stockFormik.touched.minimumQty
                  ? styles.inputError
                  : styles.input
              }
              onChange={stockFormik.handleChange}
              value={stockFormik.values.minimumQty}
            />
            {stockFormik.errors.minimumQty && stockFormik.touched.minimumQty && (
              <p className={styles.error}>{stockFormik.errors.minimumQty}</p>
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
              <Button
                className={styles.tambahTransaksi}
                // onClick={(e) => handleClick(e)}
                type="submit"
              >
                Add Stock
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddStock;
