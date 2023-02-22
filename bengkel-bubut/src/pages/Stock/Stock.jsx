import icon from "../../Images/notSelected/Stok.png";
import Breadcrumbs from "../../components/BreadCrumbs.jsx";
import styles from "../../styles/Stock.module.css";
import { MdInventory2 } from "react-icons/md";
import { Chart } from "../../components/Stock/Chart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillWarning, AiFillStar } from "react-icons/ai";
import { BsListUl } from "react-icons/bs";
import { BsArrowUpShort } from "react-icons/bs";
import TableData from "../../components/Table";
import { useContext } from "react";
import AuthContext from "../../components/store/AuthContext";
import { useEffect } from "react";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

const Stock = () => {
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const [allStocks, setAllStocks] = useState([]);
  const [mostStocks, setMostStocks] = useState([]);
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
    postAPIWithPagination: "http://localhost:8090/stock/getList",
    deleteAPI: "http://localhost:8090/stock/delete/",
    orderBy: { field: "updated", sort: "DESC" },
  };

  const getAllStocks = async () => {
    await fetch("http://localhost:8090/stock/getAll", {
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

  const getMostStocks = async () => {
    await fetch("http://localhost:8090/transaction/mostStock", {
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
        setMostStocks(result.result);
      });
  };

  const filteredStocks = allStocks?.filter(
    (data) => data.quantity < data.minimumQty
  );

  function myFunc(total, num) {
    return total + parseInt(num.count);
  }

  const averageStocks = mostStocks.reduce(myFunc, 0) / mostStocks.length;
  const sortedStocks = mostStocks
    .filter((data) => data.count >= averageStocks)
    .sort(function (a, b) {
      return b.count - a.count;
    });

  useEffect(() => {
    getAllStocks();
    getMostStocks();
  }, []);

  console.log(mostStocks, "all stocks in transactions")

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
                <div className={styles.title}>
                  OVERVIEW AVERAGE COMMONLY USED ITEMS
                </div>
                <div className={styles.updateDate}>
                  Last Updated:{" "}
                  {moment().format("dddd, MMMM Do YYYY, h:mm:ss A")}
                </div>
              </div>
            </div>
            <div className={styles.chart}>
              <Chart sortedStocks={sortedStocks} />
            </div>
          </div>
          <div className={styles.table}>
            <TableData data={allTableDatas} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.lowStock}>
            <div className={styles.lowStockTitleDiv}>
              <AiFillWarning size={35} />
              <div className={styles.lowStockTitle}>LOW STOCK ITEMS</div>
            </div>
            <div>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((item) => {
                  return (
                    <div
                      className={styles.clickedItem}
                      key={item.id}
                      onClick={() => {
                        navigate("/editStock", {
                          state: {
                            id: item.id,
                            allData: allStocks,
                            status: "Edit",
                          },
                        });
                      }}
                    >
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
              <div className={styles.readyStockTitle}>AVERAGE USED ITEMS</div>
            </div>
            <div className="pb-1">
              {sortedStocks.length > 0 ? (
                sortedStocks.map((data, index) => {
                  return (
                    <div className="d-flex" key={index}>
                      <div className={styles.bottomData}>
                        <BsListUl className={styles.number} size={23} />
                        <div className={styles.namaBarang}>{data.name}</div>
                      </div>
                      <div className={styles.transaction}>
                        <BsArrowUpShort size={23} className="my-auto" />
                        {data.count}{" "}
                        {data.count > 1 ? "Transactions" : "Transaction"}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.nodata}>NO DATA FOUND</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
