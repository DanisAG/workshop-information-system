import { Input, Table } from "reactstrap";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillCheckCircle,
  AiFillRightCircle,
  AiFillLeftCircle,
} from "react-icons/ai";
import styles from "../styles/TableTransaksi.module.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";
import Filter from "./Filter";
import swal from "sweetalert2";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "./store/AuthContext";
import searchStyles from "../styles/Searchbar.module.css";
import Select from "react-select";
import formStyles from "../styles/Form.module.css";
import ReactPaginate from "react-paginate";

const TableData = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);

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

  const initialDataPagination = {
    start: 0,
    limit: limit,
    page: 1,
    keyword: search,
    filter: {
      status: "",
      type:""
    },
    orderBy: {
      field: "",
      sort: "",
    },
  };
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
            .then((response) => {
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
                  .then((res) => res.json())
                  .then((result) => {
                    console.log(result, "Result ");
                    setAllData(result);
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
    console.log(e);
    setLimit(e.value);
  };

  console.log(limitOptions);


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
  }, [search, limit]);

  console.log(allData);
  console.log(dataPagination.current);

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
            </div>

            <div className={styles.headerBottom}>
              <div className="d-flex">
                <Select
                  options={limitOptions}
                  placeholder="Limit"
                  styles={style}
                  className={styles.select}
                   value={ limitOptions
                    ? limitOptions.find(
                        (option) => option.value === limit
                      )
                    : ""}
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
          </div>
        )}
        <Table responsive className={`${styles.table} text-nowrap shadow-sm table-borderless`}>
          <thead className={styles.thead}>
            <tr>
              {props.data.tableHeaderTitles.map((item) => {
                return <th>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {allData?.result?.map((item) => {
              return (
                <tr >
                  {props.data.variableName.map((variable) => {
                    return (
                      <>
                       <td>{item[variable]}</td>
                      </>
                    );
                  })}
                  <td
                  >
                    <AiOutlineEdit
                      className={styles.edit}
                      onClick={() => {
                        navigate(props.data.editNavigation, {
                          state: {
                            id: item.id,
                            allData: allData?.result,
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
