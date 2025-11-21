"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";


export default function Sidebar() {
  const { role } = useAuth();

  return (
    <div style={{ width: 200, padding: 20, borderRight: "1px solid #ccc" }}>
        <DarkModeToggle />

      <h3>Menu</h3>
      <Link href="/dashboard">Dashboard</Link><br /><br />

      {role === "Admin" && (
        <>
          <Link href="/admin/users">User Management</Link><br /><br />
        </>
      )}

      {(role === "Admin" || role === "Manager") && (
        <>
          <Link href="/manager/projects">Projects</Link><br /><br />
        </>
      )}

      {role === "User" && (
        <>
          <Link href="/user/tasks">My Tasks</Link><br /><br />
        </>
      )}
    </div>
  );
}
