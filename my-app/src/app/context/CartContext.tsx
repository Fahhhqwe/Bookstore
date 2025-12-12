"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
    book: any;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (book: any, qty?: number) => void;
    removeFromCart: (bookId: number) => void;
    updateQuantity: (bookId: number, qty: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (book: any, qty: number = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.book.bks_id === book.bks_id);
            if (existing) {
                return prev.map(item =>
                    item.book.bks_id === book.bks_id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prev, { book, quantity: qty }];
        });
    };

    const removeFromCart = (bookId: number) => {
        setCart(prev => prev.filter(item => item.book.bks_id !== bookId));
    };

    const updateQuantity = (bookId: number, qty: number) => {
        if (qty <= 0) return removeFromCart(bookId);
        setCart(prev =>
            prev.map(item =>
                item.book.bks_id === bookId ? { ...item, quantity: qty } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const getTotalPrice = () =>
        cart.reduce((sum, item) => sum + item.book.bks_price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
