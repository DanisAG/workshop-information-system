import { Table } from "reactstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import styles from "../styles/Table.module.css";
const PelangganTable = () => {
  const countData = ["", "", "", "", ""];

  return (
    <div className={styles.divTable}>
      <Table responsive className={`${styles.table} text-nowrap`}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.thFirstChild}>ID TRANSAKSI</th>
            <th className={styles.th}>PELANGGAN</th>
            <th className={styles.th}>MEKANIK</th>
            <th className={styles.th}>JENIS LAYANAN</th>
            <th className={styles.th}>BARANG</th>
            <th className={styles.th}> JUMLAH</th>
            <th className={styles.th}>PENJUALAN</th>
            <th className={styles.th}>STATUS</th>
            <th className={styles.thLastChild}>AKSI</th>
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
                <td className={index + 1 == countData.length ? styles.tdLastChild : styles.td}>
                  <AiOutlineEdit className={styles.edit} />
                  <AiOutlineDelete className={styles.delete} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PelangganTable;
