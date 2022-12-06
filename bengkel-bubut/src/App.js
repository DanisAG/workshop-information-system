import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard/Dashboard";
import LaporanFinancial from "./pages/LaporanFinancial/LaporanFinancial";
import Mekanik from "./pages/Mekanik/Mekanik";
import Pelanggan from "./pages/Pelanggan/Pelanggan";
import Stok from "./pages/Stok/Stok";
import TambahPelanggan from "./pages/Pelanggan/TambahPelanggan";
import EditPelanggan from "./pages/Pelanggan/EditPelanggan";
import Transaksi from "./pages/Transaksi/Transaksi";
import TambahTransaksi from "./pages/Transaksi/TambahTransaksi";
import EditTransaksi from "./pages/Transaksi/EditTransaksi";
import EditMekanik from "./pages/Mekanik/EditMekanik";
import TambahMekanik from "./pages/Mekanik/TambahMekanik";
import TambahBarang from "./pages/Stok/TambahBarang";
import EditBarang from "./pages/Stok/EditBarang";
import { useState } from "react";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
const App = () => {
  const [isLoggedIn, setLoginStatus] = useState(false);
  let pathName = window.location.pathname;
  let arr = pathName.toString().split("/");
  let currentPath = arr[arr.length - 1];
  return (
    <BrowserRouter>
      {currentPath.length > 1 ? (
        <Sidebar>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/laporanFinancial" element={<LaporanFinancial />} />
            <Route path="/mekanik" element={<Mekanik />} />
            <Route path="/tambahMekanik" element={<TambahMekanik />} />
            <Route path="/editMekanik" element={<EditMekanik />} />
            <Route path="/pelanggan" element={<Pelanggan />} />
            <Route path="/stok" element={<Stok />} />
            <Route path="/tambahBarang" element={<TambahBarang />} />
            <Route path="/editBarang" element={<EditBarang />} />
            <Route path="/transaksi" element={<Transaksi />} />
            <Route path="/tambahPelanggan" element={<TambahPelanggan />} />
            <Route path="/editPelanggan" element={<EditPelanggan />} />
            <Route path="/tambahTransaksi" element={<TambahTransaksi />} />
            <Route path="/editTransaksi" element={<EditTransaksi />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/s" element={<SignUp />} />

        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
