import icon from "../../Images/notSelected/Stok.png";
import { Button } from "reactstrap";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import styles from "../../styles/Stock.module.css";
import { MdInventory2 } from "react-icons/md";
import { Chart } from "../../components/Stock/Chart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillWarning, AiFillStar } from "react-icons/ai";
import { TbNumber1, TbNumber2, TbNumber3, TbNumber4 } from "react-icons/tb";
import { BsArrowUpShort } from "react-icons/bs";
import TableData from "../../components/Table";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext";
import { useEffect } from "react";

const Stock = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [allStocks, setAllStocks] = useState([]);
  const authCtx = useContext(AuthContext);
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  const navigate = useNavigate();

  const allTableDatas = {
    title: "ALL STOCKS",
    buttonText: "Add Stock",
    filterStatus: false,
    header: true,
    buttonNavigation: "/addStock",
    editNavigation: "/editStock",
    iconTable: <MdInventory2 size={40} />,
    tableHeaderTitles: ["ITEM NAME", "PRICE", "QUANTITY", "ACTION"],
    variableName: ["name", "price", "quantity"],
    postAPIWithPagination: "http://localhost:8080/stock/getList",
    deleteAPI: "http://localhost:8080/stock/delete/",
    orderBy: { field: "updated", sort: "DESC" },
  };

  const getAllStocks = async () => {
    await fetch("http://localhost:8080/stock/getAll", {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          // eslint-disable-next-line no-throw-literal
          throw "Error";
        }
        return res.json();
      })
      .then((result) => {
        setAllStocks(result.stock);
      });
  };

  const filteredStocks = allStocks?.filter(
    (data) => data.quantity < data.minimumQty
  );
  useEffect(() => {
    getAllStocks();
  }, []);
  return (
    <div className={styles.content}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs icon={icon} activeName="Stock" />
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <div className={styles.overview}>
            <div className={styles.overviewHeader}>
              <MdInventory2 size={40} className={styles.icon} />
              <div className="mb-auto mt-auto">
                <div className={styles.title}>OVERVIEW STOK BARANG</div>
                <div className={styles.updateDate}>
                  Update Terakhir: Hari Ini, 20 Oktober 2022 12.00 WIB
                </div>
              </div>
            </div>
            <div className={styles.chart}>
              <Chart />
            </div>
          </div>
          <div className={styles.table}>
            <TableData data={allTableDatas} />

            {/* <div className="d-flex">
              <Nav tabs style={{ width: "82%" }}>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "1",
                    })}
                    onClick={() => {
                      toggle("1");
                    }}
                    activeStyle={{ color: "red", display: "none" }}
                    href="#"
                  >
                    <b>Semua Stok Barang</b>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: currentActiveTab === "2",
                    })}
                    onClick={() => {
                      toggle("2");
                    }}
                    href="#"
                  >
                    <b>Stok Barang Habis</b>
                  </NavLink>
                </NavItem>
              </Nav>
              <div className={styles.buttonTambah}>
                <Button
                  className={styles.button}
                  onClick={() => {
                    navigate("/addStock");
                  }}
                >
                  <div>
                    <FaPlus className={pelangganStyles.plusIcon} />
                  </div>
                  <div>Add Stock</div>
                </Button>
              </div>
            </div>

            <TabContent activeTab={currentActiveTab}>
              <TabPane tabId="1">
                <StokTable tabId={currentActiveTab} />
              </TabPane>
              <TabPane tabId="2">
                <StokTable tabId={currentActiveTab} />
              </TabPane>
            </TabContent> */}
          </div>
        </div>
        <div className="">
          <div className={styles.lowStock}>
            <div className={styles.lowStockTitleDiv}>
              <AiFillWarning size={35} />
              <div className={styles.lowStockTitle}>LOW STOCK ITEM</div>
            </div>
            <div>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((item) => {
                  return (
                    <div className={styles.clickedItem} key={item.id} onClick={() => {
                      navigate("/editStock", {
                        state: {
                          id: item.id,
                          allData: allStocks,
                          status: "Edit",
                        },
                      });
                    }}>
                      <div className={styles.leftData}>
                        <div className={styles.namaBarang}>{item.name}</div>
                        <div className={styles.minQuantity}>
                          Min Qty : {item.minimumQty}
                        </div>
                      </div>
                      <div className={styles.quantity}>{item.quantity}</div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.nodata}>NO DATA FOUND</div>
              )}
            </div>
          </div>
          <div className={styles.lowStock}>
            <div className={styles.readyStockTitleDiv}>
              <AiFillStar size={40} className={styles.iconReady} />
              <div className={styles.readyStockTitle}>
                BARANG SERING TERPAKAI
              </div>
            </div>
            <div className="pb-1">
              <div className="d-flex">
                <div className={styles.bottomData}>
                  <TbNumber1 className={styles.number} size={23} />
                  <div className={styles.namaBarang}>Besi 1</div>
                </div>
                <div className={styles.transaction}>
                  <BsArrowUpShort size={23} className="my-auto" />
                  10 Transaksi
                </div>
              </div>
              <div className="d-flex">
                <div className={styles.bottomData}>
                  <TbNumber2 className={styles.number} size={23} />
                  <div className={styles.namaBarang}>Besi 2</div>
                </div>
                <div className={styles.transaction}>
                  <BsArrowUpShort size={23} className="my-auto" />
                  10 Transaksi
                </div>
              </div>
              <div className="d-flex">
                <div className={styles.bottomData}>
                  <TbNumber3 className={styles.number} size={23} />
                  <div className={styles.namaBarang}>Besi 3</div>
                </div>
                <div className={styles.transaction}>
                  <BsArrowUpShort size={23} className="my-auto" />
                  10 Transaksi
                </div>
              </div>
              <div className="d-flex">
                <div className={styles.bottomData}>
                  <TbNumber4 className={styles.number} size={23} />
                  <div className={styles.namaBarang}>Besi 4</div>
                </div>
                <div className={styles.transaction}>
                  <BsArrowUpShort size={23} className="my-auto" />
                  10 Transaksi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
