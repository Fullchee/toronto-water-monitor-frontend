import React, { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import "./WaterForm.scss";
import { createAccount, formatValues } from "../../../api";

import FormikField from "../FormikField";
import FormikSelect from "../FormikSelect";
import {
  FormValues,
  initialValues,
  paymentMethodItems,
  WaterFormSchema,
} from "./WaterFormSchema";

export const WaterForm: React.FC = () => {
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const formattedValues = formatValues(values);
    const result = await createAccount(formattedValues);
    if (
      result === "Account already exists" ||
      result === "Check that the info works on MyWaterToronto"
    ) {
      setFormError(result);
    } else {
      console.log(result);
      setSubmittedMessage(result);
    }
  };

  return submittedMessage ? (
    <div className="water-form">
      <h1>{submittedMessage}</h1>
    </div>
  ) : (
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
                  <div className="client-number">
                    <FormikField
                      name="clientNumber"
                      label="Client number"
                      required
                    />
                  </div>
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
                  label="Payment method"
                  required
                />
              </div>
              <div className="monitor-items">
                <FormikField name="email" label="Email" required type="email" />
                <FormikField
                  name="threshold"
                  label="Threshold"
                  required
                  type="number"
                />
              </div>
              <p className="description-text">
                You'll get an email when your daily water usage surpasses the
                threshold (in thousands of litres)
              </p>
              <Button
                variant="contained"
                color="primary"
                disabled={!dirty || !isValid}
                type="submit"
                name="submit"
              >
                Subscribe
              </Button>
              {formError ? <p className="form-error">{formError}</p> : null}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
