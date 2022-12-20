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
  name: yup.string().required("Required"),
  dob: yup.date().required(),
  gender: yup.string().required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required()
});

export const stockSchema = yup.object().shape({
  name: yup.string().required("Stock name cannot be empty!"),
  price: yup.number().required("Price name cannot be empty!"),
  quantity: yup.number().required("Quantity name cannot be empty!")
});


