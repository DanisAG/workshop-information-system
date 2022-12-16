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
import { FaBars } from "react-icons/fa";
import logo from "../Images/logo.png";
import { useState } from "react";

const Sidebar = ({ children }) => {
  console.log(children);
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
      path: "/stock",
      name: "Stock",
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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  console.log(isOpen);
  return (
    <div className={styles.container}>
      <div
        className={styles.sidebar}
        style={{ width: isOpen ? "170px" : "110px" }}
      >
        <div className={styles.logo}>
          <img
            src={logo}
            width="70px"
            onClick={toggle}
            style={{ cursor: "pointer" }}
          />
        </div>
        {menuItem.map((item, index) => (
          <div className={styles.link}>
            <NavLink
              to={{ pathname: item.path }}
              state={{ isOpen: isOpen }}
              key={index}
              className={({ isActive }) =>
                isActive ? activeLink : notActiveLink
              }
              children={({ isActive }) => {
                const file = isActive ? item.activeIcon : item.notActiveIcon;
                return (
                  <>
                    <div
                      className={
                        isOpen ? styles.sidebarItemExpand : styles.sidebarItem
                      }
                    >
                      <div className={styles.icon}>
                        <img src={file} width="34px" height="38px" />
                      </div>

                      <div
                        className={
                          isOpen ? styles.iconNameExpand : styles.iconName
                        }
                      >
                        {item.name}
                      </div>
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
