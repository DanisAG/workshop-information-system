import { NavLink } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import dashboardActiveIcon from "../Images/selected/dashboard.png";
import dashboardNotActiveIcon from "../Images/notSelected/dashboard.png";
import laporanFinancialActiveIcon from "../Images/selected/Laporan Financial.png";
import laporanFinancialNotActiveIcon from "../Images/notSelected/Laporan Financial.png";
import transaksiActiveIcon from "../Images/selected/Transaksi.png";
import transaksiNotActiveIcon from "../Images/notSelected/Transaksi.png";
import pelangganActiveIcon from "../Images/selected/Pelanggan.png";
import pelangganNotActiveIcon from "../Images/notSelected/Pelanggan.png";
import stokActiveIcon from "../Images/selected/Stok.png";
import stokNotActiveIcon from "../Images/notSelected/Stok.png";
import mekanikActiveIcon from "../Images/selected/Mekanik.png";
import mekanikNotActiveIcon from "../Images/notSelected/Mekanik.png";

import logo from "../Images/logo.png";
import { useState } from "react";

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      activeIcon: dashboardActiveIcon,
      notActiveIcon: dashboardNotActiveIcon,
    },
    {
      path: "/transaksi",
      name: "Transaksi",
      activeIcon: transaksiActiveIcon,
      notActiveIcon: transaksiNotActiveIcon,
    },
    {
      path: "/stok",
      name: "Stok",
      activeIcon: stokActiveIcon,
      notActiveIcon: stokNotActiveIcon,
    },
    {
      path: "/laporanFinancial",
      name: "Laporan Financial",
      activeIcon: laporanFinancialActiveIcon,
      notActiveIcon: laporanFinancialNotActiveIcon,
    },
    {
      path: "/pelanggan",
      name: "Pelanggan",
      activeIcon: pelangganActiveIcon,
      notActiveIcon: pelangganNotActiveIcon,
    },
    {
      path: "/mekanik",
      name: "Mekanik",
      activeIcon: mekanikActiveIcon,
      notActiveIcon: mekanikNotActiveIcon,
    },
  ];

  const activeLink = `${styles.activeLink}`;
  const notActiveLink = `${styles.notActiveLink}`;
  const [checkLinkStatus, setLinkStatus] = useState(false);
  const imgChange = () => {
    var img = document.getElementsByClassName("img");
    img.src = "../Images/selected/dashboard.png";
  };
  const [newActiveLink, setNewActiveLink] = useState("");
  console.log(newActiveLink);
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={logo} width="70px" />
        </div>
        {menuItem.map((item, index) => (
          <div className={styles.link}>
            {/* <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? activeLink : notActiveLink
              }
              isActive={(match, location) => {
                if (!match) {
                  setNewActiveLink("../Images/notSelected/dashboard.png");
                  return false;
                }
                setNewActiveLink("../Images/Selected/dashboard.png");
                console.log(newActiveLink);
                return true;
              }}
            >
              <div className={styles.sidebarItem}>
                <div className={styles.icon}>
                  <img src={newActiveLink} />
                </div>
              </div>
            </NavLink> */}

            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? activeLink : notActiveLink
              }
              // className={({ isActive }) => (isActive ? "active" : "not-active")}
              // className={({ isActive }) = isActive ? activeLink : notActiveLink}
              children={({ isActive }) => {
                const file = isActive ? item.activeIcon : item.notActiveIcon;
                return (
                  <>
                    <div className={styles.sidebarItem}>
                      <div className={styles.icon}>
                        <img src={file} width="34px" height="38px"/>
                      </div>
                      <div className={styles.iconName}>{item.name}</div>
                    </div>
                  </>
                );
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Sidebar;
