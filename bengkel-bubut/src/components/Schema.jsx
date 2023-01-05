import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const phonenumber = /^08[0-9]{10,}$/;
export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email Cannot Be Empty"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password Cannot Be Empty"),
});

export const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email Cannot Be Empty"),
  username: yup.string().required("Username Cannot Be Empty"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password Cannot Be Empty"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation cannot be empty"),
});

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password Cannot Be Empty"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation cannot be empty"),
});

export const customerSchema = yup.object().shape({
  name: yup.string().required("Customer name cannot be empty"),
  dob: yup.date().required("Date of Birth cannot be empty"),
  gender: yup.string().required("Gender cannot be empty"),
  address: yup.string().required("Address cannot be empty"),
  phone: yup
    .string()
    .matches(phonenumber, { message: "Invalid Phone Number" })
    .max(12)
    .required("Phone cannot be empty"),
  email: yup.string().email("Invalid Email").required("Email cannot be empty"),
});

export const stockSchema = yup.object().shape({
  name: yup.string().required("Stock name cannot be empty!"),
  price: yup.number().required("Price cannot be empty!"),
  quantity: yup.number().required("Quantity cannot be empty!"),
  minimumQty: yup.number().required("Minimum Quantity cannot be empty!"),
});

export const mechanicSchema = yup.object().shape({
  name: yup.string().required("Mechanic name cannot be empty"),
  dob: yup.date().required("Date of Birth cannot be empty"),
  gender: yup.string().required("Gender cannot be empty"),
  address: yup.string().required("Address cannot be empty"),
  phone: yup
    .string()
    .required("Phone cannot be empty")
    .matches(phonenumber, { message: "Invalid Phone Number" })
    .max(12),
  email: yup.string().email("Invalid Email").required("Email cannot be empty"),
});

export const transactionSchema = (data) =>
  yup.object().shape({
    name: yup.string().required("Mechanic name cannot be empty"),
    type: yup.string().required("Service Type cannot be empty"),
    mechanic: yup.string().required("Mechanic cannot be empty"),
    customer: yup.string().required("Customer cannot be empty"),
    stock: yup.string().required("Stock cannot be empty"),
    price: yup.string().required("Price cannot be empty"),
    quantity: yup
      .number()
      .lessThan(
        data,
        `The quantity exceeds the number of stocks available wchich is ${
          data - 1
        }`
      )
      .when(["stock"], {
        is: (stock) => isNaN(stock),
        then: yup.number().required("Item Field should be filled first"),
      }),
    status: yup.string().required("Status cannot be empty"),
  });

  
  const context = {
   startDate: "",
    endDate: ""
  }
  
 

export const exportExcelSchema = () =>
  yup.object().shape({
    // startDate: yup.string().when('endDate', {
    //   is: (endDate,node) => endDate.length > 0,
    //   then: yup.string()
    //     .required('Field is required')
    // }).nullable(),
    // endDate: yup.string().when('startDate',{
    //   is: (value) => !!value,
    //   then: yup.string().required('This is a required field.').nullable()
    // }).nullable()
    startDate: yup.string().nullable().when("endDate", (endDate) => {
      if (endDate) {
        return yup
          .string()
          .required("Start Date is required")
          .typeError("Start Date is required");
      }
    }),
    endDate: yup.string().nullable().when("startDate", (startDate) => {
      if (startDate) {
        return yup
          .date()
            .min(startDate, "End Date must be after Start Date")
          .required("End Date is required")
          .typeError("End Date is required");
      }
    }),
  },['startDate', 'endDate']);
