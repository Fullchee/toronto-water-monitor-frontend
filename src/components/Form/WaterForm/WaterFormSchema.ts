import * as Yup from "yup";
import { FormikSelectItem } from "../FormikSelect";

export const WaterFormSchema = Yup.object().shape({
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
  email: Yup.string().required("Email is required to get notifications"),
});

export interface FormValues {
  accountNumber: string;
  clientNumber: string;
  lastName: string;
  postalCode: string;
  paymentMethod: string;
  email: string;
}

export const initialValues: FormValues = {
  accountNumber: "",
  clientNumber: "",
  lastName: "",
  postalCode: "",
  paymentMethod: "",
  email: "",
};

export const paymentMethodItems: FormikSelectItem[] = [
  {
    label: "N/A",
    value: "0",
  },
  {
    label: "Pre-authorized",
    value: "1",
  },
  {
    label: "Main-in cheque",
    value: "2",
  },
  {
    label: "In-person",
    value: "3",
  },
  {
    label: "Bank payment",
    value: "4",
  },
  {
    label: "Payment drop box",
    value: "3",
  },
];
