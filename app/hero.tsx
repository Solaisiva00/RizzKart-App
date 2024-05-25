"use client";

import { ProductList } from "@/lib/db/cart";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface productprop {
  productList: ProductList;
}

export default function Hero({ productList }: productprop) {
  return (
    <div className="hero  md:px-10  md:w-auto  md: my-10 mx-auto  drop-shadow-[0_0_.3rem_#fff] ">
      <motion.div
        initial={{ opacity: 0 ,scale:0}}
        animate={{ opacity: 1 ,scale:1}}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        <div className="hero-content py-10 md:py-5 bg-black  md:rounded-xl rounded-xl flex-col md:flex-row md:gap-10 sm:rounded-md">
          <Image
            src={productList[0].imageUrl}
            alt={productList[0].name}
            width={300}
            height={800}
            className="w-full md:w-full max-w-sm rounded-lg shadow-xl drop-shadow-[0_0_.1rem_#fff]"
            priority
          />
          <div className="md:px-8 flex flex-col items-center gap-3 text-white">
            <h1 className="text-5xl font-bold text-nowrap">
              {" "}
              {productList[0].name}
            </h1>
            <p className="py-6">{productList[0].description}</p>
            <Link
              href={"/product/" + productList[0].id}
              className="btn bg-white"
            >
              chect It Out
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
