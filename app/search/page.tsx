import { prisma } from "@/lib/db/prisma";
import ProductCart from "../../components/ProductCard";
import { Metadata } from "next";
interface searchprop {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: searchprop): Metadata {
  return {
    title: ` ${query}- RizzKart`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: searchprop) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });
  if (products.length === 0) {
    return <div className="text-center">No product found</div>;
  }
  return (
    <div className="px-5">
      <h1 className="text-xl font-bold my-10">Here is The Result :</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCart products={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
