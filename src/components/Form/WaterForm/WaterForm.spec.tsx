import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WaterForm } from "./index";

import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

describe("Form testing", () => {
  it("should be a11y", async () => {
    const { container } = render(<WaterForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it("should fire an API call when the items are valid", async () => {
    const { container } = render(<WaterForm />);

    const accountNumber = container.querySelector(
      'input[name="accountNumber"]'
    );
    const clientNumber = container.querySelector('input[name="clientNumber"]');
    const lastName = container.querySelector('input[name="lastName"]');
    const postalCode = container.querySelector('input[name="postalCode"]');
    const paymentMethod = container.querySelector(
      'input[name="paymentMethod"]'
    );
    const email = container.querySelector('input[name="email"]');
    const threshold = container.querySelector('input[name="threshold"]');
    const submit = container.querySelector('button[name="submit"]');
    await waitFor(() => {
      userEvent.type(accountNumber!, "123456789");
    });
    await waitFor(() => {
      userEvent.type(clientNumber!, "123456789 01");
    });
    await waitFor(() => {
      userEvent.type(lastName!, "Name");
    });
    await waitFor(() => {
      userEvent.type(postalCode!, "M1M 1M1");
    });
    await waitFor(() => {
      userEvent.type(paymentMethod!, "4");
    });
    await waitFor(() => {
      userEvent.type(email!, "email@email.com");
    });
    await waitFor(() => {
      userEvent.type(threshold!, "3");
    });

    expect(submit).toBeDisabled();
  });
});
