"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function BookModal({ open, setOpen, book }: any) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    if (!book) return null;

    const handleAddToCart = () => {
        addToCart(book, quantity);
        setOpen(false);
        setQuantity(1); // รีเซ็ตจำนวนหลังเพิ่ม
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        <span className="font-semibold">Book name:</span> {book.bks_name}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex gap-6 mt-4">
                    {/* Book Image */}
                    <div className="relative w-40 h-56 rounded-lg overflow-hidden">
                        <Image
                            src={book.bks_url}
                            alt={book.bks_name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Book Details */}
                    <div className="text-sm leading-relaxed flex-1">
                        <p><b>Author:</b> {book.bks_author}</p>
                        <p><b>Publisher:</b> {book.bks_publisher}</p>
                        <p><b>Year:</b> {book.bks_year}</p>

                        <p className="mt-3">{book.bks_description}</p>

                        <p className="mt-4 font-bold text-lg text-blue-600">
                            {book.bks_price} บาท
                        </p>

                        {/* Quantity Selector */}
                        <div className="mt-4 flex items-center gap-2">
                            <span>Quantity:</span>
                            <button
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="px-2 py-1 border rounded"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                className="w-16 text-center border rounded px-2 py-1"
                            />
                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="px-2 py-1 border rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                    onClick={handleAddToCart}
                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white gap-2"
                >
                    <ShoppingCart className="w-4 h-4" />
                    Add {quantity} to Cart
                </Button>
            </DialogContent>
        </Dialog>
    );
}
