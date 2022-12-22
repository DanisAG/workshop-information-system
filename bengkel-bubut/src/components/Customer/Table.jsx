import { Button, Col, Input, Row, Table } from "reactstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import styles from "../../styles/Table.module.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import customerStyles from "../../styles/Customer.module.css";
import searchStyles from "../../styles/Searchbar.module.css";

import { useEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import "../../styles/Pagination.css";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { FaPlus } from "react-icons/fa";
const CustomerList = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [allCustomersData, setAllCustomersData] = useState();
  const [search, setSearch] = useState("");

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
          fetch(`http://localhost:8080/customer/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${authCtx.token}` },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              } else {
                fetch("http://localhost:8080/customer/getList", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authCtx.token}`,
                  },
                  body: JSON.stringify(customerPagination.current),
                })
                  .then((res) => res.json())
                  .then((result) => {
                    console.log(result, "Result ");
                    setAllCustomersData(result);
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

  const initialCustomerPagination = {
    start: 0,
    limit: 5,
    page: 1,
    keyword: search,
  };

  const customerPagination = useRef(initialCustomerPagination);

  const handleChange = (e) => {
    setSearch(e.target.value);
  
  };
  const getCustomerWithPaginationData = (data) => {
    fetch("http://localhost:8080/customer/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setAllCustomersData(result);
      });
  };

  useEffect(() => {
    customerPagination.current = initialCustomerPagination;
    getCustomerWithPaginationData(customerPagination.current);
  }, [search]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * allCustomersData?.pagination.limit) %
      allCustomersData?.pagination.totalItem;
    const newcustomerPagination = {
      ...initialCustomerPagination,
      page: event.selected + 1,
      start: newOffset,
    };
    customerPagination.current = newcustomerPagination;
    getCustomerWithPaginationData(customerPagination.current);
  };

  return (
    <><Row className={customerStyles.topSection}>
    <Col className={customerStyles.search} lg={8}>
      <Input
        type="text"
        placeholder="Search Customer"
        className={searchStyles.searchBar}
        value={search}
        onChange= {handleChange}
      />
    </Col>
    <Col className={customerStyles.divButton}>
      <Button
        className={customerStyles.button}
        onClick={() => {
          navigate("/addCustomer", {
            state: {
              userId: "2",
            },
          });
        }}
      >
        <div>
          <FaPlus className={customerStyles.plusIcon} />
        </div>
        <div>Add Customer</div>
      </Button>
    </Col>
  </Row>
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
          {allCustomersData?.result.map((item, index) => {
            return (
              <tr className={styles.tr}>
                {index + 1 === allCustomersData?.result.length ? (
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
                    index + 1 === allCustomersData?.result.length
                      ? styles.tdLastChild
                      : styles.td
                  }
                >
                  <AiOutlineEdit
                    className={styles.edit}
                    onClick={() => {
                      navigate("/editCustomer", {
                        state: {
                          id: item.id,
                          allCustomersData: allCustomersData?.result
                        },
                      });
                    }}
                  />
                  <AiOutlineDelete className={styles.delete} onClick={() => handleClickDelete(item.id)} />
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
        pageCount={Math.ceil(allCustomersData?.pagination.totalPage)}
        previousLabel={<AiFillLeftCircle color="#6f6af8" size={35} />}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="previous-page-num"
        nextLinkClassName="next-page-num"
        activeLinkClassName="active"
      />
    </div>
    </>
  );
};

export default CustomerList;
