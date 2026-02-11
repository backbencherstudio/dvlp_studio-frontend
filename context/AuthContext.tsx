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
  name: string;
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
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    callbackUrl?: string,
    expectedRole?: string,
  ) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";

  // Fetch user info
  const refreshUser = async () => {
    if (isMockAuth) {
      return;
    }
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
      if (!isMockAuth && token) {
        await refreshUser();
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Login
  const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
    callbackUrl?: string,
    expectedRole?: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      if (isMockAuth) {
        // Simulate tokens and user
        Cookies.set("access_token", "mock-access-token", {
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("refresh_token", "mock-refresh-token", {
          secure: true,
          sameSite: "strict",
        });
        // Infer role from email prefix for convenience
        const inferredType = email.includes("admin")
          ? "admin"
          : email.includes("teacher") || email.includes("tutor")
            ? "teacher"
            : "student";

        const mockUser = {
          id: "mock-id",
          email,
          avatar: null,
          address: null,
          phone_number: "",
          type: inferredType,
          gender: null,
          date_of_birth: null,
          created_at: new Date().toISOString(),
          avatar_url: null,
        } as User;
        setUser(mockUser);
        setError(null);

        // Use callbackUrl if provided, otherwise redirect based on role
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          // Redirect based on inferred role
          if (inferredType === "admin") {
            router.push("/admin-dashboard");
          } else if (inferredType === "teacher") {
            router.push("/tutor-portal");
          } else {
            router.push("/student-portal");
          }
        }
      } else {
        const res = await publicAxios.post("/auth/login", { email, password });
        const { access_token, refresh_token } = res.data.authorization;

        const accessExpiry = rememberMe ? 7 : undefined; // 7 days
        const refreshExpiry = rememberMe ? 30 : undefined;

        const isProd = process.env.NODE_ENV === "production";

        Cookies.set("access_token", access_token, {
          expires: accessExpiry,
          secure: isProd, // only secure in production
          sameSite: "lax", // strict breaks auth flows
        });

        Cookies.set("refresh_token", refresh_token, {
          expires: refreshExpiry,
          secure: isProd,
          sameSite: "lax",
        });

        await refreshUser();
        const userData = await privateAxios.get("/auth/me");
        const userType = userData.data.data.type;

        // if an extepceted role is provided, validate it
        if (expectedRole && userType !== expectedRole) {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          setUser(null);
          setError(" Oops! This account can’t use these credentials.");
          setLoading(false);
          return;
        }

        // Use callbackUrl if provided, otherwise redirect based on role
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          if (userType === "admin") {
            router.push("/admin-dashboard");
          } else if (userType === "teacher") {
            router.push("/tutor-portal");
          } else {
            router.push("/student-portal");
          }
        }
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
