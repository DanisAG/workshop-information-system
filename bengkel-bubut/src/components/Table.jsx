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
import { useState } from "react";

const TableData = (props) => {
  const countData = ["", "", "", "", ""];
  const navigate = useNavigate();
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
          {countData.map((item, index) => {
            return (
              <tr>
                {props.data.tableHeaderTitles.map((item, indexHeaderTitle) => {
                  return (
                    <>
                      {index + 1 == countData.length &&
                      indexHeaderTitle == 0 ? (
                        <td className={styles.tdFirstLastChild}>Placeholder</td>
                      ) : index + 1 !== countData.length &&
                        indexHeaderTitle == 0 ? (
                        <td className={styles.tdFirstChild}>Placeholder</td>
                      ) : indexHeaderTitle ==
                        props.data.tableHeaderTitles.length - 1 ? (
                        <td
                          className={
                            index + 1 == countData.length
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
