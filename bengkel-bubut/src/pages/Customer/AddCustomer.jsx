import { Input, Button, Row, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import Select from "react-select";
import { MdSupervisedUserCircle } from "react-icons/md";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";

const AddCustomer = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state.userId);
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      borderRadius: 12,
    }),
  };
  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const handleChange = (gender) => {
    setGender(gender.value);
  }

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

  const [name, setName] = useState("");
  const [dob, setDob] = useState();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const customer = { name, dob, gender, address, phone, email };

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
          fetch("http://localhost:8080/customer/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify(customer),
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
  return (
    <div>
      <Row>
        <Breadcrumbs
          icon={icon}
          name="Pelanggan"
          activeName="Tambah Pelanggan"
          url="/pelanggan"
        />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <MdSupervisedUserCircle className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>ADD CUSTOMER</div>
        </div>
        <Form>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Customer</Label>
            <Input
              placeholder="Customer Name"
              className={styles.input}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Date Of Birth</Label>
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              onClickOutside
              className={styles.datepicker}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
              placeholderText="Your Birth Date"
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Gender</Label>
            <Select value={gender.value}
              onChange={handleChange}
              options={options}
              styles={style}
              className={styles.input}
              placeholder="Select Your Gender"
            />
             
            
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Address</Label>
            <Input
              type="textarea"
              placeholder="Write Your Address"
              rows={4}
              className={styles.input}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Phone Number</Label>
            <Input
              placeholder="Your Phone Number"
              className={styles.input}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Email</Label>
            <Input
              placeholder="Customer Email"
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormGroup>
        </Form>
        <div className="d-flex">
          <div className={styles.button}>
            <Button
              className={styles.batal}
              outline
              onClick={handleClickCancel}
            >
              Cancel
            </Button>
            <Button className={styles.tambahTransaksi} onClick={handleClick}>
              Add Customer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
