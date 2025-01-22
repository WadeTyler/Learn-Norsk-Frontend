import { create } from 'zustand';
import axios from "@/lib/axios";
import {User} from "@/types/Types";
import toast from "react-hot-toast";

interface UserStore {
  user: User | null;
  isLoadingUser: boolean;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  isLoggingIn: boolean;
  loginError: string;
  signup: (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  isSigningUp: boolean;
  signupError: string;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoadingUser: false,
  fetchUser: async () => {
    try {
      set({ isLoadingUser: true });
      const response = await axios.get("/auth/me");
      set({ user: response.data, isLoadingUser: false });
      console.log("User: ", response.data);
    } catch (e) {
      console.log(e.response?.data || "Failed to fetch user.");
      set({ isLoadingUser: false, user: null });
    }
  },

  isLoggingIn: false,
  loginError: "",
  login: async (email, password) => {
    try {
      set({ isLoggingIn: true, loginError: "" });
      const response = await axios.post("/auth/login", { email, password });
      set({ user: response.data, isLoggingIn: false });
    } catch (e) {
      set({ loginError: e.response?.data || "Failed to login.", isLoggingIn: false, user: null });
    }
  },

  isSigningUp: false,
  signupError: "",
  signup: async (firstName, lastName, email, password, confirmPassword) => {
    try {
      set({ isSigningUp: true, signupError: "" });
      const response = await axios.post("/auth/signup", { firstName, lastName, email, password, confirmPassword });
      set({ user: response.data, isSigningUp: false });
    } catch (e) {
      set({ signupError: e.response?.data || "Failed to signup.", isSigningUp: false, user: null });
    }
  }

}));