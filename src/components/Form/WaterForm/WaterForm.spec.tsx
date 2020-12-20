import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WaterForm } from "./index";
import "@testing-library/jest-dom";

describe("Form testing", () => {
  test("happy path: valid items", () => {
    const { getByText, getByLabelText } = render(<WaterForm />);

    const accountNumber = getByLabelText("accountNumber");
    userEvent.type(accountNumber, "123456789");
    console.log(accountNumber);
  });
});
