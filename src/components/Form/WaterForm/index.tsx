import React from "react";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import "./WaterForm.scss";

import FormikField from "../FormikField";
import FormikSelect from "../FormikSelect";
import {
  FormValues,
  initialValues,
  paymentMethodItems,
  WaterFormSchema,
} from "./WaterFormSchema";

export const WaterForm: React.FC = () => {
  const handleSubmit = (values: FormValues): void => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="App">
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={WaterFormSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <FormikField
                name="accountNumber"
                label="Account number"
                required
              />
              <FormikField name="clientNumber" label="Client number" required />
              <FormikField name="postalCode" label="Postal code" required />
              <FormikField
                name="lastName"
                label="Last name or business name"
                required
              />
              <FormikSelect
                name="paymentMethod"
                items={paymentMethodItems}
                label="Position"
                required
              />
              <FormikField name="email" label="Email" required type="email" />
              <Button
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                type="submit"
              >
                Subscribe
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
