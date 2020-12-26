import React from "react";
import { ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";

import "./FormikField.scss";

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

const FormikField: React.FC<FormikFieldProps> = ({
  name,
  label,
  type = "text",
  required = false,
}) => {
  return (
    <div className="FormikField">
      <Field
        id={name}
        required={required}
        autoComplete="off"
        as={TextField}
        label={label}
        name={name}
        fullWidth
        type={type}
        helperText={<ErrorMessage name={name} />}
      />
    </div>
  );
};

export default FormikField;
