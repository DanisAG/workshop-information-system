import { Table } from "reactstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import styles from "../../styles/Table.module.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { useState } from "react";

const StokTable = () => {
  const countData = ["", "", "", "", ""];
  const navigate = useNavigate();

  const [allStocks, setAllStocks] = useState();
  const [checkSwalError, setSwalError] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getAllStocks = () => {
      fetch("http://localhost:8080/stock/getAll", {
        method: "GET",
        headers: { Authorization: `Bearer ${authCtx.token}` },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result.stock);
          setAllStocks(result.stock);
        });
    };
    getAllStocks();
  }, [authCtx.token]);

  console.log(allStocks);

  const handleClickDelete = (id) => {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to delete the data?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        allowOutsideClick: false,
      })
      .then((result) => {
        console.log(result);

        if (result.isConfirmed) {
          fetch(`http://localhost:8080/stock/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${authCtx.token}` },
          })
            .then((response) => {
              console.log(response);

              if (!response.ok) {
                console.log(response);
                
                throw new Error(response.statusText);
              } else {
                fetch("http://localhost:8080/stock/getAll", {
                  method: "GET",
                  headers: { Authorization: `Bearer ${authCtx.token}` },
                })
                  .then((res) => res.json())
                  .then((result) => {
                    console.log(result.stock);
                    setAllStocks(result.stock);
                  });
                swal.fire("Deleted!", "The data has been deleted.", "success");
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
    <div className={styles.divTable}>
      <Table responsive className={`${styles.table} text-nowrap shadow-sm`}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.thFirstChild}>ITEM NAME</th>
            <th className={styles.th}>PRICE</th>
            <th className={styles.th}>QUANTITY</th>

            <th className={styles.thLastChild}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {allStocks?.map((item, index) => {
            return (
              <tr className={styles.tr}>
                {index + 1 === countData.length ? (
                  <td className={styles.tdFirstLastChild}>{item.name}</td>
                ) : (
                  <td className={styles.tdFirstChild}>{item.name}</td>
                )}
                <td>{item.price}</td>
                <td>{item.quantity}</td>

                <td
                  className={
                    index + 1 === countData.length
                      ? styles.tdLastChild
                      : styles.td
                  }
                >
                  <AiOutlineEdit
                    className={styles.edit}
                    onClick={() => {
                      navigate("/editBarang");
                    }}
                  />
                  <AiOutlineDelete
                    className={styles.delete}
                    onClick={() => handleClickDelete(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default StokTable;
