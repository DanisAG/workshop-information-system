import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard/Dashboard";
import LaporanFinancial from "./pages/LaporanFinancial/LaporanFinancial";
import Mekanik from "./pages/Mekanik/Mekanik";
import Customer from "./pages/Customer/Customer";
import Stock from "./pages/Stock/Stock";
import AddCustomer from "./pages/Customer/AddCustomer";
import EditCustomer from "./pages/Customer/EditCustomer";
import Transaksi from "./pages/Transaksi/Transaksi";
import TambahTransaksi from "./pages/Transaksi/TambahTransaksi";
import EditTransaksi from "./pages/Transaksi/EditTransaksi";
import EditMekanik from "./pages/Mekanik/EditMekanik";
import TambahMekanik from "./pages/Mekanik/TambahMekanik";
import AddStock from "./pages/Stock/AddStock";
import EditStock from "./pages/Stock/EditStock";
import { useContext } from "react";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthContext from "./components/store/AuthContext";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      {authCtx.isLoggedIn ? (
        <Sidebar>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/laporanFinancial" element={<LaporanFinancial />} />
              <Route path="/mekanik" element={<Mekanik />} />
              <Route path="/tambahMekanik" element={<TambahMekanik />} />
              <Route path="/editMekanik" element={<EditMekanik />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/addCustomer" element={<AddCustomer />} />
              <Route path="/editCustomer" element={<EditCustomer />} />
              <Route path="/editStock" element={<EditStock />} />
              <Route path="/transaksi" element={<Transaksi />} />
              <Route path="/addStock" element={<AddStock />} />
              <Route path="/tambahTransaksi" element={<TambahTransaksi />} />
              <Route path="/editTransaksi" element={<EditTransaksi />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/laporanFinancial" element={<LaporanFinancial />} />
            <Route path="/mekanik" element={<Mekanik />} />
            <Route path="/tambahMekanik" element={<TambahMekanik />} />
            <Route path="/editMekanik" element={<EditMekanik />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/addStock" element={<AddStock />} />
            <Route path="/editStock" element={<EditStock />} />
            <Route path="/transaksi" element={<Transaksi />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
            <Route path="/editCustomer" element={<EditCustomer />} />
            <Route path="/tambahTransaksi" element={<TambahTransaksi />} />
            <Route path="/editTransaksi" element={<EditTransaksi />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
