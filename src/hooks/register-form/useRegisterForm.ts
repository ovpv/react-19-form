import { useState } from "react";
import type {
  RegisterFormValues,
  RegistrationPayload,
} from "../../types/register-form";

const initialValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  username: "",
  line1: "",
  line2: "",
  state: "",
  country: "",
  pincode: "",
};

export function useRegisterForm() {
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(event: React.ChangeEvent<HTMLInputElement>) {
    setValues((currentValues) => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  function resetForm() {
    setValues(initialValues);
    setErrorMessage("");
  }

  function buildPayload(): RegistrationPayload {
    const payload: RegistrationPayload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
      phone: values.phone.trim(),
      username: values.username.trim() || values.email.trim(),
      address: {
        line1: values.line1.trim(),
        country: values.country.trim(),
        pincode: values.pincode.trim(),
      },
    };

    if (values.line2.trim()) {
      payload.address.line2 = values.line2.trim();
    }

    if (values.state.trim()) {
      payload.address.state = values.state.trim();
    }

    return payload;
  }

  function validate() {
    const payload = buildPayload();

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

  return {
    values,
    updateField,
    errorMessage,
    setErrorMessage,
    resetForm,
    buildPayload,
    validate,
  };
}
