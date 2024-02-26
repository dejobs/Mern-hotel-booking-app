import {SignupFormData} from "./pages/SignUp";

export const signup = async (formData: SignupFormData) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      throw new Error(data.message);
      return;
    }
  } catch (err) {}
};
