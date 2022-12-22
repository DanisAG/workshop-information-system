import { Button, Col, Input, Row, Table } from "reactstrap";
import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import styles from "../../styles/Table.module.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import AuthContext from "../store/AuthContext";
import searchStyles from "../../styles/Searchbar.module.css";
import customerStyles from "../../styles/Customer.module.css";
import { FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
const MechanicTable = () => {
  const [search, setSearch] = useState("");
  const [allMechanicsData, setAllMechanicsData] = useState();
  const navigate = useNavigate();
  const initialMechanicPagination = {
    start: 0,
    limit: 5,
    page: 1,
    keyword: search,
  };
  const mechanicPagination = useRef(initialMechanicPagination);

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
          fetch(`http://localhost:8080/mechanic/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${authCtx.token}` },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              } else {
                fetch("http://localhost:8080/mechanic/getList", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authCtx.token}`,
                  },
                  body: JSON.stringify(mechanicPagination.current),
                })
                  .then((res) => res.json())
                  .then((result) => {
                    console.log(result, "Result ");
                    setAllMechanicsData(result);
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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const authCtx = useContext(AuthContext);

  const getCustomerWithPaginationData = (data) => {
    fetch("http://localhost:8080/mechanic/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setAllMechanicsData(result);
      });
  };

  useEffect(() => {
    mechanicPagination.current = initialMechanicPagination;
    getCustomerWithPaginationData(mechanicPagination.current);
  }, [search]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * allMechanicsData?.pagination.limit) %
      allMechanicsData?.pagination.totalItem;
    const newmechanicPagination = {
      ...initialMechanicPagination,
      page: event.selected + 1,
      start: newOffset,
    };
    mechanicPagination.current = newmechanicPagination;
    getCustomerWithPaginationData(mechanicPagination.current);
  };

  console.log(allMechanicsData);
  return (
    <>
      <Row className={customerStyles.topSection}>
        <Col className={customerStyles.search} lg={8}>
          <Input
            type="text"
            placeholder="Search Mechanic"
            className={searchStyles.searchBar}
            value={search}
            onChange={handleChange}
          />
        </Col>
        <Col className={customerStyles.divButton}>
          <Button
            className={customerStyles.button}
            onClick={() => {
              navigate("/addMechanic", {
                state: {},
              });
            }}
          >
            <div>
              <FaPlus className={customerStyles.plusIcon} />
            </div>
            <div>Add Mechanic</div>
          </Button>
        </Col>
      </Row>
      <div className={styles.divTable}>
        <Table responsive className={`${styles.table} text-nowrap shadow-sm`}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.thFirstChild}>MECHANIC ID</th>
              <th className={styles.th}>MECHANIC NAME</th>
              <th className={styles.th}>DATE OF BIRTH</th>
              <th className={styles.th}>GENDER</th>
              <th className={styles.th}>ADDRESS</th>
              <th className={styles.th}>PHONE NUMBER</th>
              <th className={styles.th}>EMAIL</th>
              <th className={styles.thLastChild}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {allMechanicsData?.result.map((item, index) => {
              return (
                <tr className={styles.tr}>
                  {index + 1 === allMechanicsData?.result.length ? (
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
                      index + 1 === allMechanicsData?.result.length
                        ? styles.tdLastChild
                        : styles.td
                    }
                  >
                    <AiOutlineEdit
                      className={styles.edit}
                      onClick={() => {
                        navigate("/editMechanic", {
                          state: {
                            id: item.id,
                            allMechanicsData: allMechanicsData?.result,
                          },
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
          nextLabel={<AiFillRightCircle color="#6f6af8" size={35} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(allMechanicsData?.pagination.totalPage)}
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

export default MechanicTable;
