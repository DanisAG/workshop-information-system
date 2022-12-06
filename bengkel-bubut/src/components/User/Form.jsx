import { Input, Button, Row, Col, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/FormUser.module.css";
import Select from "react-select";
import { MdSupervisedUserCircle } from "react-icons/md";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GiMechanicGarage } from "react-icons/gi";

const FormUser = (props) => {
  console.log(props);
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      borderRadius: 12,
    }),
  };
  const options = [
    { value: "lakilaki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [cancelStatus, setCancelStatus] = useState(false);
  const navigate = useNavigate();
  const handleClickCancel = () => {
    setCancelStatus(true);
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

  return (
    <div className={props.signupStatus ? styles.formContentSignup : styles.formContentLogin}>
      <div className={styles.header}>
        {props.signupStatus ? (
          <div className={styles.title}>CREATE YOUR ACCOUNT</div>
        ) : (
          <div className={styles.title}>LOG IN ACCOUNT</div>
        )}
      </div>
      <Form>
        {props.signupStatus && (
          <>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Nama Lengkap</Label>
              <Input placeholder="Nama Lengkap" className={styles.input} />
            </FormGroup>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Username</Label>
              <Input placeholder="@Username" className={styles.input} />
            </FormGroup>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Email</Label>
              <Input placeholder="username@user.com" className={styles.input} />
            </FormGroup>

            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Password</Label>
              <Input
                type="password"
                placeholder="Tulis 8 karakter, 1 Huruf Besar"
                className={styles.input}
              />
            </FormGroup>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Konfirmasi Password</Label>
              <Input
                type="password"
                placeholder="Ulangi Password"
                className={styles.input}
              />
            </FormGroup>
          </>
        )}

        {props.loginStatus && (
          <>
            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Email</Label>
              <Input placeholder="username@user.com" className={styles.input} />
            </FormGroup>

            <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Password</Label>
              <Input
                type="password"
                placeholder="Tulis 8 karakter, 1 Huruf Besar"
                className={styles.input}
              />
            </FormGroup>
          </>
        )}
      </Form>
      <div className="d-flex">
        <div className={styles.button}>
          {props.signupStatus && (
            <Button className={styles.buatAkun}>Buat Akun</Button>
          )}
          {props.loginStatus && (
            <Button className={styles.buatAkun}>Masuk Akun</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormUser;
