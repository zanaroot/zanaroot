import { I18nProviderClient } from "@/packages/locales/client";
import type { SigninInput } from "@/services/user/user.model";
import type { FieldApi } from "@tanstack/react-form";
import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { FieldError } from "./field-error";

vi.mock("@/packages/locales/client", async () => {
  const actual = await vi.importActual("@/packages/locales/client");
  return {
    ...actual,
    useScopedI18n: () => (key: string) => key,
  };
});

const createMockField = (
  isTouched: boolean = false,
  errors: string[] = [],
  isValidating: boolean = false,
): FieldApi<SigninInput, "identifier"> =>
  ({
    state: {
      meta: {
        isTouched,
        errors,
        isValidating,
      },
    },
  }) as FieldApi<SigninInput, "identifier">;

it("renders empty when field is untouched and has no errors", () => {
  const field = createMockField();

  const { findByTestId } = render(
    <I18nProviderClient locale="en">
      <FieldError field={field} />
    </I18nProviderClient>,
  );

  findByTestId("field-error").then((errorElement) => {
    void expect(errorElement).exist;
    void expect(errorElement).empty;
  });
});

it("displays error message when field is touched and has errors", () => {
  const errorMessage = "This field is required";
  const field = createMockField(true, [errorMessage]);

  const { findByTestId, findByText } = render(
    <I18nProviderClient locale="en">
      <FieldError field={field} />
    </I18nProviderClient>,
  );

  findByTestId("field-error").then((errorElement) => {
    void expect(errorElement).exist;
  });

  findByText(errorMessage).then((messageElement) => {
    void expect(messageElement.innerText).toBe(errorMessage);
  });
});

it("shows validating message when field is validating", () => {
  const field = createMockField(false, [], true);

  const { findByTestId, findByText } = render(
    <I18nProviderClient locale="en">
      <FieldError field={field} />
    </I18nProviderClient>,
  );

  findByTestId("field-error").then((errorElement) => {
    void expect(errorElement).exist;
  });

  findByText("validating").then((textElement) => {
    void expect(textElement.innerText).toBe("validating");
  });
});

it("prioritizes both when both are present", async () => {
  const errorMessage = "This field is required";
  const field = createMockField(true, [errorMessage], true);

  const { findByTestId, findByText } = render(
    <I18nProviderClient locale="en">
      <FieldError field={field} />
    </I18nProviderClient>,
  );

  findByTestId("field-error").then((errorElement) => {
    void expect(errorElement).exist;
  });

  findByText(errorMessage).then((messageElement) => {
    void expect(messageElement.innerText).toBe(errorMessage);
  });

  findByText("validating").then((validatingTextElement) => {
    void expect(validatingTextElement.innerText).toBe("validating");
  });
});
