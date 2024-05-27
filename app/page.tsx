import { prisma } from "@/lib/db/prisma";
import Card from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "./hero";
import PaginationBar from "@/components/PaginationBar";

interface Homeprops {
  searchParams: { page: string };
}
export default async function Home({
  searchParams: { page = "1" },
}: Homeprops) {
  const curretPage = parseInt(page);
  const pageSize = 7;
  const heroItemcount = 1;

  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemcount) / pageSize);
  const productList = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (curretPage - 1) * pageSize + (curretPage === 1 ? 0 : heroItemcount),
    take:(curretPage===1? pageSize-1:pageSize) + (curretPage === 1 ? heroItemcount : 0),
  });

  return (
    <div className="">
      <Hero productList={productList} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:px-20 px-10 ">
        {productList.slice(1).map((pro) => {
          return <Card products={pro} key={pro.id} />;
        })}
      </div>
      <div className="w-full flex items-center justify-center py-5">
        {totalPages > 1 && (
          <PaginationBar currentPage={curretPage} totalPage={totalPages} />
        )}
      </div>
    </div>
  );
}
