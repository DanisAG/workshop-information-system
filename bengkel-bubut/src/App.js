import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import LaporanFinancial from "./pages/LaporanFinancial";
import Mekanik from "./pages/Mekanik";
import Pelanggan from "./pages/Pelanggan";
import Stok from "./pages/Stok";
import Transaksi from "./pages/Transaksi";

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
          <Route path="/Transaksi" element={<Transaksi />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
