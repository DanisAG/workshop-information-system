import { Input, Table } from "reactstrap";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillRightCircle,
  AiFillLeftCircle,
} from "react-icons/ai";
import styles from "../styles/TableTransaksi.module.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";
import Filter from "./Filter";
import swal from "sweetalert2";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "./store/AuthContext";
import searchStyles from "../styles/Searchbar.module.css";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import "../styles/Pagination.css";
import ExportExcel from "./Transaction/ExportExcel";

const TableData = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(allData?.pagination?.currentPage);
  const [refresh, setRefresh] = useState(true);

  const [filter, setFilter] = useState({
    status: "",
    type: "",
    month: "",
    year: "",
    day: "",
    customer: "",
    mechanic: "",
  });
  const limitOptions = [
    {
      label: (
        <>
          <b>5</b>{" "}
        </>
      ),
      value: 5,
    },
    {
      label: (
        <>
          <b>10</b>{" "}
        </>
      ),
      value: 10,
    },
    {
      label: (
        <>
          <b>20</b>{" "}
        </>
      ),
      value: 20,
    },
    {
      label: (
        <>
          <b>30</b>{" "}
        </>
      ),
      value: 30,
    },
  ];

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      borderRadius: 12,
    }),
  };

  // console.log(Math.ceil(allData?.pagination?.totalPage))

  const initialDataPagination = {
    start: 0,
    limit: limit,
    page: allData?.pagination?.currentPage  ,
    keyword: search,
    filter: {
      status: filter.status,
      type: filter.type,
      month: filter.month,
      year: filter.year,
      day: filter.day,
      customer: filter.customer,
      mechanic: filter.mechanic,
    },
    orderBy: {
      field: props?.data.orderBy?.field,
      sort: props?.data.orderBy?.sort,
    },
  };

  console.log(initialDataPagination)
  //props?.data.orderBy?.sort
  const dataPagination = useRef(initialDataPagination);

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
          fetch(`${props.data.deleteAPI}${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${authCtx.token}` },
          })
            .then(async(response) => {
              const errorMessage = await response.text()
              console.log(errorMessage)

              if(errorMessage.includes("Failed to Delete")){
                throw new Error(errorMessage)
              }

              if (!response.ok) {
                throw new Error(response.statusText);
              } else {
                fetch(props.data.postAPIWithPagination, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authCtx.token}`,
                  },
                  body: JSON.stringify(dataPagination.current),
                })
                  .then((res) => {
                    if (res.ok) res.json();
                    console.log(res)
                  })
                  .then((result) => {
                    console.log(result);
                    setRefresh(!refresh);
                    // setAllData(result);
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

  const handleChangeLimit = (e) => {
    setLimit(e.value);
  };

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
  }, [search, limit, filter, refresh]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * allData?.pagination.limit) %
      allData?.pagination.totalItem;
    const newDataPagination = {
      ...initialDataPagination,
      page: event.selected + 1,
      start: newOffset,
    };
    allData.current = newDataPagination;
    postDataWithPagination(allData.current);
  };

  const passedTableData = {
    ...props.data,
    iconTable: "",
  };

  console.log()

  return (
    <>
      <div className={styles.divTable}>
        {props.data.header && (
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <div className="d-flex">
                <div className={styles.iconTransaction}>
                  {props.data.iconTable}
                </div>
                <div className={styles.headerTitle}>{props.data.title}</div>
              </div>
              <div>
                {props.data.exportExcel && <ExportExcel/>}
              </div>
            </div>

            <div className={styles.headerBottom}>
              <div className={styles.headerBottomLeft}>
                <Select
                  options={limitOptions}
                  placeholder="Limit"
                  styles={style}
                  className={styles.select}
                  value={
                    limitOptions
                      ? limitOptions.find((option) => option.value === limit)
                      : ""
                  }
                  onChange={handleChangeLimit}
                />
                <div lg={8} className={searchStyles.div}>
                  <Input
                    type="text"
                    placeholder="Search"
                    className={searchStyles.searchBar}
                    value={search}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.divButton}>
                {props.data.filterStatus && (
                  <div className="d-flex">
                    <Filter
                      reportfilterStatus={props.data.filterStatus}
                      filterDashboard={props.data.filterDashboard}
                      financialReportFilterStatus={
                        props.data.financialReportFilterStatus
                      }
                      transactionFilterStatus={
                        props.data.transactionFilterStatus
                      }
                      setFilter={setFilter}
                      filter={filter}
                    />
                  </div>
                )}
                <Button
                  className={styles.button}
                  onClick={() => {
                    navigate(props.data.buttonNavigation, {
                      state: {
                        status: "Add",
                        allTableDatas: passedTableData,
                        allData: allData?.result,
                      },
                    });
                  }}
                >
                  <div>
                    <FaPlus className={styles.plusIcon} />
                  </div>
                  <div>{props.data.buttonText}</div>
                </Button>
              </div>
            </div>
          </div>
        )}
        <Table
          responsive
          className={`${styles.table} text-nowrap shadow-sm table-borderless`}
        >
          <thead className={styles.thead}>
            <tr>
              {props.data.tableHeaderTitles.map((item) => {
                return item === "SALE" ||
                  item === "EXPENSE" ||
                  item === "REVENUE" ? (
                  <th style={{ textAlign: "left" }}>{item}</th>
                ) : (
                  <th>{item}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {allData?.result?.map((item) => {
              return (
                <tr className={styles.tr}>
                  {props.data.variableName.map((variable) => {
                    return (
                      <>
                        {variable === "created" || variable === "dob" ? (
                          <td>
                            {" "}
                            {moment(item[variable]).format("DD MMMM YYYY")}
                          </td>
                        ) : variable === "sale" ||
                          variable === "price" ||
                          variable === "revenue" ||
                          variable === "expense" ? (
                          <td>
                            <NumericFormat
                              value={item[variable]}
                              displayType={"text"}
                              decimalScale={2}
                              thousandSeparator=","
                              prefix="Rp. "
                              fixedDecimalScale={2}
                            />
                          </td>
                        ) : variable === "status" ? (
                          <td>
                            <div
                              className={
                                item[variable] === "In Progress"
                                  ? styles.inprogress
                                  : styles.done
                              }
                            >
                              {" "}
                              {item[variable]}
                            </div>
                          </td>
                        ) : (
                          <td>{item[variable]}</td>
                        )}
                      </>
                    );
                  })}
                  <td>
                    <AiOutlineEdit
                      className={styles.edit}
                      onClick={() => {
                        navigate(props.data.editNavigation, {
                          state: {
                            id: item.id,
                            allData: allData?.result,
                            status: "Edit",
                            allTableDatas: passedTableData,
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
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<AiFillRightCircle color="#6f6af8" size={35} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        // forcePage={tes }
        pageCount={Math.ceil(allData?.pagination?.totalPage)}
        previousLabel={<AiFillLeftCircle color="#6f6af8" size={35} />}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="previous-page-num"
        nextLinkClassName="next-page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default TableData;
