import * as yup from "yup";

export const yup_email = yup.string().required();
export const yup_password = yup
  .string()
  .min(8)
  .max(15)
  .matches(/^(?=\S*[a-zA-Z])(?=\S*\d)\S+$/)
  .required();
