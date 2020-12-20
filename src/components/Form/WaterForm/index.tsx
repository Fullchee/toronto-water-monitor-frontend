import React from "react";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import "./WaterForm.scss";
import ""

import FormikField from "../FormikField";
import FormikSelect from "../FormikSelect";
import {
  FormValues,
  initialValues,
  paymentMethodItems,
  WaterFormSchema,
} from "./WaterFormSchema";

export const WaterForm: React.FC = () => {
  const handleSubmit = async (values: FormValues): Promise<void> => {
    const formattedValues = formatValues(values);
    // TODO: setState: submitted to change the form to be a SUCCESS message or to indicate the error at the top
    console.log(result);
  };

  return (
    <div className="water-form">
      <div className="water-form__intro">
        <h1>Get Toronto water usage alerts</h1>
        <p>Get an email when your water usage goes up!</p>
        <p>
          This is the same info as the{" "}
          <a href="https://www.toronto.ca/services-payments/water-environment/how-to-use-less-water/mywatertoronto/mywater-toronto-application/">
            official MyWaterToronto site
          </a>
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={WaterFormSchema}
      >
        {({ dirty, isValid }) => {
          return (
            <Form>
              <div className="toronto-water-items">
                <div className="account-number">
                  <FormikField
                    name="accountNumber"
                    label="Account number"
                    required
                  />
                  <FormikField
                    name="clientNumber"
                    label="Client number"
                    required
                  />
                </div>
                <FormikField
                  name="lastName"
                  label="Last name or business name"
                  required
                />
                <FormikField name="postalCode" label="Postal code" required />
                <FormikSelect
                  name="paymentMethod"
                  items={paymentMethodItems}
                  label="Position"
                  required
                />
              </div>
              <div className="monitor-items">
                <FormikField name="email" label="Email" required type="email" />
                <FormikField
                  name="threshold"
                  label="Get notified when you use more than this amount of water (in thousands of litres)"
                  required
                  type="number"
                />
              </div>
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
