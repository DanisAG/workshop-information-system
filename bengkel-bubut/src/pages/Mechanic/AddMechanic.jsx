import { Input, Button, Row, Col, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import React from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GiMechanicGarage } from "react-icons/gi";
import { useFormik } from "formik";
import { mechanicSchema } from "../../components/Schema.jsx";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
import moment from "moment";

const AddMechanic = () => {
  const navigate = useNavigate();
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
    const mechanic = {
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
        text: "Are you sure to add the data?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Add",
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:8080/mechanic/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify(mechanic),
          })
            .then(async (response) => {
              if (!response.ok) {
                console.log(response);
                throw new Error(response.statusText);
              } else {
                await swal.fire(
                  "Added!",
                  "The Data has been added.",
                  "success"
                );
                navigate("/mechanic");
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
  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        dob: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
      },
      validationSchema: mechanicSchema,
      onSubmit,
    });

  return (
    <div>
      <Row>
        <Breadcrumbs
          icon={icon}
          name="Mechanic"
          activeName="Add Mechanic"
          url="/mechanic"
        />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <GiMechanicGarage className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>ADD MECHANIC</div>
        </div>
        <Form onSubmit={handleSubmit}>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Mechanic</Label>
            <Input
              id="name"
              placeholder="Mechanic Name"
              onChange={handleChange}
              className={
                errors.name && touched.name ? styles.inputError : styles.input
              }
              value={values.name}
            />
            {errors.name && touched.name && (
              <p className={styles.error}>{errors.name}</p>
            )}
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Date of Birth</Label>
            <DatePicker
              id="dob"
              selected={values.dob}
              placeholderText="Your Birth Date"
              onChange={(date) => setFieldValue("dob", date)}
              onClickOutside
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
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
              options={options}
              styles={errors.gender && touched.gender ? errorStyle : style}
              className={
                errors.gender && touched.gender
                  ? styles.inputError
                  : styles.input
              }
              value={
                options
                  ? options.find((option) => option.value === values.gender)
                  : ""
              }
              onChange={(option) => setFieldValue("gender", option.value)}
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
              placeholder="Address"
              rows={4}
              onChange={handleChange}
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
              className={
                errors.address && touched.address
                  ? styles.inputError
                  : styles.input
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
              placeholder="Your Email"
              onChange={handleChange}
              className={
                errors.email && touched.email ? styles.inputError : styles.input
              }
            />
            {errors.email && touched.email && (
              <p className={styles.error}>{errors.email}</p>
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
                Add Mechanic
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddMechanic;
