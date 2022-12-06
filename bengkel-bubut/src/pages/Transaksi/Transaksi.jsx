import { Row } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import icon from "../../Images/notSelected/Transaksi.png";
import TransaksiTable from "../../components/Transaksi/Table.jsx";
import Table from "../../components/Table";
import { AiOutlineTransaction } from "react-icons/ai";
const Transaksi = () => {
  const allTableDatas = {
    title: "SEMUA TRANSAKSI",
    buttonText: "Tambah Transaksi",
    filterStatus: true,
    header: true,
    buttonNavigation: "/tambahTransaksi",
    editNavigation: "/editTransaksi",
    iconTable: <AiOutlineTransaction size={40} />,
    tableHeaderTitles: [
      "ID TRANSAKSI",
      "TGL TRANSAKSI",
      "PELANGGAN",
      "MEKANIK",
      "JENIS LAYANAN",
      "BARANG",
      "JUMLAH",
      "PENJUALAN",
      "STATUS",
      "AKSI",
    ],
  };
  return (
    <div>
      <Row>
        <Breadcrumbs icon={icon} activeName="Transaksi" url="/Transaksi" />
      </Row>
      <Row>
        <Table data={allTableDatas} />
      </Row>
    </div>
  );
};

export default Transaksi;
