import { BsFilterSquare } from "react-icons/bs";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
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
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];

  console.log(props);

  const monthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const transactionOptions = [
    { value: "Repair", label: "Repair" },
    { value: "Custom", label: "Custom" },
    { value: "Fabrication", label: "Fabrication" },
  ];
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      borderRadius: 12,
    }),
  };

  const clearFilter = () => {
    props.reportfilterStatus
      ? props?.setFilter({ status: "", type: "" })
      : props.reportFilter ?
        props?.setFilterDataPerPeriod({ month: "", year: "" })
      : props.chart && props?.setFilterChart({ month: "", year: "" });
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

          {(props.chart || props.filterDashboard) && (
            <FormGroup>
              <Label className={formStyles.label}>Input Year</Label>
              <Input
                placeholder="Year"
                className={formStyles.input}
                value={props.filterChart.year}
                onChange={(e) =>
                  props.setFilterChart({
                    ...props.filterChart,
                    year: e.target.value,
                  })
                }
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </FormGroup>
          )}
          {props.reportFilter && (
            <>
              <FormGroup>
                <Label className={formStyles.label}>Input Year</Label>
                <Input
                  placeholder="Year"
                  className={formStyles.input}
                  value={props.filterDataPerPeriod.year}
                  onChange={(e) =>
                    props.setFilterDataPerPeriod({
                      ...props.filterDataPerPeriod,
                      year: e.target.value,
                    })
                  }
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label className={formStyles.label}>Select Month</Label>
                <Select
                  options={monthOptions}
                  value={
                    props.filterDataPerPeriod?.month !== ""
                      ? monthOptions.find(
                          (option) =>
                            option.value === props.filterDataPerPeriod?.month
                        )
                      : ""
                  }
                  styles={style}
                  className={formStyles.input}
                  onChange={(e) =>
                    props.setFilterDataPerPeriod({
                      ...props.filterDataPerPeriod,
                      month: e.value,
                    })
                  }
                  maxMenuHeight={500}
                  placeholder="Month"
                />
              </FormGroup>
            </>
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
