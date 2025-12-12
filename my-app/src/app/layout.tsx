"use client"; // ต้องเป็น client component เพราะใช้ hook

import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "./context/CartContext";
import AuthProvider from "./context/AuthContext";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login"; // ตรวจสอบ path ปัจจุบัน

  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            {!isLoginPage && <Header />}
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
