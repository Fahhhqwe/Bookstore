"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import MiniCart from "./MiniCart";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();          // ลบ user และ cookie
        router.push("/login"); // redirect ไปหน้า login
    };

    return (
        <header className="flex justify-between items-center p-4 bg-white shadow">
            <h1 className="text-xl font-bold">RakRead Bookstore</h1>

            <div className="flex items-center gap-6">
                {/* Navigation */}
                <Menubar className="flex items-center gap-4">
                    <MenubarMenu>
                        <MenubarTrigger asChild>
                            <Link href="/">Home</Link>
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger asChild>
                            <Link href="/books">Books</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>

                <MiniCart />

                {/* Logout */}
                {user && (
                    <Menubar className="flex items-center gap-4">
                        <MenubarMenu>
                            <MenubarTrigger onClick={handleLogout}>Logout</MenubarTrigger>
                        </MenubarMenu>
                    </Menubar>
                )}
            </div>
        </header>
    );
}
