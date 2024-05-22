import { prisma } from "@/lib/db/prisma";
import Card from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const productList = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="">
      <div className="hero  md:px-5 w-96 md:w-auto  md: my-10 mx-auto ">
        <div className="hero-content bg-[#7e776ba5] p-6 md:rounded-xl rounded-xl flex-col md:flex-row md:gap-10 sm:rounded-md">
          <Image
            src={productList[0].imageUrl}
            alt={productList[0].name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-xl"
            priority
          />
          <div className="md:px-8 ">
            <h1 className="text-5xl font-bold text-nowrap"> {productList[0].name}</h1>
            <p className="py-6">{productList[0].description}</p>
            <Link
              href={"/product/" + productList[0].id}
              className="btn btn-secondary"
            >
              chect It Out
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:px-20 px-10 ">
        {productList.slice(1).map((pro) => {
          return <Card products={pro} key={pro.id} />;
        })}
      </div>
    </div>
  );
}
