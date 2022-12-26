import { Table } from "reactstrap";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillCheckCircle,
} from "react-icons/ai";
import styles from "../styles/TableTransaksi.module.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";
import Filter from "./Filter";
import swal from "sweetalert2";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "./store/AuthContext";

const TableData = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [allData, setAllData] = useState([]);

  const initialDataPagination = {
    start: 0,
    limit: 5,
    page: 1,
    keyword: "",
    filter: {
      transaction: "",
    },
    orderBy: {
      field: "",
      sort: "",
    },
  };
  const dataPagination = useRef(initialDataPagination);

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
  };

  // const handleClickDelete = (id) => {
  //   swal
  //     .fire({
  //       title: "Confirmation",
  //       text: "Are you sure to delete the data?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       cancelButtonColor: "#d33",
  //       confirmButtonColor: "#3085d6",
  //       confirmButtonText: "Delete",
  //       allowOutsideClick: false,
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         fetch(`http://localhost:8080/mechanic/delete/${id}`, {
  //           method: "DELETE",
  //           headers: { Authorization: `Bearer ${authCtx.token}` },
  //         })
  //           .then((response) => {
  //             if (!response.ok) {
  //               throw new Error(response.statusText);
  //             } else {
  //               fetch("http://localhost:8080/mechanic/getList", {
  //                 method: "POST",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                   Authorization: `Bearer ${authCtx.token}`,
  //                 },
  //                 body: JSON.stringify(mechanicPagination.current),
  //               })
  //                 .then((res) => res.json())
  //                 .then((result) => {
  //                   console.log(result, "Result ");
  //                   setAllMechanicsData(result);
  //                 });
  //               swal.fire("Deleted!", "The data has been deleted.", "success");
  //             }
  //           })
  //           .catch((error) => {
  //             swal.fire({
  //               icon: "error",
  //               title: "Oops...",
  //               text: `Request failed: ${error}`,
  //             });
  //           });
  //       }
  //     });
  // };

  // const handleChange = (e) => {
  //   setSearch(e.target.value);
  // };

  const postDataWithPagination = (data) => {
    fetch(props.data.postAPIWithPagination, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setAllData(result);
      });
  };

  useEffect(() => {
    dataPagination.current = initialDataPagination;
    postDataWithPagination(dataPagination.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(allData);
  console.log(dataPagination.current);

  // const handlePageClick = (event) => {
  //   const newOffset =
  //     (event.selected * allMechanicsData?.pagination.limit) %
  //     allMechanicsData?.pagination.totalItem;
  //   const newmechanicPagination = {
  //     ...initialMechanicPagination,
  //     page: event.selected + 1,
  //     start: newOffset,
  //   };
  //   mechanicPagination.current = newmechanicPagination;
  //   getCustomerWithPaginationData(mechanicPagination.current);
  // };

  return (
    <div className={styles.divTable}>
      {props.data.header && (
        <div className={styles.header}>
          <div className="d-flex">
            <div className={styles.iconTransaction}>{props.data.iconTable}</div>
            <div className={styles.headerTitle}>{props.data.title}</div>
          </div>

          <div className={styles.divButton}>
            {props.data.filterStatus && (
              <div className="d-flex">
                <Filter reportfilterStatus={props.data.filterStatus} />
              </div>
            )}
            <Button
              className={styles.button}
              onClick={() => {
                navigate(props.data.buttonNavigation);
              }}
            >
              <div>
                <FaPlus className={styles.plusIcon} />
              </div>
              <div>{props.data.buttonText}</div>
            </Button>
          </div>
        </div>
      )}
      <Table responsive className={`${styles.table} text-nowrap shadow-sm`}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {props.data.tableHeaderTitles.map((item, index) => {
              return <th>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {allData?.result?.map((item, index) => {
            return (
              <tr>
                {props.data.tableHeaderTitles.map((item, indexHeaderTitle) => {
                  return (
                    <>
                      {index + 1 === allData?.result.length &&
                      indexHeaderTitle === 0 ? (
                        <td className={styles.tdFirstLastChild}>Placeholder</td>
                      ) : index + 1 !== allData?.result.length &&
                        indexHeaderTitle === 0 ? (
                        <td className={styles.tdFirstChild}>Placeholder</td>
                      ) : indexHeaderTitle ===
                        props.data.tableHeaderTitles.length - 1 ? (
                        <td
                          className={
                            index + 1 === allData?.result.length
                              ? styles.tdLastChild
                              : styles.td
                          }
                        >
                          <AiFillCheckCircle />
                          <AiOutlineEdit
                            className={styles.edit}
                            onClick={() => {
                              navigate(props.data.editNavigation);
                            }}
                          />
                          <AiOutlineDelete
                            className={styles.delete}
                            onClick={handleClickDelete}
                          />
                        </td>
                      ) : (
                        <td>Placeholder</td>
                      )}
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableData;
