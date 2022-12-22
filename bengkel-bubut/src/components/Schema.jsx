import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup.object().shape({
  username: yup.string().email("Please enter a valid email").required("Required"),
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
  email: yup.string().required("Email cannot be empty")
});

export const stockSchema = yup.object().shape({
  name: yup.string().required("Stock name cannot be empty!"),
  price: yup.number().required("Price cannot be empty!"),
  quantity: yup.number().required("Quantity cannot be empty!")
});

export const mechanicSchema = yup.object().shape({
  name: yup.string().required("Mechanic name cannot be empty"),
  dob: yup.date().required("Date of Birth cannot be empty"),
  gender: yup.string().required("Gender cannot be empty"),
  address: yup.string().required("Address cannot be empty"),
  phone: yup.string().required("Phone cannot be empty"),
  email: yup.string().required("Email cannot be empty")
});

