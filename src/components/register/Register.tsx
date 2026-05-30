import { useActionState } from "react";
import type {
  RegisterActionState,
  RegisterFormValues,
} from "../../types/register-form";
import { useFormAction } from "./useFormAction";

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

const initialActionState: RegisterActionState = {
  values: initialValues,
  errorMessage: "",
  submitMessage: "",
  submittedPayload: null,
  formKey: 0,
};

export function Register() {
  const registerAction = useFormAction(initialValues);
  const [formState, formAction, isPending] = useActionState(
    registerAction,
    initialActionState,
  );
  const { values, errorMessage, submitMessage, submittedPayload, formKey } =
    formState;

  return (
    <>
      <h1>Register</h1>

      <form action={formAction} key={formKey}>
        <div className="grid">
          <label>
            First name
            <input
              defaultValue={values.firstName}
              disabled={isPending}
              name="firstName"
              required
            />
          </label>

          <label>
            Last name
            <input
              defaultValue={values.lastName}
              disabled={isPending}
              name="lastName"
              required
            />
          </label>
        </div>

        <label>
          Email
          <input
            defaultValue={values.email}
            disabled={isPending}
            name="email"
            type="email"
            required
          />
        </label>

        <div className="grid">
          <label>
            Password
            <input
              defaultValue={values.password}
              disabled={isPending}
              name="password"
              type="password"
              required
            />
          </label>

          <label>
            Confirm password
            <input
              defaultValue={values.confirmPassword}
              disabled={isPending}
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
              defaultValue={values.phone}
              disabled={isPending}
              name="phone"
              type="tel"
              required
            />
          </label>

          <label>
            Username
            <input
              defaultValue={values.username}
              disabled={isPending}
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
              defaultValue={values.line1}
              disabled={isPending}
              name="line1"
              required
            />
          </label>

          <label>
            Line 2
            <input
              defaultValue={values.line2}
              disabled={isPending}
              name="line2"
              placeholder="Optional"
            />
          </label>

          <div className="grid">
            <label>
              State
              <input
                defaultValue={values.state}
                disabled={isPending}
                name="state"
                placeholder="Optional"
              />
            </label>

            <label>
              Country
              <input
                defaultValue={values.country}
                disabled={isPending}
                name="country"
                required
              />
            </label>
          </div>

          <label>
            Pincode
            <input
              defaultValue={values.pincode}
              disabled={isPending}
              name="pincode"
              required
            />
          </label>
        </fieldset>

        {errorMessage ? <p role="alert">{errorMessage}</p> : null}

        {submitMessage ? <p role="status">{submitMessage}</p> : null}

        <button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>

      {submittedPayload ? (
        <article>
          <h2>Submitted payload</h2>
          <pre>{JSON.stringify(submittedPayload, null, 2)}</pre>
        </article>
      ) : null}
    </>
  );
}
