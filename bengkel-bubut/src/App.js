import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard/Dashboard";
import LaporanFinancial from "./pages/FinancialReport/FinancialReport";
import Customer from "./pages/Customer/Customer";
import Stock from "./pages/Stock/Stock";
import AddCustomer from "./pages/Customer/AddCustomer";
import EditCustomer from "./pages/Customer/EditCustomer";
import AddStock from "./pages/Stock/AddStock";
import EditStock from "./pages/Stock/EditStock";
import { useContext, useEffect } from "react";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthContext from "./components/store/AuthContext";
import AddMechanic from "./pages/Mechanic/AddMechanic";
import EditMechanic from "./pages/Mechanic/EditMechanic";
import Mechanic from "./pages/Mechanic/Mechanic";
import Transaction from "./pages/Transaction/Transaction";
import AddOrEdit from "./pages/Transaction/AddOrEdit";
import ViewDetails from "./pages/Transaction/ViewDetails";
import ChangePassword from "./pages/User/ChangePassword";
import { ToastContainer, toast } from "react-toastify";
import "./styles/Global.css";
const App = () => {
  const authCtx = useContext(AuthContext);
  const Msg = () => (
    <div >
      <h5 style={{fontWeight: "700"}}>LOW STOCK ALERT!</h5>
      <div>
        {" "}
        Keep track of your items running below certain quantity in Stock or
        Dashboard page{" "}
      </div>
    </div>
  );
  const notify = () =>
    toast.warn(Msg, {
      position: "top-right",
      autoClose: 50000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  authCtx.notifStatus && notify();

  return (
    <BrowserRouter>
      {authCtx.isLoggedIn ? (
        <Sidebar>
          <ToastContainer />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/laporanFinancial" element={<LaporanFinancial />} />
              <Route path="/mechanic" element={<Mechanic />} />
              <Route path="/addMechanic" element={<AddMechanic />} />
              <Route path="/editMechanic" element={<EditMechanic />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/addCustomer" element={<AddCustomer />} />
              <Route path="/editCustomer" element={<EditCustomer />} />
              <Route path="/editStock" element={<EditStock />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/addStock" element={<AddStock />} />
              <Route path="/addTransaction" element={<AddOrEdit />} />
              <Route path="/editTransaction" element={<AddOrEdit />} />
              <Route path="/viewTransaction" element={<ViewDetails />} />
              <Route path="/changePassword" element={<ChangePassword />} />
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
            <Route path="/mechanic" element={<Mechanic />} />
            <Route path="/addMechanic" element={<AddMechanic />} />
            <Route path="/editMechanic" element={<EditMechanic />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/addStock" element={<AddStock />} />
            <Route path="/editStock" element={<EditStock />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
            <Route path="/editCustomer" element={<EditCustomer />} />
            <Route path="/addTransaction" element={<AddOrEdit />} />
            <Route path="/editTransaction" element={<AddOrEdit />} />
            <Route path="/viewTransaction" element={<ViewDetails />} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
