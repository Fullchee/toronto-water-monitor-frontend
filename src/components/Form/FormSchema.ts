import * as Yup from "yup";

export const FormSchema = Yup.object().shape({
  accountNumber: Yup.string()
    .min(9, "Account number must be exactly 9 digits")
    .max(9, "Account number must be exactly 9 digits")
    .required("Account number is required"),

  clientNumber: Yup.string()
    .min(11, "Client number must have this format: ######### 0#")
    .max(12, "Client number must have this format: ######### 0#")
    .matches(
      /^\d{9}[\s-]?0\d$/g,
      "Client number must have this format: ######### 0#"
    )
    .required("Client number is required"),

  postalCode: Yup.string()
    .min(6, "Postal code must have this format: A#A #A#")
    .max(7, "Postal code must have this format: A#A #A#")
    .required("Postal code is required"),

  lastName: Yup.string()
    .min(1, "Too short")
    .required("Last name or business name is required"),

  paymentMethod: Yup.number().required("Payment method is required"),
});
