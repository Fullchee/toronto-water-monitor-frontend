import * as Yup from "yup";
import { FormikSelectItem } from "../FormikSelect";

export const WaterFormSchema = Yup.object().shape({
  accountNumber: Yup.string()
    .min(9, "Account number has 9 digits")
    .max(9, "Account number has 9 digits")
    .required("Account number is required"),

  clientNumber: Yup.string()
    .min(11, "Client number format: ######### 0#")
    .max(12, "Client number format: ######### 0#")
    .matches(/^\d{9}[\s-]?0\d$/g, "Client number format: ######### 0#")
    .required("Client number is required"),

  postalCode: Yup.string()
    .min(6, "Postal code format: A#A #A#")
    .max(7, "Postal code format: A#A #A#")
    .matches(/^\w\d\w[\s]?\d\w\d$/g, "Postal code format: A#A #A#")
    .required("Postal code is required"),

  lastName: Yup.string()
    .min(1, "Too short")
    .required("Last name or business name is required"),

  paymentMethod: Yup.string().required("Payment method is required"),
  email: Yup.string()
    .email()
    .required("Email is required to get notifications"),
  threshold: Yup.number().required("Please enter a threshold (default is 3)"),
});

export interface FormValues {
  accountNumber: string;
  clientNumber: string;
  lastName: string;
  postalCode: string;
  paymentMethod: string;
  email: string;
  threshold: number;
}

export const initialValues: FormValues = {
  accountNumber: process.env.REACT_APP_ACCOUNT_NUMBER || "",
  clientNumber: process.env.REACT_APP_CLIENT_NUMBER || "",
  lastName: process.env.REACT_APP_LAST_NAME || "",
  postalCode: process.env.REACT_APP_POSTAL_CODE || "",
  paymentMethod: process.env.REACT_APP_LAST_PAYMENT_METHOD || "",
  email: process.env.REACT_APP_EMAIL || "",
  threshold: 3,
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
