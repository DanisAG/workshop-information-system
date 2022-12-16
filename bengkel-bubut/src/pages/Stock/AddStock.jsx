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
const AddStock = (props) => {
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

  const [name, setItemName] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    const stock = { name, price, quantity };
    console.log(stock);

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
      .then( (result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:8080/stock/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            body: JSON.stringify(stock),
          })
            .then(async(response) => {
              if(!response.ok){
                throw new Error(response.statusText)
              }
              else{
               await swal.fire("Added!", "The Data has been added.", "success");
                navigate("/stock")
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

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log(authCtx);
    fetch("http://localhost:8080/stock/getAll", {
      method: "GET",
      headers: { Authorization: `Bearer ${authCtx.token}` },
    })
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
          name="Stock"
          activeName="Add Stock"
          url="/stock"
        />
      </Row>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <MdInventory2 className={styles.iconForForm} size={40} />
          </div>
          <div className={styles.title}>Add Stock</div>
        </div>
        <Form>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Item Name</Label>
            <Input
              placeholder="Item Name"
              className={styles.input}
              onChange={(e) => setItemName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Price</Label>
            <Input
              placeholder="Price"
              className={styles.input}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </FormGroup>
          <FormGroup className={styles.formgroup}>
            <Label className={styles.label}>Stock</Label>
            <Input
              placeholder="Quantity"
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
              Cancel
            </Button>
            <Button
              className={styles.tambahTransaksi}
              onClick={(e) => handleClick(e)}
            >
              Add Stock
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStock;
