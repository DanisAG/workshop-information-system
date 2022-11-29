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
const TambahTransaksi = (props) => {
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

  const [tanggalTransaksi, setTanggalTransaksi] = useState(new Date());
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
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
        <Breadcrumbs icon={icon} name="Transaksi" activeName="Tambah Transaksi" url="/transaksi" />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <AiOutlineTransaction className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>TAMBAH TRANSAKSI</div>
        </div>
        <Form>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Tanggal Transaksi</Label>
            <div className="d-flex">
              <DatePicker
                selected={tanggalTransaksi}
                onChange={(date) => setTanggalTransaksi(date)}
                onClickOutside
                className={styles.datepicker}
              />
              {/* <BsFillCalendar2RangeFill className={styles.iconCalendar}/> */}
            </div>
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Pelanggan</Label>
            <Input placeholder="Nama Pelanggan" className={styles.input} />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Mekanik</Label>
            <Input placeholder="Nama Mekanik" className={styles.input} />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Pilih Jenis Layanan</Label>
            <Select
              options={options}
              styles={style}
              className={styles.input}
              placeholder="Pilih Jenis Layanan"
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Barang</Label>
            <Input
              placeholder="Barang Yang Digunakan"
              className={styles.input}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Jumlah</Label>
            <Input placeholder="Jumlah Barang" className={styles.input} />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Penjualan</Label>
            <Input placeholder="Nilai Penjualan" className={styles.input} />
          </FormGroup>
        </Form>
        <div className="d-flex">
          <div className={styles.button}>
            <Button className={styles.batal} outline onClick={handleClickCancel}>
              Batal
            </Button>
            <Button className={styles.tambahTransaksi}>Tambah Transaksi</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahTransaksi;
