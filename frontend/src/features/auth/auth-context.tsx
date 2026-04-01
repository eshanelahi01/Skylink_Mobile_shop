import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "superadmin";
  branchId?: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  loginAsDemo: (role: "admin" | "staff") => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const adminUser: AuthUser = { id: "admin-1", name: "Skylink Admin", email: "admin@skylink.local", role: "admin" };
const staffUser: AuthUser = { id: "staff-1", name: "Nauman Branch Staff", email: "staff.sl3@skylink.local", role: "staff", branchId: "branch-1" };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("skylink_demo_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loginAsDemo: (role) => {
        const next = role === "admin" ? adminUser : staffUser;
        localStorage.setItem("skylink_demo_user", JSON.stringify(next));
        localStorage.setItem("skylink_access_token", "demo-token");
        setUser(next);
      },
      logout: () => {
        localStorage.removeItem("skylink_demo_user");
        localStorage.removeItem("skylink_access_token");
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
