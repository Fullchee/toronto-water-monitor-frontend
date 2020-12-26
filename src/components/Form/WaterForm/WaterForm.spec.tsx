import { render, waitFor, prettyDOM, fireEvent } from "@testing-library/react";
import { WaterForm } from "./index";

import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

describe("Form testing", () => {
  it("should be a11y", async () => {
    const { container } = render(<WaterForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  async function fillForm(container: Element, values: any) {
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
    await waitFor(() => {
      fireEvent.change(accountNumber!, {
        target: {
          value: values.accountNumber,
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(clientNumber!, {
        target: {
          value: values.clientNumber,
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(lastName!, {
        target: {
          value: values.lastName,
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(postalCode!, {
        target: {
          value: values.postalCode,
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(paymentMethod!, {
        target: {
          value: values.paymentMethod,
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(email!, {
        target: {
          value: values.email,
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(threshold!, {
        target: {
          value: values.threshold,
        },
      });
    });
    return {
      accountNumber,
      clientNumber,
      lastName,
      postalCode,
      paymentMethod,
      email,
      threshold,
    };
  }
  it("should enable the submit button when the items are valid", async () => {
    const { container } = render(<WaterForm />);
    await fillForm(container, {
      accountNumber: "123456789",
      clientNumber: "123456789 01",
      lastName: "Name",
      postalCode: "M1M 1M1",
      paymentMethod: "4",
      email: "email@email.com",
      threshold: "3",
    });

    const submit = container.querySelector('button[name="submit"]');
    expect(submit).toBeEnabled();
  });

  it("should validate the account number", async () => {
    const { container } = render(<WaterForm />);
    await fillForm(container, {
      accountNumber: "1234567890",
      clientNumber: "123456789 01",
      lastName: "Name",
      postalCode: "M1M 1M1",
      paymentMethod: "4",
      email: "email@email.com",
      threshold: "3",
    });

    const submit = container.querySelector('button[name="submit"]');
    expect(submit).toBeDisabled();
  });
});
