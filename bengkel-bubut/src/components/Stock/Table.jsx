import { Table } from "reactstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import styles from "../../styles/Table.module.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "../../styles/Pagination.css";
import { data } from "./Chart";
import { useRef } from "react";
import {AiFillLeftCircle, AiFillRightCircle} from "react-icons/ai";

const StokTable = () => {
  const navigate = useNavigate();

  const [allStocksData, setAllStocksData] = useState();
  const authCtx = useContext(AuthContext);

  const initialStockPagination = {
    start: 0,
    limit: 5,
    page: 1,
    keyword: "",
    filter: {
      stock: "",
    },
    orderBy: {
      field: "",
      sort: "",
    },
  };

  const stockPagination = useRef(initialStockPagination);
  const getStockData = (data) => {
    fetch("http://localhost:8080/stock/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setAllStocksData(result);
      });
  };
  useEffect(() => {
    getStockData(stockPagination.current);
  }, []);

  

  const endOffset =
    allStocksData?.pagination.currentPage +
    allStocksData?.pagination.limit - 1;

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * allStocksData?.pagination.limit) %
      allStocksData?.pagination.totalItem;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    const newStockPagination = {...initialStockPagination, page: event.selected + 1, start: newOffset};
    stockPagination.current.value = newStockPagination;
    getStockData(stockPagination.current.value);
  };

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
                fetch("http://localhost:8080/stock/getList", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authCtx.token}`,
                  },
                  body: JSON.stringify(stockPagination.current.value),
                })
                  .then((res) => res.json())
                  .then((result) => {
                    setAllStocksData(result);
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
          {allStocksData?.result.map((item, index) => {
            return (
              <tr className={styles.tr}>
                {index + 1 === allStocksData?.result.length ? (
                  <td className={styles.tdFirstLastChild}>{item.name}</td>
                ) : (
                  <td className={styles.tdFirstChild}>{item.name}</td>
                )}
                <td>{item.price}</td>
                <td>{item.quantity}</td>

                <td
                  className={
                    index + 1 === allStocksData?.result.length
                      ? styles.tdLastChild
                      : styles.td
                  }
                >
                  <AiOutlineEdit
                    className={styles.edit}
                    onClick={() => {
                      navigate("/editStock",{
                        state: {
                          id: item.id,
                          allStocksData: allStocksData
                        }
                      });
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
      <ReactPaginate
        breakLabel="..."
        nextLabel={<AiFillRightCircle color="#6f6af8" size={35}/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={allStocksData?.pagination.totalPage}
        previousLabel={<AiFillLeftCircle color="#6f6af8" size={35}/>}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="previous-page-num"
        nextLinkClassName="next-page-num"
        activeLinkClassName="active"
      />
    </div>
  );
};

export default StokTable;
