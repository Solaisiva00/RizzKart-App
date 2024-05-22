"use client";

import { product } from "@prisma/client";
import { Span } from "next/dist/trace";
import { useTransition, useState } from "react";

interface addprop {
  productId: string;
  addItem: (productId: string) => Promise<void>;
}
export default function AddCart({ productId, addItem }: addprop) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary btn-block mt-5"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await addItem(productId);
            setSuccess(true);
          });
        }}
      >
        {!success && !isPending && (
          <div className="flex gap-3 items-center">
            <span>Add to Cart</span>
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/FFFFFF/fast-cart.png"
              className="ml-2"
              alt="fast-cart"
            />
          </div>
        )}
        {isPending && !success && (
          <div className="flex items-center gap-3">
            <span className="loading loading-spinner" />
            <span>Adding to Cart ...</span>
          </div>
        )}
        {success && <span className="text-white font-bold"> Added to Cart ✅</span>}
      </button>
    </div>
  );
}