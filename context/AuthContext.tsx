"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const cookieToken = document.cookie
      .split("; ")
      .find((x) => x.startsWith("auth_token="))
      ?.split("=")[1];

    if (cookieToken && !token) {
      setToken(cookieToken);
    }

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
        setEmail(payload.email);
        setId(payload.id);
      } catch {
        console.log("Token decode failed");
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, role, email, id, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
