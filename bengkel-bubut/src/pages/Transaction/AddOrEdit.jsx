import { Input, Button, Row, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import Select from "react-select";
import { AiOutlineTransaction } from "react-icons/ai";
import React, { useState } from "react";
import swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import { useEffect } from "react";
import { useFormik } from "formik";
import { transactionSchema } from "../../components/Schema.jsx";
import moment from "moment";

const AddOrEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allCustomers, setAllCustomers] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [allMechanics, setAllMechanics] = useState([]);
  const [quantityById, setQuantityById] = useState();
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      borderRadius: 12,
    }),
  };
  const errorStyle = {
    control: (base) => ({
      ...base,
      background: "#ffffff",
      boxShadow: "none",
      borderRadius: 12,
      borderColor: "#fc8181",
    }),
  };
  const serviceOptions = [
    { value: "Repair", label: "Repair" },
    { value: "Custom", label: "Custom" },
    { value: "Fabrication", label: "Fabrication" },
  ];

  const customerOptions = allCustomers.map(function (data) {
    return { value: data.id, label: data.name };
  });

  const mechanicOptions = allMechanics.map(function (data) {
    return { value: data.id, label: data.name };
  });

  const stockOptions = allStocks?.map(function (data) {
    return { value: data.id, label: data.name };
  });

  const statusOptions = [
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];

  const authCtx = useContext(AuthContext);

  const getAllCustomers = async () => {
    await fetch("http://localhost:8080/customer/getAll", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setAllCustomers(result);
      });
  };

  const getAllStocks = async () => {
    await fetch("http://localhost:8080/stock/getAll", {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          // eslint-disable-next-line no-throw-literal
          throw "Error";
        }
        return res.json();
      })
      .then((result) => {
        setAllStocks(result.stock);
      });
  };

  const getAllMechanics = async () => {
    await fetch("http://localhost:8080/mechanic/getAll", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setAllMechanics(result);
      });
  };

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

  useEffect(() => {
    getAllStocks();
    getAllCustomers();
    getAllMechanics();
  }, []);

  console.log(location.state.allData);

  const filteredData = location.state.allData.filter(
    (data) => data.id === location.state.id
  );

  const onSubmit = (values) => {
    const getCustomerId =
      typeof values.customer === "string"
        ? allCustomers.find((data) => data.name === values.customer)?.id
        : values.customer;

    const getMechanicId =
      typeof values.mechanic === "string"
        ? allMechanics.find((data) => data.name === values.mechanic)?.id
        : values.mechanic;

    const getStockId =
      typeof values.stock === "string"
        ? allStocks.find((data) => data.name === values.stock)?.id
        : values.stock;

    const transaction =
      location.state.status === "Add"
        ? {
            name: values.name,
            type: values.type,
            mechanic: values.mechanic,
            customer: values.customer,
            stock: values.stock,
            price: values.price,
            quantity: values.quantity,
            status: values.status,
          }
        : {
            id: location.state.id,
            name: values.name,
            type: values.type,
            mechanic: getMechanicId,
            customer: getCustomerId,
            stock: getStockId,
            price: values.price,
            quantity: values.quantity,
            status: values.status,
          };

    console.log(transaction);

    swal
      .fire({
        title: "Confirmation",
        text:
          location.state.status === "Add"
            ? "Are you sure to add the data?"
            : "Are you sure to update the data?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: location.state.status === "Add" ? "Add" : "Update",
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            location.state.status === "Add"
              ? location.state.allTableDatas.addAPI
              : location.state.allTableDatas.updateAPI,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authCtx.token}`,
              },
              body: JSON.stringify(transaction),
            }
          )
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              } else {
                location.state.status === "Add"
                  ? await swal.fire(
                      "Added!",
                      "The Data has been added.",
                      "success"
                    )
                  : await swal.fire(
                      "Updated!",
                      "The Data has been updated.",
                      "success"
                    );
                navigate("/transaction");
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

  const initialValues =
    location.state.status === "Add"
      ? {
          name: "",
          type: "",
          mechanic: "",
          customer: "",
          stock: "",
          price: "",
          quantity: "",
          status: "",
        }
      : {
          name: filteredData.map((data) => data.name).toString(),
          type: filteredData.map((data) => data.type).toString(),
          mechanic: filteredData.map((data) => data.mechanic).toString(),
          customer: filteredData.map((data) => data.customer).toString(),
          stock: filteredData.map((data) => data.stock).toString(),
          price:
            isNaN(parseInt(filteredData.map((data) => data.price)))
              ? parseInt(filteredData.map((data) => data.sale))
              : parseInt(filteredData.map((data) => data.price)),
          quantity: parseInt(filteredData.map((data) => data.quantity)),
          status: filteredData.map((data) => data.status).toString(),
        };

  const quantity =
    quantityById &&
    allStocks.find((data) => data.id === quantityById)?.quantity;

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema:
      location.state.status === "Add"
        ? transactionSchema(quantity + 1)
        : transactionSchema(Infinity),
    onSubmit,
  });

  console.log(quantityById);

  console.log(quantity);

  return (
    <div>
      <Row>
        <Breadcrumbs
          icon={icon}
          name="Transaction"
          activeName="Add Transaction"
          url="/transaction"
        />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <AiOutlineTransaction className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>
            {location.state.status === "Add"
              ? "ADD TRANSACTION"
              : "EDIT TRANSACTION"}{" "}
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Transaction Name</Label>
            <Input
              placeholder="Transaction Name"
              id="name"
              onChange={handleChange}
              value={values.name}
              className={
                errors.name && touched.name ? styles.inputError : styles.input
              }
            />
            {errors.name && touched.name && (
              <p className={styles.error}>{errors.name}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Customer</Label>
            <Select
              id="customer"
              options={customerOptions}
              styles={errors.customer && touched.customer ? errorStyle : style}
              className={
                errors.customer && touched.customer
                  ? styles.inputError
                  : styles.input
              }
              value={
                customerOptions
                  ? customerOptions.find(
                      (option) => option.label === values.customer
                    )
                  : ""
              }
              onChange={(option) => setFieldValue("customer", option.value)}
              maxMenuHeight={500}
              placeholder="Customer Name"
            />
            {errors.customer && touched.customer && (
              <p className={styles.error}>{errors.customer}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Mechanic</Label>
            <Select
              id="mechanic"
              options={mechanicOptions}
              styles={errors.mechanic && touched.mechanic ? errorStyle : style}
              className={
                errors.mechanic && touched.mechanic
                  ? styles.inputError
                  : styles.input
              }
              value={
                mechanicOptions
                  ? mechanicOptions.find(
                      (option) => option.label === values.mechanic
                    )
                  : ""
              }
              onChange={(option) => setFieldValue("mechanic", option.value)}
              maxMenuHeight={500}
              placeholder="Mechanic Name"
            />
            {errors.mechanic && touched.mechanic && (
              <p className={styles.error}>{errors.mechanic}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Service</Label>
            <Select
              id="type"
              options={serviceOptions}
              styles={errors.type && touched.type ? errorStyle : style}
              className={
                errors.type && touched.type ? styles.inputError : styles.input
              }
              value={
                serviceOptions
                  ? serviceOptions.find(
                      (option) => option.value === values.type
                    )
                  : ""
              }
              onChange={(option) => setFieldValue("type", option.value)}
              placeholder="Select Service"
            />
            {errors.type && touched.type && (
              <p className={styles.error}>{errors.type}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Item</Label>
            <Select
              id="stock"
              options={stockOptions}
              styles={errors.stock && touched.stock ? errorStyle : style}
              className={
                errors.stock && touched.stock ? styles.inputError : styles.input
              }
              value={
                stockOptions
                  ? stockOptions.find((option) => option.label === values.stock)
                  : ""
              }
              onChange={(option) => {
                setFieldValue("stock", option.value);
                setQuantityById(option.value);
              }}
              maxMenuHeight={500}
              placeholder="Item Name"
            />
            {errors.stock && touched.stock && (
              <p className={styles.error}>{errors.stock}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Quantity</Label>
            {location.state.status === "Add" ? (
              <Input
                placeholder="Quantity"
                id="quantity"
                type="number"
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
                value={values.quantity}
                className={
                  errors.quantity && touched.quantity
                    ? styles.inputError
                    : styles.input
                }
              />
            ) : (
              <Input
                disabled
                placeholder="Quantity"
                id="quantity"
                type="number"
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
                value={values.quantity}
                className={
                  errors.quantity && touched.quantity
                    ? styles.inputError
                    : styles.input
                }
              />
            )}
            {errors.quantity && touched.quantity && (
              <p className={styles.error}>{errors.quantity}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Price</Label>
            <Input
              placeholder="Price"
              id="price"
              onChange={handleChange}
              value={values.price}
              className={
                errors.price && touched.price ? styles.inputError : styles.input
              }
            />
            {errors.price && touched.price && (
              <p className={styles.error}>{errors.price}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Status</Label>
            <Select
              id="status"
              options={statusOptions}
              styles={errors.status && touched.status ? errorStyle : style}
              className={
                errors.status && touched.status
                  ? styles.inputError
                  : styles.input
              }
              value={
                statusOptions
                  ? statusOptions.find(
                      (option) => option.value === values.status
                    )
                  : ""
              }
              onChange={(option) => setFieldValue("status", option.value)}
              maxMenuHeight={500}
              placeholder="Status"
            />
            {errors.stock && touched.stock && (
              <p className={styles.error}>{errors.stock}</p>
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
                {location.state.status === "Add"
                  ? "Add Transaction"
                  : "Update Transaction"}{" "}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddOrEdit;
