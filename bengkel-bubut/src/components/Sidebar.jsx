import { NavLink } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import dashboardIcon from "../Images/dashboard.png";
const Sidebar = () => {
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: dashboardIcon,
    },
    {
      path: "/transaksi",
      name: "Transaksi",
      icon: dashboardIcon,
    },
    {
      path: "/stok",
      name: "Stok",
      icon: dashboardIcon,
    },
    {
      path: "/laporanFinancial",
      name: "Laporan Financial",
      icon: dashboardIcon,
    },
    {
      path: "/pelanggan",
      name: "Pelanggan",
      icon: dashboardIcon,
    },
    {
      path: "/mekanik",
      name: "Mekanik",
      icon: dashboardIcon,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className={styles.sidebarItem}>
              <div className={styles.icon}>
                <img src={item.icon}/>
              </div>
              <div className={styles.iconName}>{item.name}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
