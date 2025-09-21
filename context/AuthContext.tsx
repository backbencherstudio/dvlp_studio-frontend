"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { publicAxios, privateAxios } from "@/lib/axios";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  email: string;
  avatar: string | null;
  address: string | null;
  phone_number: string;
  type: string;
  gender: string | null;
  date_of_birth: string | null;
  created_at: string;
  avatar_url: string | null;
  // add more fields if your /me endpoint returns
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user info
  const refreshUser = async () => {
    try {
      const res = await privateAxios.get("/auth/me");
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = Cookies.get("access_token");
      if (token) {
        await refreshUser();
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await publicAxios.post("/auth/login", { email, password });
      const { access_token, refresh_token } = res.data.authorization;

      Cookies.set("access_token", access_token, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refresh_token", refresh_token, {
        secure: true,
        sameSite: "strict",
      });

      await refreshUser(); // fetch actual user info

      // Redirect after successful login
      const userData = await privateAxios.get("/auth/me");
      const userType = userData.data.data.type;

      if (userType === "admin") {
        router.push("/admin-dashboard");
      } else if (userType === "teacher") {
        router.push("/tutor-portal");
      } else {
        router.push("/student-portal");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUser(null);
  };

  // Remove automatic redirect logic - let middleware and PrivateRoute handle routing

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
