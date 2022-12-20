import { Table } from "reactstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import styles from "../../styles/Table.module.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";

const CustomerList = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getAllCustomers = () => {
      fetch("http://localhost:8080/customer/getAll", {
        method: "GET",
        headers: { Authorization: `Bearer ${authCtx.token}` },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
           setCustomerData(result);
        });
    };
    getAllCustomers();
  }, [authCtx.token]);
  const handleClickDelete = () => {
      swal
        .fire({
          title: "KONFIRMASI",
          text: "Anda yakin untuk menghapus data ini?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Hapus",
        })
        .then((result) => {
          if (result.isConfirmed) {
            swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
    
  }
  return (
    <div className={styles.divTable}>
      <Table responsive className={`${styles.table} text-nowrap shadow-sm`}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.thFirstChild}>CUSTOMER ID</th>
            <th className={styles.th}>CUSTOMER</th>
            <th className={styles.th}>DATE OF BIRTH</th>
            <th className={styles.th}>GENDER</th>
            <th className={styles.th}>ADDRESS</th>
            <th className={styles.th}>PHONE NUMBER</th>
            <th className={styles.th}>EMAIL</th>
            <th className={styles.thLastChild}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {customerData?.map((item, index) => {
            return (
              <tr className={styles.tr}>
                {index + 1 == customerData.length ? (
                  <td className={styles.tdFirstLastChild}>{item.id}</td>
                ) : (
                  <td className={styles.tdFirstChild}>{item.id}</td>
                )}
                <td>{item.name}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td
                  className={
                    index + 1 == customerData.length
                      ? styles.tdLastChild
                      : styles.td
                  }
                >
                  <AiOutlineEdit
                    className={styles.edit}
                    onClick={() => {
                      navigate("/editPelanggan");
                    }}
                  />
                  <AiOutlineDelete className={styles.delete} onClick={handleClickDelete} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerList;
