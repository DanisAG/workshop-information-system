import { Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Laporan Financial.png";
import styles from "../../styles/LaporanFinancial.module.css";
import { HiDocumentReport } from "react-icons/hi";
import TableRangkumanLaporan from "../../components/Laporan Financial/TableRangkumanLaporan";
import Table from "../../components/Table";
import {
  AiOutlineTransaction,
} from "react-icons/ai";
const LaporanFinancial = () => {
  const allTableDatas = {
    title: "LAPORAN KESELURUHAN",
    buttonText: "Tambah Transaksi",
    filterStatus: true,
    header: true,
    buttonNavigation: "/tambahTransaksi",
    editNavigation: "/editTransaksi",
    iconTable: <AiOutlineTransaction size={40}/>,
    tableHeaderTitles: ["ID TRANSAKSI", "TGL TRANSAKSI", "PENJUALAN", "PENGELUARAN", "PENDAPATAN", "AKSI"]
  };
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Laporan Financial" />
      </Row>
      <div>
        <TableRangkumanLaporan />
      </div>
      <div>
        <Table data={allTableDatas} />
      </div>
    </div>
  );
};

export default LaporanFinancial;
