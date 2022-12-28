import { BsFilterSquare } from "react-icons/bs";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown,
  Button,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";
import styles from "../styles/TableTransaksi.module.css";
import Select from "react-select";
import formStyles from "../styles/Form.module.css";

const Filter = (props) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = () => {
    setFilterOpen((prevState) => !prevState);
  };
  const optionsForTransactionStatus = [
    { value: "IN PROGRESS", label: "IN PROGRESS" },
    { value: "DONE", label: "DONE" },
  ];

  const optionsForTransactionReport = [
    { value: "Januari", label: "Januari" },
    { value: "Februari", label: "Februari" },
  ];

  const transactionOptions = [
    { value: "Repair", label: "Repair" },
    { value: "Customization", label: "Customization" },
  ];
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      borderRadius: 12,
    }),
  };

  console.log(filterOpen);
  const clearFilter = () => {
    props.setFilter({ status: "", type: "" });
  };

  return (
    <div className={styles.dropdown}>
      <BsFilterSquare
        size={40}
        className={styles.iconFilter}
        onClick={toggleFilter}
      ></BsFilterSquare>
      {filterOpen && (
        <Form className={styles.formFilter}>
          {props.transactionFilter && (
            <>
              {" "}
              <FormGroup>
                <Label className={formStyles.label}>Status Transaksi</Label>
                <Select
                  options={optionsForTransactionStatus}
                  styles={style}
                  className={formStyles.input}
                  placeholder="Pilih Status Transaksi"
                />
              </FormGroup>
              <FormGroup>
                <Label className={formStyles.label}>Pelanggan</Label>
                <Input
                  placeholder="Nama Pelanggan"
                  className={formStyles.input}
                />
              </FormGroup>
              <FormGroup>
                <Label className={formStyles.label}>Mekanik</Label>
                <Input
                  placeholder="Nama Mekanik"
                  className={formStyles.input}
                />
              </FormGroup>
              <FormGroup>
                <Label className={formStyles.label}>Jenis Layanan</Label>
                <Select
                  options={optionsForTransactionStatus}
                  styles={style}
                  className={formStyles.input}
                  placeholder="Pilih Jenis Layanan"
                />
              </FormGroup>{" "}
            </>
          )}

          {props.reportfilterStatus && (
            <>
              <FormGroup>
                <Label className={formStyles.label}>Status</Label>
                <Select
                  id="status"
                  options={optionsForTransactionStatus}
                  value={
                    props.filter.status !== ""
                      ? optionsForTransactionStatus.find(
                          (option) => option.value === props.filter.status
                        )
                      : ""
                  }
                  styles={style}
                  className={formStyles.input}
                  onChange={(e) =>
                    props.setFilter({ ...props.filter, status: e.value })
                  }
                  maxMenuHeight={500}
                  placeholder="Status"
                />
              </FormGroup>
              <FormGroup className={styles.formgroup}>
                <Label className={formStyles.label}>Service Type</Label>
                <Select
                  id="type"
                  options={transactionOptions}
                  value={
                    props.filter.type !== ""
                      ? transactionOptions.find(
                          (option) => option.value === props.filter.type
                        )
                      : ""
                  }
                  styles={style}
                  className={formStyles.input}
                  onChange={(e) =>
                    props.setFilter({ ...props.filter, type: e.value })
                  }
                  maxMenuHeight={500}
                  placeholder="Service Type"
                />
              </FormGroup>
            </>
          )}

          {props.reportFilter && (
            <FormGroup>
              <Label className={formStyles.label}>Pilih Periode</Label>
              <Select
                options={optionsForTransactionReport}
                styles={style}
                className={formStyles.input}
                placeholder="Pilih Periode"
              />
            </FormGroup>
          )}
          <Button
            className="w-100 mt-3"
            onClick={clearFilter}
            style={{ backgroundColor: "#6f6af8" }}
          >
            Clear All Filters
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Filter;
