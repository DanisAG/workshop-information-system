import { Input, Button, Row, FormGroup, Form, Label } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Pelanggan.png";
import styles from "../../styles/Form.module.css";
import { MdInventory2 } from "react-icons/md";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext.jsx";
const TambahBarang = (props) => {
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
  };

  const [name, setItemName] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    const stock = { name, price, quantity };
    console.log(stock);

    fetch("http://localhost:8080/stock/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stock),
    })
      .then((response) => {
        console.log(response.status);
    
        response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((response) => {
        console.log(response.status);
      });
  };

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log(authCtx);
    fetch("http://localhost:8080/stock/getAll",{
      method: "GET",
      headers: {"Authorization": `Bearer ${authCtx.token}`}})
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }, []);
  return (
    <div>
      <Row>
        <Breadcrumbs
          icon={icon}
          name="Stok"
          activeName="Tambah Barang"
          url="/stok"
        />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <MdInventory2 className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>TAMBAH BARANG</div>
        </div>
        <Form>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Nama Barang</Label>
            <Input
              placeholder="Nama Barang"
              className={styles.input}
              onChange={(e) => setItemName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Harga</Label>
            <Input
              placeholder="Nominal Harga"
              className={styles.input}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Stok</Label>
            <Input
              placeholder="Banyak Stok Barang"
              className={styles.input}
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
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
              Batal
            </Button>
            <Button
              className={styles.tambahTransaksi}
              onClick={(e) => handleClick(e)}
            >
              Tambah Barang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahBarang;
