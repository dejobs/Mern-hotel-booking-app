import {SignupFormData} from "./pages/SignUp";
import {SigninFormData} from "./pages/SignIn";

export const signup = async (formData: SignupFormData) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const signin = async (formData: SigninFormData) => {
  try {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

export const validateToken = async () => {
  const res = await fetch("/api/auth/validate-token", {
    credentials: "include",
  });
  const data = await res.json();
  if (data.success === false) {
    throw new Error("Token invalid");
  }
  return data;
};

export const signout = async () => {
  try {
    const res = await fetch("/api/auth/signout", {
      credentials: "include",
    });
    const data = await res.json();
    if (data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
