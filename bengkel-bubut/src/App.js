import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import LaporanFinancial from "./pages/LaporanFinancial";
import Mekanik from "./pages/Mekanik";
import Pelanggan from "./pages/Pelanggan/Pelanggan";
import Stok from "./pages/Stok";
import TambahPelanggan from "./pages/Pelanggan/TambahPelanggan";
import EditPelanggan from "./pages/Pelanggan/EditPelanggan";
import Transaksi from "./pages/Transaksi/Transaksi";
import TambahTransaksi from "./pages/Transaksi/TambahTransaksi";
import EditTransaksi from "./pages/Transaksi/EditTransaksi";

const App = () => {
  return (
    <BrowserRouter >
      <Sidebar >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/laporanFinancial" element={<LaporanFinancial />} />
          <Route path="/mekanik" element={<Mekanik />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/stok" element={<Stok />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/tambahPelanggan" element={<TambahPelanggan />} />
          <Route path="/editPelanggan" element={<EditPelanggan />} />
          <Route path="/tambahTransaksi" element={<TambahTransaksi />} />
          <Route path="/editTransaksi" element={<EditTransaksi />} />

        </Routes>
      </Sidebar>
      
    </BrowserRouter>
    
  );
};

export default App;
