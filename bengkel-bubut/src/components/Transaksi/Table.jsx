import { Table } from "reactstrap";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineTransaction,
  AiFillCheckCircle,
} from "react-icons/ai";
import styles from "../../styles/TableTransaksi.module.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";
import Filter from "../Filter";
import swal from "sweetalert2";
import { useState } from "react";

const TransaksiTable = () => {
  const countData = ["", "", "", "", ""];
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
    
  }

  return (
    <div className={styles.divTable}>
      <div className={styles.header}>
        <div className="d-flex">
          <AiOutlineTransaction className={styles.iconTransaction} size={40} />
          <div className={styles.headerTitle}>SEMUA TRANSAKSI</div>
        </div>

        <div className={styles.divButton}>
          <div className="d-flex">
            <Filter transactionFilter={filter}/>
          </div>
          <Button
            className={styles.button}
            onClick={() => {
              navigate("/tambahTransaksi");
            }}
          >
            <div>
              <FaPlus className={styles.plusIcon} />
            </div>
            <div>Tambah Transaksi</div>
          </Button>
        </div>
      </div>
      <Table responsive className={`${styles.table} text-nowrap shadow-sm`}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>ID TRANSAKSI</th>
            <th className={styles.th}>TGL TRANSAKSI</th>
            <th className={styles.th}>PELANGGAN</th>
            <th className={styles.th}>MEKANIK</th>
            <th className={styles.th}>JENIS LAYANAN</th>
            <th className={styles.th}>BARANG</th>
            <th className={styles.th}>JUMLAH</th>
            <th className={styles.th}>PENJUALAN</th>
            <th className={styles.th}>STATUS</th>
            <th className={styles.th}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {countData.map((item, index) => {
            return (
              <tr>
                {index + 1 == countData.length ? (
                  <td className={styles.tdFirstLastChild}>Placeholder</td>
                ) : (
                  <td className={styles.tdFirstChild}>Placeholder</td>
                )}
                <td>Placeholder</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
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
                      navigate("/editTransaksi");
                    }}
                  />
                  <AiOutlineDelete
                    className={styles.delete}
                    onClick={handleClickDelete}
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

export default TransaksiTable;
