"use client";

import { cartItemwithproduct } from "@/lib/db/cart";
import { formatprice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { setQuantity } from "./action";
import { useTransition } from "react";
interface CartEntryprop {
  cartItem: cartItemwithproduct;
  setQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function ({ cartItem: { Product, quantity } }: CartEntryprop) {
  const [isPending, startTransition] = useTransition();
  const quantityOption: JSX.Element[] = [];
  for (let i = 1; i <= 9; i++) {
    quantityOption.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <div className="p-3">
      <div className="flex flex-wrap items-center gap-10">
        <Image
          src={Product.imageUrl}
          width={200}
          height={200}
          alt={Product.name}
          className="w-40"
          priority
        />
        <div className="">
          <Link
            href={"/product/" + Product.id}
            className="font-bold text-xl md:text-3xl mb-3"
          >
            {Product.name}
          </Link>
          <div className="md:flex md:items-center md:justify-center md:gap-10 md:text-[20px] md:mt-0 ">
            <div className="mt-5 ">
              Price :{" "}
              <span className="badge  bg-green-300">
                {formatprice(Product.price)}
              </span>
            </div>
            <div className="my-1 flex items-center justify-center gap-2 mt-2 ">
              Quantity:
              <select
                className="select select-bordered select-xs md:select-md w-full max-w-[80px] h-8 "
                defaultValue={quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.currentTarget.value);
                  startTransition(async () => {
                    await setQuantity(Product.id, newQuantity);
                  });
                }}
              >
                {quantityOption}
              </select>
            </div>
          </div>

          <div className="divider" />
          <div className="flex items-center gap-3 md:text-[24px] font-bold">
            Total Price: <span className="font-light">{formatprice(Product.price * quantity)}</span>{" "}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
