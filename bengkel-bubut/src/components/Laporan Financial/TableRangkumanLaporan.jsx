import { Table } from "reactstrap";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineTransaction,
  AiFillCheckCircle,
} from "react-icons/ai";
import styles from "../../styles/TableRangkuman.module.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";
// import Filter from "./Filter";
import swal from "sweetalert2";
import { useState } from "react";
import { HiDocumentReport } from "react-icons/hi";
import Filter from "../Filter";

const TableRangkumanLaporan = () => {
  const countData = [""];
  const navigate = useNavigate();
  const [filter, cekFilter] = useState(true);
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
      <div className={styles.header}>
        <div className="d-flex">
          <HiDocumentReport className={styles.iconTransaction} size={40} />
          <div className={styles.headerTitle}>RANGKUMAN LAPORAN</div>
        </div>

        <div className={styles.divButton}>
            <Filter reportFilter = {filter}/> 
        </div>
      </div>
      <Table responsive className={`${styles.table} text-nowrap shadow-sm`}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>PENJUALAN</th>
            <th className={styles.th}>PENGELUARAN</th>
            <th className={styles.th}>PENDAPATAN</th>
          </tr>
        </thead>
        <tbody>
          {countData.map((item, index) => {
            return (
              <tr className={styles.tr}>
                {index + 1 == countData.length ? (
                  <td className={styles.tdFirstLastChild}>
                    <div className={styles.tdFirstLastChildContent}>
                      Rp10.000.000,00
                    </div>
                  </td>
                ) : (
                  <td className={styles.tdFirstChild}>
                    <div className={styles.tdFirstLastChildContent}>
                      Rp10.000.000,00
                    </div>
                  </td>
                )}
                <td className={styles.tdMiddle}>
                  <div className={styles.tdMiddleContent}>Rp30.000.000,00</div>
                </td>
                <td
                  className={
                    index + 1 == countData.length
                      ? styles.tdLastChild
                      : styles.td
                  }
                >
                  <div className={styles.tdLastContent}>Rp20.000.000,00</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableRangkumanLaporan;
