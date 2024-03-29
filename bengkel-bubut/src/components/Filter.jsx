import { BsFilterSquare } from "react-icons/bs";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import styles from "../styles/TableTransaksi.module.css";
import Select from "react-select";
import formStyles from "../styles/Form.module.css";
import moment from "moment";

const Filter = (props) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = () => {
    setFilterOpen((prevState) => !prevState);
  };
  const optionsForTransactionStatus = [
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];

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

  console.log()

  const clearFilter = () => {
    props.reportfilterStatus
      ? props?.setFilter({ status: "", type: "", customer: "", mechanic: "",month: "", year: "", day: "" })
      : props.reportFilter 
      ? props?.setFilterDataPerPeriod({ month: "", year: "", day: "" })
      : props.financialReportFilterStatus
      ? props?.setFilter({ month: "", year: "", day: "" })
      : props.chart && props?.setFilterChart({ month: "", year: moment().year() });
      
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
          {(props.transactionFilterStatus || props.filterDashboard) && (
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
              <FormGroup>
                <Label className={formStyles.label}>Input Customer</Label>
                <Input
                  placeholder="Customer"
                  className={formStyles.input}
                  value={props.filter.customer}
                  onChange={(e) =>
                    props.setFilter({
                      ...props.filter,
                      customer: e.target.value,
                    })
                  }
                 
                />
              </FormGroup>
              <FormGroup>
                <Label className={formStyles.label}>Input Mechanic</Label>
                <Input
                  placeholder="Mechanic"
                  className={formStyles.input}
                  value={props.filter.mechanic}
                  onChange={(e) =>
                    props.setFilter({
                      ...props.filter,
                      mechanic: e.target.value,
                    })
                  }
          
                />
              </FormGroup>
            </>
          )}

          {props.chart && (
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
              <FormGroup>
                <Label className={formStyles.label}>Input Day</Label>
                <Input
                  placeholder="Day"
                  className={formStyles.input}
                  value={props.filterDataPerPeriod.day}
                  onChange={(e) =>
                    props.setFilterDataPerPeriod({
                      ...props.filterDataPerPeriod,
                      day: e.target.value,
                    })
                  }
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </FormGroup>
            </>
          )}

          {props.financialReportFilterStatus && (
            <>
              <FormGroup>
                <Label className={formStyles.label}>Input Year</Label>
                <Input
                  placeholder="Year"
                  className={formStyles.input}
                  value={props.filter.year}
                  onChange={(e) =>
                    props.setFilter({
                      ...props.filter,
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
                    props.filter?.month !== ""
                      ? monthOptions.find(
                          (option) => option.value === props.filter?.month
                        )
                      : ""
                  }
                  styles={style}
                  className={formStyles.input}
                  onChange={(e) =>
                    props.setFilter({
                      ...props.filter,
                      month: e.value,
                    })
                  }
                  maxMenuHeight={100}
                  placeholder="Month"
                />
              </FormGroup>
              <FormGroup>
                <Label className={formStyles.label}>Input Day</Label>
                <Input
                  placeholder="Day"
                  className={formStyles.input}
                  value={props.filter.day}
                  onChange={(e) =>
                    props.setFilter({
                      ...props.filter,
                      day: e.target.value,
                    })
                  }
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
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
