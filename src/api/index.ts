import { FormValues } from "../components/Form/WaterForm/WaterFormSchema";

let backendUrl: string;
if (process.env.NODE_ENV === "development") {
  backendUrl = "localhost:8000";
} else if (process.env.NODE_ENV === "production") {
  backendUrl = "https://toronto-water-monitor.herokuapp.com";
} else {
  backendUrl = "https://toronto-water-monitor.herokuapp.com";
}

export const createAccount = async (values: FormValues) => {
  await fetch(`${backendUrl}/create-account`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(formatValues(values)), // body data type must match "Content-Type" header
  });
};

const formatValues = (values: FormValues): object => {
  values.clientNumber = values.clientNumber.replace(" ", "-");
  if (values.postalCode.length === 6) {
    // add a space
    values.postalCode = `${values.postalCode.slice(
      0,
      3
    )} ${values.postalCode.slice(3)}`;
  }

  return {
    accountNumber: `${values.accountNumber}-${values.clientNumber}`,
    email: values.email,
    lastName: values.lastName,
    paymentMethod: parseInt(values.paymentMethod),
    postalCode: values.postalCode,
    threshold: values.threshold,
  };
};
