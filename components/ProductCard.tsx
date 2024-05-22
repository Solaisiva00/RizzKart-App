"use client";

import { product } from "@prisma/client";
import Link from "next/link";
import Pricetag from "./price";
import Image from "next/image";
interface card {
  products: product;
}

const Card = ({ products }: card) => {
  const isNew =
    Date.now() - new Date(products.createAt).getTime() >
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={"/product/"+products.id}
      className="card my-10 w-full md:max-w-sm md:mx-auto bg-base-100 hover:shadow-2xl transition-shadow hover:scale-105 transition-transform"
    >
      <figure>
        <Image
          src={products.imageUrl}
          alt={products.name}
          width={900}
          height={400}
          priority={true}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {products.name}
          {isNew && (
            <div className="badge bg-[#4d4d4d] text-white text-[9px]">New</div>
          )}
        </h2>
        <p>{products.description}</p>
        <Pricetag
          price={products.price}
          className="bg-green-400 font-semibold text-[#4d4d4d]"
        />
      </div>
    </Link>
  );
};

export default Card;
