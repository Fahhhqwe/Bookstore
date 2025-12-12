"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { MdEmail, MdLock } from "react-icons/md";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) router.push("/");
        else setError("Invalid email or password");
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-12 flex flex-col gap-8"
                style={{ minHeight: "500px" }}
            >
                <h1 className="text-4xl font-extrabold text-center text-blue-600">
                    RakRead Login
                </h1>

                <p className="text-center text-gray-500 mb-4">
                    Sign in to access your account and shopping cart
                </p>

                {error && (
                    <p className="text-red-500 text-sm text-center font-medium">
                        {error}
                    </p>
                )}

                <div className="relative">
                    <MdEmail className="absolute top-1/2 left-3 -translate-y-1/2 text-blue-400 w-6 h-6" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl w-full pl-12 pr-4 py-3"
                        required
                    />
                </div>

                <div className="relative">
                    <MdLock className="absolute top-1/2 left-3 -translate-y-1/2 text-blue-400 w-6 h-6" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl w-full pl-12 pr-4 py-3"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg"
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
