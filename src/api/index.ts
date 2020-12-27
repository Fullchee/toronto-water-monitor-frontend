import { FormValues } from "../components/Form/WaterForm/WaterFormSchema";

interface APIAccount {
  accountNumber: string;
  email: string;
  lastName: string;
  paymentMethod: string;
  postalCode: string;
  threshold: string;
}
let backendUrl: string;
if (process.env.NODE_ENV === "development") {
  backendUrl = "http://localhost:8000";
} else if (process.env.NODE_ENV === "production") {
  backendUrl = "https://toronto-water-monitor.herokuapp.com";
} else {
  backendUrl = "https://toronto-water-monitor.herokuapp.com";
}

export const createAccount = async (formattedValues: APIAccount) => {
  const result = await fetch(`${backendUrl}/create-account`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(formattedValues), // body data type must match "Content-Type" header
  });

  if (result.status === 201) {
    return "Form submitted successfully! Check your inbox for a confirmation email";
  } else if (result.status === 409) {
    return "Account already exists";
  } else if (result.status === 400) {
    return "Check that the info works on MyWaterToronto";
  } else if (result.status === 500) {
    console.log(result);
    return "Server error";
  } else {
    console.log(result);
    return "Unknown error";
  }
};

export const formatValues = (values: FormValues): APIAccount => {
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
    paymentMethod: values.paymentMethod,
    postalCode: values.postalCode,
    threshold: values.threshold + "",
  };
};
