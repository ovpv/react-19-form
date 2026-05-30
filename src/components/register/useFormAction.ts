import { useCallback } from "react";
import { registerUser } from "../../api/register";
import type {
  RegisterActionState,
  RegisterFormValues,
  RegistrationPayload,
} from "../../types/register-form";

type FormPayloadResult =
  | {
      values: RegisterFormValues;
      errorMessage: string;
      payload: null;
    }
  | {
      values: RegisterFormValues;
      errorMessage: "";
      payload: RegistrationPayload;
    };

const formFields = [
  "firstName",
  "lastName",
  "email",
  "password",
  "confirmPassword",
  "phone",
  "username",
  "line1",
  "line2",
  "state",
  "country",
  "pincode",
] satisfies Array<keyof RegisterFormValues>;

function getValidationMessage(
  values: RegisterFormValues,
  payload: RegistrationPayload,
) {
  if (!payload.firstName) return "First name is required.";
  if (!payload.lastName) return "Last name is required.";
  if (!payload.email) return "Email is required.";
  if (!payload.email.includes("@")) return "Enter a valid email address.";
  if (!payload.password) return "Password is required.";
  if (payload.password !== values.confirmPassword) {
    return "Passwords do not match.";
  }
  if (!payload.phone) return "Phone is required.";
  if (!payload.address.line1) return "Address line 1 is required.";
  if (!payload.address.country) return "Country is required.";
  if (!payload.address.pincode) return "Pincode is required.";

  return "";
}

function getFormValues(formData: FormData): RegisterFormValues {
  return formFields.reduce((values, field) => {
    return {
      ...values,
      [field]: String(formData.get(field) ?? ""),
    };
  }, {} as RegisterFormValues);
}

function buildPayload(formData: FormData): FormPayloadResult {
  const values = getFormValues(formData);
  const {
    line1,
    line2,
    state,
    country,
    pincode,
    username,
    ...accountValues
  } = values;

  const payload: RegistrationPayload = {
    ...accountValues,
    firstName: accountValues.firstName.trim(),
    lastName: accountValues.lastName.trim(),
    email: accountValues.email.trim(),
    phone: accountValues.phone.trim(),
    username: username.trim() || accountValues.email.trim(),
    address: {
      line1: line1.trim(),
      ...(line2.trim() ? { line2: line2.trim() } : {}),
      ...(state.trim() ? { state: state.trim() } : {}),
      country: country.trim(),
      pincode: pincode.trim(),
    },
  };
  const errorMessage = getValidationMessage(values, payload);

  if (errorMessage) {
    return {
      values,
      errorMessage,
      payload: null,
    };
  }

  return {
    values,
    errorMessage: "",
    payload,
  };
}

export function useFormAction(resetValues: RegisterFormValues) {
  return useCallback(
    async function registerAction(
      previousState: RegisterActionState,
      formData: FormData,
    ): Promise<RegisterActionState> {
      const { values, errorMessage, payload } = buildPayload(formData);

      if (errorMessage || !payload) {
        return {
          values,
          errorMessage,
          submitMessage: "",
          submittedPayload: null,
          formKey: previousState.formKey,
        };
      }

      console.log(payload);

      const isSuccess = await registerUser(payload);

      if (!isSuccess) {
        return {
          values,
          errorMessage: "",
          submitMessage: "Registration failed. Please try again.",
          submittedPayload: null,
          formKey: previousState.formKey,
        };
      }

      return {
        values: resetValues,
        errorMessage: "",
        submitMessage: "Registration successful.",
        submittedPayload: payload,
        formKey: previousState.formKey + 1,
      };
    },
    [resetValues],
  );
}
