"use client";

import { useState } from "react";
import Image from "next/image";
import BookModal from "./BookModal";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function StoreBookCard({ book }: any) {
    const [open, setOpen] = useState(false);
    const { addToCart } = useCart();

    return (
        <>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                <div className="relative w-full h-64 sm:h-60 md:h-60">
                    <Image
                        src={book.bks_url}
                        alt={book.bks_name}
                        fill
                        className="object-cover"
                    />
                </div>




                <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-bold">{book.bks_name}</h3>
                    <p className="text-sm text-gray-600">by {book.bks_author}</p>

                    <p className="text-sm mt-3 line-clamp-3 flex-grow">{book.bks_description}</p>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-blue-600 font-semibold text-lg">{book.bks_price} ฿</span>

                        <Button
                            onClick={() => setOpen(true)}
                            variant="secondary"
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 gap-2"
                        >
                            <Eye className="w-4 h-4" />
                            View
                        </Button>
                    </div>

                    <Button
                        onClick={() => addToCart(book, 1)}
                        className="bg-blue-500 hover:bg-blue-600 text-white mt-3 gap-2"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>


            <BookModal open={open} setOpen={setOpen} book={book} />
        </>
    );
}
