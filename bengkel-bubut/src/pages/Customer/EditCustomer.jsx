import { Input, Button, Row, Col, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import Select from "react-select";
import {MdSupervisedUserCircle} from 'react-icons/md';
import DatePicker from "react-datepicker";
import React, { useState,useEffect } from "react";
import swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { customerSchema } from "../../components/Schema.jsx";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import moment from "moment";

const EditCustomer = (props) => {
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
  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
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

  const authCtx = useContext(AuthContext);

  const onSubmit = (values) => {
    const customer = {
      id: location.state.id,
      name: values.name,
      dob: values.dob,
      gender: values.gender,
      address: values.address,
      phone: values.phone,
      email: values.email,
      updated: moment().format()
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
          await fetch("http://localhost:8080/customer/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify(customer),
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
                navigate("/customer");
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


  const filteredData = location.state.allData.filter(
    (customer) => customer.id === location.state.id);


  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        name: filteredData.map(data=> data.name).toString(),
        dob: moment(filteredData.map(data=> data.dob)).toDate(),
        gender: filteredData.map(data=> data.gender).toString(),
        address: filteredData.map(data=> data.address).toString(),
        phone: filteredData.map(data=> data.phone).toString(),
        email: filteredData.map(data=> data.email).toString(),
      },
      validationSchema: customerSchema,
      onSubmit,
    });

  
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} name="Customer" activeName="Add Customer" url="/customer" />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <MdSupervisedUserCircle className={styles.iconForForm} size={40}/>
          </div>
          <div className={styles.title}>EDIT CUSTOMER</div>
        </div>
        <Form onSubmit={handleSubmit}>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Customer</Label>
            <Input
              id="name"
              placeholder="Customer Name"
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
            <Label className={styles.label}>Date Of Birth</Label>
            <DatePicker
              id="dob"
              name="dob"
              selected={values.dob}
              onChange={(date) => setFieldValue("dob", date)}
              onClickOutside
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
              placeholderText="Your Birth Date"
              className={
                errors.dob && touched.dob
                  ? styles.datepickerError
                  : styles.datepicker
              }
            />
            {errors.dob && touched.dob && (
              <p className={styles.error}>{errors.dob}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Gender</Label>
            <Select
              id="gender"
              value={
                options
                  ? options.find((option) => option.value === values.gender)
                  : ""
              }
              onChange={(option) => setFieldValue("gender", option.value)}
              options={options}
              styles={errors.gender && touched.gender ? errorStyle : style}
              className={
                errors.gender && touched.gender
                  ? styles.inputError
                  : styles.input
              }
              placeholder="Select Your Gender"
            />
            {errors.gender && touched.gender && (
              <p className={styles.error}>{errors.gender}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Address</Label>
            <Input
              id="address"
              type="textarea"
              placeholder="Write Your Address"
              rows={4}
              onChange={handleChange}
              value={values.address}
              className={
                errors.address && touched.address
                  ? styles.inputError
                  : styles.input
              }
            />
            {errors.address && touched.address && (
              <p className={styles.error}>{errors.address}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Phone Number</Label>
            <Input
              id="phone"
              placeholder="Your Phone Number"
              onChange={handleChange}
              value={values.phone}
              className={
                errors.phone && touched.phone ? styles.inputError : styles.input
              }
            />
            {errors.phone && touched.phone && (
              <p className={styles.error}>{errors.phone}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Email</Label>
            <Input
              id="email"
              placeholder="Customer Email"
              onChange={handleChange}
              value={values.email}
              className={
                errors.email && touched.email ? styles.inputError : styles.input
              }
            />
            {errors.email && touched.email && (
              <p className={styles.error}>{errors.email}</p>
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
                Update Customer
              </Button>
            </div>
          </div>
        </Form>
      
      </div>
    </div>
  );
};

export default EditCustomer;
