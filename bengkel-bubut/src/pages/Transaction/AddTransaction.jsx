import { Input, Button, Row, Col, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import Select from "react-select";
import { AiOutlineTransaction } from "react-icons/ai";
import DatePicker from "react-datepicker";
import { BsFillCalendar2RangeFill } from "react-icons/bs";
import React, { useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import { useEffect } from "react";
import { useFormik } from "formik";
import { transactionSchema } from "../../components/Schema.jsx";
import moment from "moment";
const AddTransaction = (props) => {
  const navigate = useNavigate();
  const [allCustomers, setAllCustomers] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [allMechanics, setAllMechanics] = useState([]);

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
    { value: "Customization", label: "Customization" },
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

  const authCtx = useContext(AuthContext);

  const getAllCustomers = () => {
    fetch("http://localhost:8080/customer/getAll", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setAllCustomers(result);
      });
  };

  const getAllStocks = () => {
    fetch("http://localhost:8080/stock/getAll", {
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
        console.log(result);
        setAllStocks(result);
      });
  };

  const getAllMechanics = () => {
    fetch("http://localhost:8080/mechanic/getAll", {
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

  useEffect(() => {
    // getAllStocks();
    getAllCustomers();
    getAllMechanics();
  }, []);
  // console.log(allCustomers);
  // console.log(allMechanics);
  // console.log(allStocks);

  const onSubmit = (values) => {
    const transaction = {
      name: values.name,
      Type: values.Type,
      Mechanic: values.Mechanic,
      Customer: values.Customer,
      Stock: values.Stock,
      Price: values.Price,
      Quantity: values.Quantity,
    };

    console.log(transaction);

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
      .then((result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:8080/transaction/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify(transaction),
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

  const { handleSubmit, handleChange, values, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        Type: "",
        Mechanic: "",
        Customer: "",
        Stock: "",
        Price: "",
        Quantity: "",
      },
      // validationSchema: transactionSchema,
      onSubmit,
    });
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
          <div className={styles.title}>ADD TRANSACTION</div>
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
              options={customerOptions}
              styles={style}
              className={styles.input}
              maxMenuHeight={500}
              placeholder="Customer Name"
            />
            {errors.Customer && touched.Customer && (
              <p className={styles.error}>{errors.Customer}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Mechanic</Label>
            <Select
              id="Mechanic"
              options={mechanicOptions}
              styles={errors.Mechanic && touched.Mechanic ? errorStyle : style}
              className={
                errors.Mechanic && touched.Mechanic
                  ? styles.inputError
                  : styles.input
              }
              value={
                mechanicOptions
                  ? mechanicOptions.find(
                      (option) => option.value === values.Mechanic
                    )
                  : ""
              }
              onChange={(option) => setFieldValue("Mechanic", option.value)}
              maxMenuHeight={500}
              placeholder="Mechanic Name"
            />
            {errors.Mechanic && touched.Mechanic && (
              <p className={styles.error}>{errors.Mechanic}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Service</Label>
            <Select
              id="Type"
              options={serviceOptions}
              styles={errors.Type && touched.Type ? errorStyle : style}
              className={
                errors.Type && touched.Type ? styles.inputError : styles.input
              }
              value={
                serviceOptions
                  ? serviceOptions.find(
                      (option) => option.value === values.Type
                    )
                  : ""
              }
              onChange={(option) => setFieldValue("Mechanic", option.value)}
              placeholder="Select Service"
            />
            {errors.Type && touched.Type && (
              <p className={styles.error}>{errors.Type}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Item</Label>
            {/* <Select
              id="Stock"
              options={stockOptions}
              styles={errors.Stock && touched.Stock ? errorStyle : style}
              className={
                errors.Stock && touched.Stock ? styles.inputError : styles.input
              }
              value={
                serviceOptions
                  ? serviceOptions.find(
                      (option) => option.value === values.Stock
                    )
                  : ""
              }
              onChange={(option) => setFieldValue("Mechanic", option.value)}
              maxMenuHeight={500}
              placeholder="Item Name"
            /> */}
            <Input
              placeholder="Stock"
              id="Stock"
              onChange={handleChange}
              value={values.Stock}
              className={
                errors.Stock && touched.Stock
                  ? styles.inputError
                  : styles.input
              }
            />
            {errors.Stock && touched.Stock && (
              <p className={styles.error}>{errors.Stock}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Quantity</Label>
            <Input
              placeholder="Quantity"
              id="Quantity"
              onChange={handleChange}
              value={values.Quantity}
              className={
                errors.Quantity && touched.Quantity
                  ? styles.inputError
                  : styles.input
              }
            />
            {errors.Quantity && touched.Quantity && (
              <p className={styles.error}>{errors.Quantity}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Price</Label>
            <Input
              placeholder="Price"
              id="Price"
              onChange={handleChange}
              value={values.Price}
              className={
                errors.Price && touched.Price ? styles.inputError : styles.input
              }
            />
            {errors.Price && touched.Price && (
              <p className={styles.error}>{errors.Price}</p>
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
                Add Transaction
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddTransaction;
