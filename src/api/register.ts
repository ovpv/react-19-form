import type { RegistrationPayload } from "../types/register-form";

export function registerUser(payload: RegistrationPayload): Promise<boolean> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      void payload;
      resolve(Math.random() >= 0.5);
    }, 5000);
  });
}
