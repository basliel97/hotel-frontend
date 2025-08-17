// src/store/authStore.js
import { create } from "zustand";
const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isInitialized: false, // 👈 add this

  setAuth: ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
  initializeAuth: () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      set({ user: JSON.parse(storedUser), token: storedToken });
    }
    set({ isInitialized: true }); // ✅ mark auth as loaded
  },
}));

export default useAuthStore;
