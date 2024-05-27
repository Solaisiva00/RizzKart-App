"use client";

import { cartItemwithproduct } from "@/lib/db/cart";
import { formatprice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { remove, setQuantity } from "./action";
import { useTransition } from "react";
interface CartEntryprop {
  cartItem: cartItemwithproduct;
  setQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function ({
  cartItem: { Product, productId, quantity },
}: CartEntryprop) {
  const [isPending, startTransition] = useTransition();
  const quantityOption: JSX.Element[] = [];
  for (let i = 1; i <= 10; i++) {
    quantityOption.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="md:p-8 p-3">
      <div className="flex flex-wrap items-center gap-10 relative">
        <button
          className="absolute top-[-30px] right-5 text-[#4d4d4d] underline"
          onClick={() => {
            startTransition(async()=>{
              await remove(productId)
            })
          }}
        >
          remove
        </button>
        <Image
          src={Product.imageUrl}
          width={200}
          height={200}
          alt={Product.name}
          className="w-40 h-44 object-cover"
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
            <div className="mt-5  my-2">
              Price :{" "}
              <span className="badge p-2 ml-5  bg-slate-200 drop-shadow-[0_0_.1rem_#000]">
                {formatprice(Product.price)}
              </span>
            </div>
            <div className=" flex items-center justify-center gap-2 mt-5 mr-10 ">
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
            Total Price:{" "}
            <span className="font-light">
              {formatprice(Product.price * quantity)}
            </span>
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
