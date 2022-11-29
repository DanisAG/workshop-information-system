import { Input, Button, Row, Col, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import Select from "react-select";
import {MdSupervisedUserCircle} from 'react-icons/md';
import DatePicker from "react-datepicker";
import React, { useState } from "react";

const EditPelanggan = (props) => {
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

  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} nama="Pelanggan" />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <MdSupervisedUserCircle className={styles.iconForForm} size={40}/>
          </div>
          <div className={styles.title}>EDIT PELANGGAN</div>
        </div>
        <Form>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Pelanggan</Label>
            <Input placeholder="Nama Pelanggan" className={styles.input} />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Tanggal Lahir</Label>
            <DatePicker
              selected={tanggalLahir}
              onChange={(date) => setTanggalLahir(date)}
              onClickOutside
              className={styles.datepicker}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Jenis Kelamin</Label>
            <Select
              options={options}
              styles={style}
              className={styles.input}
              placeholder="Pilih Jenis Kelamin"
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Alamat</Label>
            <Input
              type="textarea"
              placeholder="Tuliskan Alamat Pelanggan"
              rows={4}
              className={styles.input}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Nomor Telepon</Label>
            <Input
              placeholder="Nomor Telepon Pelanggan"
              className={styles.input}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Email</Label>
            <Input placeholder="Email Pelanggan" className={styles.input} />
          </FormGroup>
        </Form>
        <div className="d-flex">
          <div className={styles.button}>
            <Button className={styles.batal} outline>
              Batal
            </Button>
            <Button className={styles.tambahTransaksi}>Edit Pelanggan</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPelanggan;
