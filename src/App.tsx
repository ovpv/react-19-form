import "./App.css";
import { useState } from "react";
import { registerUser } from "./api/register";
import { useRegisterForm } from "./hooks/register-form";
import type { RegistrationPayload } from "./types/register-form";

function App() {
  const {
    values,
    updateField,
    errorMessage,
    setErrorMessage,
    resetForm,
    buildPayload,
    validate,
  } = useRegisterForm();

  const [submittedPayload, setSubmittedPayload] =
    useState<RegistrationPayload | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationMessage = validate();
    setErrorMessage(validationMessage);
    setSubmitMessage("");

    if (validationMessage) {
      return;
    }

    const payload = buildPayload();
    console.log(payload);

    setIsSubmitting(true);

    try {
      const isSuccess = await registerUser(payload);

      if (isSuccess) {
        setSubmittedPayload(payload);
        resetForm();
        setSubmitMessage("Registration successful.");
        return;
      }

      setSubmitMessage("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid">
          <label>
            First name
            <input
              value={values.firstName}
              onChange={updateField}
              name="firstName"
              required
            />
          </label>

          <label>
            Last name
            <input
              value={values.lastName}
              onChange={updateField}
              name="lastName"
              required
            />
          </label>
        </div>

        <label>
          Email
          <input
            value={values.email}
            onChange={updateField}
            name="email"
            type="email"
            required
          />
        </label>

        <div className="grid">
          <label>
            Password
            <input
              value={values.password}
              onChange={updateField}
              name="password"
              type="password"
              required
            />
          </label>

          <label>
            Confirm password
            <input
              value={values.confirmPassword}
              onChange={updateField}
              name="confirmPassword"
              type="password"
              required
            />
          </label>
        </div>

        <div className="grid">
          <label>
            Phone
            <input
              value={values.phone}
              onChange={updateField}
              name="phone"
              type="tel"
              required
            />
          </label>

          <label>
            Username
            <input
              value={values.username}
              onChange={updateField}
              name="username"
              placeholder="Optional"
            />
          </label>
        </div>

        <fieldset>
          <legend>Address</legend>

          <label>
            Line 1
            <input
              value={values.line1}
              onChange={updateField}
              name="line1"
              required
            />
          </label>

          <label>
            Line 2
            <input
              value={values.line2}
              onChange={updateField}
              name="line2"
              placeholder="Optional"
            />
          </label>

          <div className="grid">
            <label>
              State
              <input
                value={values.state}
                onChange={updateField}
                name="state"
                placeholder="Optional"
              />
            </label>

            <label>
              Country
              <input
                value={values.country}
                onChange={updateField}
                name="country"
                required
              />
            </label>
          </div>

          <label>
            Pincode
            <input
              value={values.pincode}
              onChange={updateField}
              name="pincode"
              required
            />
          </label>
        </fieldset>

        {errorMessage ? <p role="alert">{errorMessage}</p> : null}

        {submitMessage ? <p role="status">{submitMessage}</p> : null}

        <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      {submittedPayload ? (
        <article>
          <h2>Submitted payload</h2>
          <pre>{JSON.stringify(submittedPayload, null, 2)}</pre>
        </article>
      ) : null}
    </main>
  );
}

export default App;
