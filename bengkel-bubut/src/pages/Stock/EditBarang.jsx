import { Input, Button, Row, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import { MdInventory2 } from "react-icons/md";
import {useLocation} from 'react-router-dom';
import React, { useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const EditBarang = (props) => {
  const navigate = useNavigate();
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      borderRadius: 12,
    }),
  };
  const options = [
    { value: "lakilaki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];
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
    
  }
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} name="Stok" activeName="Edit Barang" url="/stok" />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <MdInventory2 className={styles.iconForForm} size={40}/>
          </div>
          <div className={styles.title}>EDIT BARANG</div>
        </div>
        <Form>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Nama Barang</Label>
            <Input placeholder="Nama Barang" className={styles.input} />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Harga</Label>
            <Input placeholder="Nominal Harga" className={styles.input} />

          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Stok</Label>
            <Input placeholder="Banyak Stok Barang" className={styles.input} />

          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Terpakai</Label>
            <Input
              placeholder="Banyak Barang Terpakai"
              className={styles.input}
            />
          </FormGroup>
        </Form>
        <div className="d-flex">
          <div className={styles.button}>
            <Button className={styles.batal} outline onClick={handleClickCancel}>
              Batal
            </Button>
            <Button className={styles.tambahTransaksi}>Tambah Barang</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBarang;
