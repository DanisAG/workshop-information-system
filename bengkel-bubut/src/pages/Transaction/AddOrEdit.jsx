import { Input, Button, Row, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import Select from "react-select";
import { AiFillDelete, AiOutlineTransaction } from "react-icons/ai";
import React, { useState } from "react";
import swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import { useEffect } from "react";
import { useFormik } from "formik";
import {
  transactionEditSchema,
  transactionSchema,
} from "../../components/Schema.jsx";

const AddOrEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allCustomers, setAllCustomers] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [allMechanics, setAllMechanics] = useState([]);
  const [quantityById, setQuantityById] = useState();
  const [stockFields, setStockFields] = useState([
    { stock: "", quantity: "", maxQty: 0 },
  ]);
  const [validation, setValidation] = useState({ stock: true, quantity: true });
  const [refresh, setRefresh] = useState(true);
  const [messageStatus, setMessageStatus] = useState(false);

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
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

  const checkIfDuplicateExists = (arr) => {
    return new Set(arr).size !== arr.length;
  };

  const authCtx = useContext(AuthContext);

  const getAllCustomers = async () => {
    await fetch("http://localhost:8090/customer/getAll", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setAllCustomers(result);
      });
  };

  const getAllStocks = async () => {
    await fetch("http://localhost:8090/stock/getAll", {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
      method: "GET",
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
    await fetch("http://localhost:8090/mechanic/getAll", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
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

  const filteredData = location.state.allData.filter(
    (data) => data.id === location.state.id
  );

  const onSubmit = (values) => {
    if (validation.stock && validation.quantity && !messageStatus) {
      let arrayStock = [];
      let arrayQuantity = [];

      stockFields.map((item) => {
        if (item.stock !== "") arrayStock.push(item.stock);

        if (item.quantity === "") {
          item.quantity = "0";
        }
        if (item.stock !== "") {
          arrayQuantity.push(item.quantity);
        }
      });

      console.log(stockFields);

      const finalStock = arrayStock.join(";");
      const finalQuantity = arrayQuantity.join(";");

      const getCustomerId =
        typeof values.customer === "string"
          ? allCustomers.find((data) => data.name === values.customer)?.id
          : values.customer;

      const getMechanicId =
        typeof values.mechanic === "string"
          ? allMechanics.find((data) => data.name === values.mechanic)?.id
          : values.mechanic;

      const transaction =
        location.state.status === "Add"
          ? {
              name: values.name,
              type: values.type,
              mechanic: values.mechanic,
              customer: values.customer,
              stock: finalStock,
              price: values.price,
              quantity: finalQuantity,
              status: values.status,
            }
          : {
              id: location.state.id,
              name: values.name,
              type: values.type,
              mechanic: getMechanicId,
              customer: getCustomerId,
              stock: finalStock,
              price: values.price,
              quantity: finalQuantity,
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
            await fetch(
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
          price: isNaN(parseInt(filteredData.map((data) => data.price)))
            ? parseInt(filteredData.map((data) => data.sale))
            : parseInt(filteredData.map((data) => data.price)),
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
    initialValues: { ...initialValues },
    validationSchema:
      location.state.status === "Add"
        ? transactionSchema(quantity + 1)
        : transactionEditSchema(),
    onSubmit,
  });

  const arrStock = () => {
    let arrStock = [];
    stockFields.map((item) => {
      arrStock.push(item.stock);
    });
    return arrStock;
  };

  console.log(validation);
  const handleStockField = (event, index) => {
    let data = [...stockFields];
    data[index].stock = event.value.toString();
    data[index].maxQty = allStocks.find(
      (data) => data.name == event.label
    )?.quantity;

    const temp = arrStock();
    console.log(checkIfDuplicateExists(temp));
    if (checkIfDuplicateExists(temp))
      setValidation({ ...validation, stock: false });
    else if (!checkIfDuplicateExists(temp))
      setValidation({ ...validation, stock: true });
    data[index].checkDuplicate = checkIfDuplicateExists(temp);

    if (data[index].stock == "") {
      data[index].checkFilled = false;
      setValidation({ ...validation, stock: false });
      setMessageStatus(true);
    } else if (data[index].stock !== "" && !checkIfDuplicateExists(temp)) {
      data[index].checkFilled = true;
      setValidation({ ...validation, stock: true });
      setMessageStatus(false);
    }

    setStockFields(data);
    setQuantityById(event.value);
    setFieldValue(`stock`, event.value);
  };

  const handleQuantityField = (event, index) => {
    const textboxText = event.target.value.replace(/^0+/, "");
    let data = [...stockFields];
    data[index].quantity = textboxText;
    if (event.target.value > data[index].maxQty)
      setValidation({ ...validation, quantity: false });
    else setValidation({ ...validation, quantity: true });
    setStockFields(data);
    setFieldValue(`quantity`, event.target.value);
  };

  const addFields = () => {
    let object = {
      stock: "",
      quantity: "",
      checkDuplicate: false,
      checkFilled: true,
    };
    let check = true;
    stockFields.map((data) => {
      if (data.stock == "") {
        check = false;
        setMessageStatus(true);
      }
    });
    if (check) setStockFields([...stockFields, object]);
  };

  const removeField = (index) => {
    let data = [...stockFields];
    data.splice(index, 1);
    setStockFields(data);
    setMessageStatus(false);
  };

  useEffect(() => {
    getAllStocks();
    getAllCustomers();
    getAllMechanics();

    if (location.state.status === "Edit") {
      let temp = [];
      filteredData.map((data) => {
        data.stock.map((stockData) => {
          console.log(arrStock());
          const maxQty = location.state.allStocks2?.find(
            (dataStock2) => dataStock2.id == stockData.id
          ).quantity;
          temp.push({
            stock: stockData.id.toString(),
            quantity: stockData.quantity.toString(),
            maxQty: maxQty,
            checkDuplicate: false,
            checkFilled: true,
          });
        });
      });
      setStockFields(temp);
    }
  }, []);
  console.log(filteredData, "filteredData");
  console.log(location.state.allData)

  return (
    <div>
      <Row>
        <Breadcrumbs
          icon={icon}
          name="Transaction"
          activeName={
            location.state.status === "Add"
              ? "Add Transaction"
              : "Edit Transaction"
          }
          url="/transaction"
        />
      </Row>
      <div className={styles.cardTransaction}>
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
          <div className={styles.cardStockDetail}>
            <div className={styles.header}>
              <Button
                style={{ backgroundColor: "#6f6af8" }}
                onClick={addFields}
              >
                Add More
              </Button>
              <div className={styles.title}>STOCK DETAILS</div>
            </div>
            <div className={styles.stockDetailDiv}>
              {stockFields.map((data, index) => {
                console.log(data);
                return (
                  <div key={index} className={styles.selectDiv}>
                    <FormGroup className={styles.formgroupStocks}>
                      <Label className={styles.label}>Item</Label>
                      <Select
                        id={`stock`}
                        name="stock"
                        options={stockOptions}
                        isClearable
                        styles={
                          (errors.stock && touched.stock) ||
                          (data.checkDuplicate && arrStock().length > 1) ||
                          (messageStatus && index === stockFields.length - 1)
                            ? errorStyle
                            : style
                        }
                        className={
                          (errors.stock && touched.stock) ||
                          (data.checkDuplicate && arrStock().length > 1) ||
                          (messageStatus && index === stockFields.length - 1)
                            ? styles.inputErrorStock
                            : styles.inputStock
                        }
                        value={
                          stockOptions &&
                          stockOptions.find(
                            (option) => option.value == data.stock
                          )
                        }
                        onChange={(event) => handleStockField(event, index)}
                        maxMenuHeight={500}
                        placeholder="Item Name"
                      />
                      {errors.stock && touched.stock ? (
                        <p className={styles.error}>{errors.stock}</p>
                      ) : data.checkDuplicate ? (
                        <p className={styles.error}>
                          The Item you input already exists
                        </p>
                      ) : data.checkFilled == false ? (
                        <p className={styles.error}>
                          Item field cannot be empty
                        </p>
                      ) : messageStatus && index === stockFields.length - 1 ? (
                        <p className={styles.errorForStockMsg}>
                          Input the empty field first before adding another one
                        </p>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup
                      className={styles.formgroupStocks}
                      style={{ marginRight: "0px !important" }}
                    >
                      <Label className={styles.label}>Quantity</Label>
                      {location.state.status === "Add" ? (
                        <Input
                          placeholder="Quantity"
                          id="quantity"
                          type="number"
                          onChange={(event) =>
                            handleQuantityField(event, index)
                          }
                          value={data.quantity || 0}
                          className={
                            (errors.quantity && touched.quantity) ||
                            data.maxQty < data.quantity
                              ? styles.inputErrorQuantity
                              : styles.inputQuantity
                          }
                        />
                      ) : (
                        <Input
                        disabled
                          placeholder="Quantity"
                          id="quantity"
                          name="quantity"
                          type="number"
                          onChange={(event) =>
                            handleQuantityField(event, index)
                          }
                          onBlur={handleBlur}
                          value={data.quantity || 0}
                          className={
                            (errors.quantity && touched.quantity) ||
                            data.maxQty < data.quantity
                              ? styles.inputErrorQuantity
                              : styles.inputQuantity
                          }
                        />
                      )}
                      {errors.quantity && touched.quantity && (
                        <p className={styles.error}>{errors.quantity}</p>
                      )}
                      {data.maxQty < data.quantity && (
                        <p className={styles.errorForQuantityMsg}>
                          The quantity exceeds the number of stocks available
                          which is {data.maxQty}
                        </p>
                      )}
                    </FormGroup>
                    <div className={styles.delete}>
                      {stockFields.length > 1 ? (
                        <AiFillDelete
                          size={35}
                          onClick={() => removeField(index)}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
            {errors.status && touched.status && (
              <p className={styles.error}>{errors.status}</p>
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
