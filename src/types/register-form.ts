export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  username: string;
  line1: string;
  line2: string;
  state: string;
  country: string;
  pincode: string;
};

export type RegistrationPayload = {
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
