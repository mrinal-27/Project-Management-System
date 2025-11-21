"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setToken, setRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });


      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      // *** FIX 1: Store token in cookie so middleware can read it ***
      document.cookie = `auth_token=${data.token}; path=/; max-age=86400`;

      // Store in Context (optional)
      setToken(data.token);

      // Decode role
      const decoded = JSON.parse(atob(data.token.split(".")[1]));
      setRole(decoded.role);

      // *** FIX 2: Redirect ***
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f0f4ff, #fafafa)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.85)",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: "crimson", fontSize: "14px", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <button onClick={handleLogin}>Login</button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
            color: "#475569",
          }}
        >
          Don’t have an account?{" "}
          <a
            href="/register"
            style={{
              fontWeight: "600",
              color: "#111827",
              textDecoration: "none",
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
