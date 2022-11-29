import { Table } from "reactstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import styles from "../../styles/Table.module.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const PelangganTable = () => {
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
    
  }
  return (
    <div className={styles.divTable}>
      <Table responsive className={`${styles.table} text-nowrap shadow-sm`}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.thFirstChild}>ID PELANGGAN</th>
            <th className={styles.th}>PELANGGAN</th>
            <th className={styles.th}>TANGGAL LAHIR</th>
            <th className={styles.th}>JENIS KELAMIN</th>
            <th className={styles.th}>ALAMAT</th>
            <th className={styles.th}>NOMOR TELEPON</th>
            <th className={styles.th}>EMAIL</th>
            <th className={styles.thLastChild}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {countData.map((item, index) => {
            return (
              <tr className={styles.tr}>
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
                <td
                  className={
                    index + 1 == countData.length
                      ? styles.tdLastChild
                      : styles.td
                  }
                >
                  <AiOutlineEdit
                    className={styles.edit}
                    onClick={() => {
                      navigate("/editPelanggan");
                    }}
                  />
                  <AiOutlineDelete className={styles.delete} onClick={handleClickDelete} />
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
