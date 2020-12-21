import { render, prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WaterForm } from "./index";

import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

describe("Form testing", () => {
  test("a11y", async () => {
    const { container } = render(<WaterForm />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
  test.skip("happy path: valid items", () => {
    const { getByText, getByLabelText, getByTestId } = render(<WaterForm />);

    const accountNumber = getByTestId("accountNumber");
    userEvent.type(accountNumber, "123456789");
    console.log(prettyDOM(accountNumber));
    // expect(getByTestId("accountNumber")).toHaveValue("123456789");
  });
});
