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
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

const StokTable = (props) => {
  const navigate = useNavigate();
  const [allStocksData, setAllStocksData] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getStockData(stockPagination.current);
  }, [props.tabId]);

  let newOffset;
  let initialStockPagination = {
    start: newOffset ? newOffset : 0,
    limit: 5,
    page: allStocksData ? allStocksData?.pagination.currentPage : 1,
    keyword: "",
    filter: {
      stock: props.tabId === "2" ? "empty" : "all",
    },
    orderBy: {
      field: "created",
      sort: "DESC",
    },
  };

  const stockPagination = useRef(initialStockPagination);
  stockPagination.current = initialStockPagination;

  const getStockData = (data) => {
    fetch("http://localhost:8090/stock/getList", {
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

  const handlePageClick = (event) => {
    newOffset =
      (event.selected * allStocksData?.pagination.limit) %
      allStocksData?.pagination.totalItem;
    initialStockPagination = {
      ...initialStockPagination,
      page: event.selected + 1,
      start: newOffset,
    };
    stockPagination.current = initialStockPagination;
    getStockData(stockPagination.current);
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
        if (result.isConfirmed) {
          fetch(`http://localhost:8090/stock/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${authCtx.token}` },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              } else {
                fetch("http://localhost:8090/stock/getList", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authCtx.token}`,
                  },
                  body: JSON.stringify(stockPagination.current),
                })
                  .then((res) => res.json())
                  .then((result) => {
                    console.log(result, "Result ");

                    setAllStocksData(result);
                    // setRefresh(!refresh);
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
                      navigate("/editStock", {
                        state: {
                          id: item.id,
                          allStocksData: allStocksData,
                        },
                      });
                    }}
                  />
                  <AiOutlineDelete
                    className={styles.delete}
                    onClick={(event) => handleClickDelete(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<AiFillRightCircle color="#6f6af8" size={35} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(allStocksData?.pagination.totalPage)}
        previousLabel={<AiFillLeftCircle color="#6f6af8" size={35} />}
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
