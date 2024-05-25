import { prisma } from "@/lib/db/prisma";
import Card from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "./hero";

export default async function Home() {
  const productList = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="">
      <Hero productList={productList}/>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:px-20 px-10 ">
        {productList.slice(1).map((pro) => {
          return <Card products={pro} key={pro.id} />;
        })}
      </div>
    </div>
  );
}
