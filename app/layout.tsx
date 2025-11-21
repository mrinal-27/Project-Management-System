import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

export const metadata = {
  title: "Project Management System",
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
