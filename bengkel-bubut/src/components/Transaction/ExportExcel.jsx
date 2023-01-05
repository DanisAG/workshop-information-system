import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import swal from "sweetalert2";
import "../../styles/Swal.css";
import AuthContext from "../store/AuthContext";
import { saveAs } from "file-saver";
import moment from "moment";
import styles from "../../styles/TableTransaksi.module.css";
import { BiExport } from "react-icons/bi";
import DatePicker from "react-datepicker";
import formStyles from "../../styles/Form.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import { exportExcelSchema } from "../Schema";


const ExportExcel = () => {
  const authCtx = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onSubmit = (values) => {
    const data = {
      filter: {
        startDate: values.startDate,
        endDate: values.endDate,
      },
    };
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to export?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Export",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await swal.fire({
            title: "Please Wait...",
            timer: 1000,
            showConfirmButton: false,
            didOpen: () => {
              swal.showLoading();
            },
          });
          await fetch("http://localhost:8080/transaction/export", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            },
            responseType: "blob",
            body: JSON.stringify({
              filter: {
                startDate: values.startDate
                  ? moment(values.startDate).format("yyyy-MM-DD")
                  : "",
                endDate: values.endDate
                  ? moment(values.endDate).format("yyyy-MM-DD")
                  : "",
              },
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.blob();
            })
            .then((data) => {
              const outputFilename = `${Date.now()}.xlsx`;

              const url = URL.createObjectURL(new Blob([data]));
              console.log(url);
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", outputFilename);
              document.body.appendChild(link);
              link.click();
              swal.fire("Added!", "The Data has been exported.", "success");
              onCloseModal();
              setFieldValue("startDate", "");
              setFieldValue("endDate", "");
            })
            .catch((error) => {
              swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Request failed: ${error}`,
              });
            });
        }
      });
  };

  const { handleSubmit, values, errors, touched, setFieldValue } = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: exportExcelSchema,
    onSubmit,
  });

  return (
    <div>
      <Button outline className={styles.exportExcel} onClick={onOpenModal}>
        <div className="d-flex align-items-center">
          <BiExport size={20} className={styles.plusIcon} />
        </div>
        Export Excel
      </Button>
      {open && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <div className={styles.formHeader}>
              <div className={styles.formTitle}>Export Excel</div>
              <AiOutlineCloseCircle
                size={35}
                className={styles.close}
                onClick={onCloseModal}
              />
            </div>
            <Form onSubmit={handleSubmit}>
              <FormGroup className={formStyles.formgroup}>
                <Label className={formStyles.label}>Start Date</Label>
                <DatePicker
                  id="startDate"
                  autoComplete="off"
                  selected={values.startDate}
                  placeholderText="Start Date"
                  onChange={(date) => setFieldValue("startDate", date)}
                  onClickOutside
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  className={
                    errors.startDate && touched.startDate
                      ? styles.datepickerError
                      : styles.datepicker
                  }
                  isClearable="true"
                  dateFormat="yyyy-MM-dd"
                />
                {errors.startDate && touched.startDate && (
                  <p className={formStyles.error}>{errors.startDate}</p>
                )}
              </FormGroup>
              <FormGroup className={formStyles.formgroup}>
                <Label className={formStyles.label}>End Date</Label>
                <DatePicker
                  id="endDate"
                  autoComplete="off"
                  selected={values.endDate}
                  placeholderText="End Date"
                  onChange={(date) => setFieldValue("endDate", date)}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  className={
                    errors.endDate && touched.endDate
                      ? styles.datepickerError
                      : styles.datepicker
                  }
                  isClearable="true"
                  dateFormat="yyyy-MM-dd"
                />
                {errors.endDate && touched.endDate && (
                  <p className={styles.error}>{errors.endDate}</p>
                )}
              </FormGroup>
              <div className={formStyles.formgroup}>
                <Button
                  className="w-100 mt-2"
                  style={{ backgroundColor: "#6f6af8" }}
                  type="submit"
                >
                  Export Excel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportExcel;
