/* eslint-disable react-hooks/set-state-in-effect */
import "./App.css";
import { useEffect, useState } from "react";

type RegistrationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  address: {
    line1: string;
    line2?: string;
    state?: string;
    country: string;
    pincode: string;
  };
};

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formPayload, setFormPayload] = useState<RegistrationPayload | null>(
    null,
  );
  const [submittedPayload, setSubmittedPayload] =
    useState<RegistrationPayload | null>(null);

  // Legacy form pattern for this branch: derive validation and payload state
  // from individual field states inside one effect.
  useEffect(() => {
    const nextPayload: RegistrationPayload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      username: username.trim() || email.trim(),
      address: {
        line1: line1.trim(),
        country: country.trim(),
        pincode: pincode.trim(),
      },
    };

    if (line2.trim()) {
      nextPayload.address.line2 = line2.trim();
    }

    if (state.trim()) {
      nextPayload.address.state = state.trim();
    }

    if (!nextPayload.firstName) {
      setErrorMessage("First name is required.");
      return;
    }

    if (!nextPayload.lastName) {
      setErrorMessage("Last name is required.");
      return;
    }

    if (!nextPayload.email) {
      setErrorMessage("Email is required.");
      return;
    }

    if (!nextPayload.email.includes("@")) {
      setErrorMessage("Enter a valid email address.");
      return;
    }

    if (!nextPayload.password) {
      setErrorMessage("Password is required.");
      return;
    }

    if (nextPayload.password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!nextPayload.phone) {
      setErrorMessage("Phone is required.");
      return;
    }

    if (!nextPayload.address.line1) {
      setErrorMessage("Address line 1 is required.");
      return;
    }

    if (!nextPayload.address.country) {
      setErrorMessage("Country is required.");
      return;
    }

    if (!nextPayload.address.pincode) {
      setErrorMessage("Pincode is required.");
      return;
    }

    setErrorMessage("");
    setFormPayload(nextPayload);
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    line1,
    line2,
    state,
    country,
    pincode,
    username,
  ]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (errorMessage || !formPayload) {
      return;
    }

    setSubmittedPayload(formPayload);
    console.log(formPayload);
  }

  return (
    <main className="container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid">
          <label>
            First name
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              name="firstName"
              required
            />
          </label>

          <label>
            Last name
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              name="lastName"
              required
            />
          </label>
        </div>

        <label>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            type="email"
            required
          />
        </label>

        <div className="grid">
          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              type="password"
              required
            />
          </label>

          <label>
            Confirm password
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              name="phone"
              type="tel"
              required
            />
          </label>

          <label>
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
              value={line1}
              onChange={(event) => setLine1(event.target.value)}
              name="addressLine1"
              required
            />
          </label>

          <label>
            Line 2
            <input
              value={line2}
              onChange={(event) => setLine2(event.target.value)}
              name="addressLine2"
              placeholder="Optional"
            />
          </label>

          <div className="grid">
            <label>
              State
              <input
                value={state}
                onChange={(event) => setState(event.target.value)}
                name="state"
                placeholder="Optional"
              />
            </label>

            <label>
              Country
              <input
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                name="country"
                required
              />
            </label>
          </div>

          <label>
            Pincode
            <input
              value={pincode}
              onChange={(event) => setPincode(event.target.value)}
              name="pincode"
              required
            />
          </label>
        </fieldset>

        {errorMessage ? <p role="alert">{errorMessage}</p> : null}

        <button type="submit">Register</button>
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
