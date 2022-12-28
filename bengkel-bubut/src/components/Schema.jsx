import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .email("Please enter a valid email")
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});

export const customerSchema = yup.object().shape({
  name: yup.string().required("Customer name cannot be empty"),
  dob: yup.date().required("Date of Birth cannot be empty"),
  gender: yup.string().required("Gender cannot be empty"),
  address: yup.string().required("Address cannot be empty"),
  phone: yup.string().required("Phone cannot be empty"),
  email: yup.string().required("Email cannot be empty"),
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
  phone: yup.string().required("Phone cannot be empty"),
  email: yup.string().required("Email cannot be empty"),
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
        then: yup
          .number()
          .required("Item Field should be filled first")
          ,
      }),
    status: yup.string().required("Status cannot be empty"),
  });
