import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import swal from "sweetalert2";
import "../../styles/Swal.css";
import AuthContext from "../store/AuthContext";
import { saveAs } from "file-saver";
import moment from "moment";
import styles from "../../styles/TableTransaksi.module.css";
import { BiExport } from "react-icons/bi";
const ExportExcel = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const tes = () => {
    swal
      .fire({
        title:
          "<span style='font-family:Helvetica'>Transaction Export Excel</span>",
        html: `<div style="font-family:Helvetica;display:flex; justify-content:center;align-items:center">
                    <label >Start Date</label>
                    <input type="date" id="startDate" class="swal2-input" placeholder="Username">
                </div>
                <div style="font-family:Helvetica;display:flex; justify-content:center;align-items:center"">
                    <label >End Date  </label><input type="date" id="endDate" class="swal2-input" placeholder="Password">     
                </div>`,
        confirmButtonText: "Export",
        focusConfirm: false,
        preConfirm: async () => {
          const startDate = swal.getPopup().querySelector("#startDate").value;
          const endDate = swal.getPopup().querySelector("#endDate").value;
          //   if (!startDate || !endDate) {
          //     swal.showValidationMessage(`Please enter login and password`);
          //   }
          await fetch("http://localhost:8080/transaction/export", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
              responseType: "blob",
            },
            body: JSON.stringify({
              filter: {
                startDate: "2020-11-27",
                endDate: "2023-12-30",
              },
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              } else {
                saveAs(
                  response.data,
                  `BidComparison (${moment().format(
                    "DD/MM/yyy hh:mm:ss"
                  )}).xlsx`
                );
                swal.fire("Added!", "The Data has been added.", "success");
              }
            })
            .catch((error) => {
              swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Request failed: ${error}`,
              });
            });
          return { login: startDate, password: endDate };
        },
      })
      .then((result) => {
        swal.fire(
          `
              Login: ${result.value.login}
              Password: ${result.value.password}
            `.trim()
        );
      });
  };
  const exportExcel = async () => {
    await fetch("http://localhost:8080/transaction/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      //  responseType: "blob",
      body: JSON.stringify({
        filter: {
          startDate: "2020-11-27",
          endDate: "2023-12-30",
        },
      }),
    })
      .then((response) => {
        // const blob = new Blob([JSON.stringify(response)], {
        //     type: "application/json",

        //   });
        //   console.log(blob)
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        //    console.log(response.createObjectURL(blob))
        return response.json();
      })
      .then((data) => {
        console.log(data);
        saveAs(
          data,
          `Transaction (${moment().format("DD/MM/yyy hh:mm:ss")}).xlsx`
        );
        swal.fire("Added!", "The Data has been added.", "success");
      })
      .catch((error) => {
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Request failed: ${error}`,
        });
      });
  };
  return (
    <>
      <Button outline className={styles.exportExcel} onClick={exportExcel}>
        <div className="d-flex align-items-center">
          <BiExport size={20} className={styles.plusIcon}/>
        </div>
        Export Excel
      </Button>
    </>
  );
};

export default ExportExcel;
