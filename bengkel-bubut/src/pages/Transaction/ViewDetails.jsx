import { Input, Row, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import Select from "react-select";
import { AiOutlineTransaction } from "react-icons/ai";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import { useEffect } from "react";
import { useFormik } from "formik";

const ViewDetails = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [allMechanics, setAllMechanics] = useState([]);
  const location = useLocation();
  const [stockFields, setStockFields] = useState([
    { stock: "", quantity: "", maxQty: 0 },
  ]);
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      borderRadius: 12,
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

  const filteredData = location.state.allData.filter(
    (data) => data.id === location.state.id
  );

  const initialValues = {
    name: filteredData.map((data) => data.name).toString(),
    type: filteredData.map((data) => data.type).toString(),
    mechanic: filteredData.map((data) => data.mechanic).toString(),
    customer: filteredData.map((data) => data.customer).toString(),
    price: isNaN(parseInt(filteredData.map((data) => data.price)))
      ? parseInt(filteredData.map((data) => data.sale))
      : parseInt(filteredData.map((data) => data.price)),
    status: filteredData.map((data) => data.status).toString(),
  };

  const { values } = useFormik({
    initialValues: { ...initialValues },
  });

  const authCtx = useContext(AuthContext);

  const getAllCustomers = async () => {
    await fetch("http://localhost:8080/customer/getAll", {
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
    await fetch("http://localhost:8080/stock/getAll", {
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
    await fetch("http://localhost:8080/mechanic/getAll", {
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

  useEffect(() => {
    getAllStocks();
    getAllCustomers();
    getAllMechanics();

    let temp = [];
    filteredData.map((data) => {
      data.stock.map((stockData) => {
        const maxQty = location.state.allStocks2.find(
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
  }, []);

  return (
    <div>
      <Row>
        <Breadcrumbs
          icon={icon}
          name="Transaction"
          activeName="View Transaction"
          url="/transaction"
        />
      </Row>
      <div className={styles.cardTransaction}>
        <div className={styles.header}>
          <div>
            <AiOutlineTransaction className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>VIEW DETAIL TRANSACTION</div>
        </div>
        <Form>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Transaction Name</Label>
            <Input disabled value={values.name} className={styles.input} />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Customer</Label>
            <Select
              id="customer"
              isDisabled
              options={customerOptions}
              styles={style}
              className={styles.input}
              value={
                customerOptions
                  ? customerOptions.find(
                      (option) => option.label === values.customer
                    )
                  : ""
              }
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Mechanic</Label>
            <Select
              isDisabled
              options={mechanicOptions}
              styles={style}
              className={styles.input}
              value={
                mechanicOptions
                  ? mechanicOptions.find(
                      (option) => option.label === values.mechanic
                    )
                  : ""
              }
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Service</Label>
            <Select
              isDisabled
              options={serviceOptions}
              styles={style}
              className={styles.input}
              value={
                serviceOptions
                  ? serviceOptions.find(
                      (option) => option.value === values.type
                    )
                  : ""
              }
            />
          </FormGroup>
          <div className={styles.cardStockDetail}>
            <div className={styles.header}>
              <div className={styles.titleForView}>STOCK DETAILS</div>
            </div>
            <div className={styles.stockDetailDiv}>
              {stockFields.map((data, index) => {
                return (
                  <div key={index} className={styles.selectDiv}>
                    <FormGroup className={styles.formgroupStocks}>
                      <Label className={styles.label}>Item</Label>
                      <Select
                        id={`stock`}
                        name="stock"
                        isDisabled
                        options={stockOptions}
                        isClearable
                        styles={style}
                        className={styles.inputStock}
                        value={
                          stockOptions &&
                          stockOptions.find(
                            (option) => option.value == data.stock
                          )
                        }
                      />
                    </FormGroup>
                    <FormGroup
                      className={styles.formgroupStocks}
                      style={{ marginRight: "0px !important" }}
                    >
                      <Label className={styles.label}>Quantity</Label>
                      <Input
                        disabled
                        type="number"
                        value={data.quantity || 0}
                        className={styles.inputQuantity}
                      />
                    </FormGroup>
                  </div>
                );
              })}
            </div>
          </div>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Price</Label>
            <Input disabled value={values.price} className={styles.input} />
          </FormGroup>
          <FormGroup
            className={styles.formgroup}
            style={{ paddingBottom: "2rem" }}
          >
            <Label className={styles.label}>Status</Label>
            <Select
              isDisabled
              options={statusOptions}
              styles={style}
              className={styles.input}
              value={
                statusOptions
                  ? statusOptions.find(
                      (option) => option.value === values.status
                    )
                  : ""
              }
            />
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default ViewDetails;
