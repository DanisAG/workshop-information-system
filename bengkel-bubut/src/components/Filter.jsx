import { BsFilterSquare } from "react-icons/bs";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useState } from "react";
import styles from "../styles/TableTransaksi.module.css";
import Select from "react-select";
import formStyles from "../styles/Form.module.css";
import DatePicker from "react-datepicker";

const Filter = (props) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const [transactionDate, setTransactionDate] = useState(new Date());

  const optionsForTransaction = [
    { value: "inProgress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  const optionsForTransactionReport = [
    { value: "Januari", label: "Januari" },
    { value: "Februari", label: "Februari" },
  ];
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      borderRadius: 12,
    }),
  };
  return (
    <div>
      <Dropdown
        direction="down"
        isOpen={filterOpen}
        // toggle={toggleFilter}
        onClick={() => setFilterOpen(!filterOpen)}
        style={{ zIndex: 300 }}
        onClickOutside
      >
        <DropdownToggle
          className="icon-btn hide-arrow"
          color="transparent"
          size="sm"
        >
          <BsFilterSquare size={40} className={styles.iconFilter} />
        </DropdownToggle>
        <DropdownMenu>
          <Form className={styles.formFilter}>
            {props.transactionFilter && (
              <>
                {" "}
                <FormGroup>
                  <Label className={formStyles.label}>Status Transaksi</Label>
                  <Select
                    options={optionsForTransaction}
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
                    options={optionsForTransaction}
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
                <Label className={formStyles.label}>ID Transaksi</Label>
                <Input
                  placeholder="ID Transaksi"
                  className={formStyles.input}
                />
              </FormGroup>
              <FormGroup className={styles.formgroup}>
              <Label className={styles.label}>Tanggal Lahir</Label>
              <DatePicker
                selected={transactionDate}
                onChange={(date) => setTransactionDate(date)}
                onClickOutside
                className={styles.datepicker}
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
          </Form>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Filter;
