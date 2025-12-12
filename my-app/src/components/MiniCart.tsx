"use client";

import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";

export default function MiniCart() {
    const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    // นับจำนวนสินค้าทั้งหมด
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="relative">
            {/* Cart Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative cursor-pointer p-2"
            >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Dropdown Mini Cart */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
                    <h2 className="text-lg font-bold mb-3">Cart</h2>

                    {cart.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {cart.map((item) => (
                                <div
                                    key={item.book.bks_id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex gap-3 items-center">
                                        <img
                                            src={item.book.bks_url}
                                            alt={item.book.bks_name}
                                            className="w-12 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-semibold text-sm">{item.book.bks_name}</p>
                                            <p className="text-gray-600 text-sm">
                                                {item.book.bks_price} ฿ x {item.quantity}
                                            </p>
                                            <input
                                                type="number"
                                                min={0}
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateQuantity(item.book.bks_id, Number(e.target.value))
                                                }
                                                className="w-16 border rounded px-1 mt-1 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.book.bks_id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            <div className="flex justify-between font-bold mt-3 border-t pt-3">
                                <span>Total:</span>
                                <span>{getTotalPrice()} ฿</span>
                            </div>

                            <Button
                                onClick={() => clearCart()}
                                className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white"
                            >
                                Clear Cart
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
