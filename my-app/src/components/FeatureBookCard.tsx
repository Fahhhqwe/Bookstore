"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import BookModal from "./BookModal";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function FeaturedBookCard({ book }: any) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { addToCart } = useCart();

    return (
        <>
            <div className="w-[300px] h-[430px] bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col flex-shrink-0">
                <div className="relative w-full h-64 sm:h-60 md:h-60">
                    <Image
                        src={book.bks_url}
                        alt={book.bks_name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-4 flex flex-col h-full">
                    <h3 className="text-lg font-bold">{book.bks_name}</h3>
                    <p className="text-sm text-gray-600">by {book.bks_author}</p>
                    <p className="text-sm mt-3 line-clamp-3 text-gray-700">
                        {book.bks_description}
                    </p>

                    <div className="flex justify-between items-center mt-auto pt-4">
                        <span className="text-blue-600 font-semibold">{book.bks_price} ฿</span>

                        <div className="flex gap-2">
                            {/* ปุ่ม View */}
                            <Button
                                onClick={() => setOpen(true)}
                                variant="secondary"
                                className="bg-gray-200 text-gray-700 hover:bg-gray-300 gap-2"
                            >
                                <Eye className="w-4 h-4" />
                                View
                            </Button>

                            {/* ปุ่ม Add to Cart */}
                            <Button
                                disabled={isPending}
                                onClick={() => startTransition(() => addToCart(book, 1))}
                                className="bg-blue-600 text-white hover:bg-blue-700 gap-2 flex items-center"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal แสดงรายละเอียดหนังสือ */}
            <BookModal open={open} setOpen={setOpen} book={book} />
        </>
    );
}
