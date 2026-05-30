import type { RegistrationPayload } from "../types/register-form";

export function registerUser(payload: RegistrationPayload): Promise<boolean> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      console.log("Mock register API received:", payload);
      resolve(Math.random() >= 0.5);
    }, 5000);
  });
}
