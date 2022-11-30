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
import styles from "../../styles/TableTransaksi.module.css";
import Select from "react-select";
import formStyles from "../../styles/Form.module.css";

const Filter = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const optionsForTransaction = [
    { value: "inProgress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      borderRadius: 12,
    }),
  };
  return (
    <div>
      <Dropdown
        direction="down"
        isOpen={filterOpen}
        toggle={toggleFilter}
        // onClick={() => setFilterOpen(!filterOpen)}
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
            <FormGroup>
              <Label className={formStyles.label}>Status Transaksi</Label>
              <Select
                options={optionsForTransaction}
                styles={style}
                className={formStyles.input}
                placeholder="Pilih Status Transaksi"
              />
            </FormGroup>
            <FormGroup >
              <Label className={formStyles.label}>Pelanggan</Label>
              <Input placeholder="Nama Pelanggan" className={formStyles.input} />
            </FormGroup>
            <FormGroup >
              <Label className={formStyles.label}>Mekanik</Label>
              <Input placeholder="Nama Mekanik" className={formStyles.input} />
            </FormGroup>
            <FormGroup>
              <Label className={formStyles.label}>Jenis Layanan</Label>
              <Select
                options={optionsForTransaction}
                styles={style}
                className={formStyles.input}
                placeholder="Pilih Jenis Layanan"
              />
            </FormGroup>
          </Form>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Filter;
