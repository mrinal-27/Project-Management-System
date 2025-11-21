"use client";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
        background: "linear-gradient(135deg, #bbcaf3ff, #fafafa)",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#0f172a",
        }}
      >
        Project Management System
      </h1>

      <p
        style={{
          maxWidth: "650px",
          fontSize: "17px",
          color: "#475569",
          lineHeight: "1.7",
          marginBottom: "40px",
        }}
      >
        Streamline your workflow with a clean and intuitive role-based
        dashboard. Manage projects, assign tasks, collaborate efficiently,
        and keep everything organized in one elegant system.
      </p>

      <div style={{ display: "flex", gap: "25px", marginTop: "10px" }}>
        <a
          href="/login"
          style={{
            padding: "14px 32px",
            background: "#111827",
            color: "white",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "600",
            letterSpacing: "0.3px",
            transition: "0.25s",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Login
        </a>

        <a
          href="/register"
          style={{
            padding: "14px 32px",
            background: "white",
            color: "#111827",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            textDecoration: "none",
            fontWeight: "600",
            letterSpacing: "0.3px",
            transition: "0.25s",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#f3f4f6";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "white";
          }}
        >
          Register
        </a>
      </div>

      <p
        style={{
          marginTop: "60px",
          fontSize: "13px",
          color: "#6b7280",
          letterSpacing: "0.8px",
        }}
      >
        Modern • Secure • Role-Based Access • Next.js Powered
      </p>
    </div>
  );
}
