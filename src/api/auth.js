import API from "./axios";

export const registerUser = async (name, email, password) => {
  try {
    const response = await API.post("/auth/register", { name, email, password });
    return response.data; // { message: "...", userId: ... }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw new Error("Network or server error");
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    return response.data; // contains token and user info
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("Network or server error");
  }
};
