import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Pricetag from "@/components/price";
import { Metadata } from "next";
import { cache } from "react";
import AddCart from "./AddToCartButton";
import { addItem } from "./action";
interface pageprop {
  params: {
    id: string;
  };
}
const getData = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});
export async function generatemetadata({
  params: { id },
}: pageprop): Promise<Metadata> {
  const product = await getData(id);

  return {
    title: `${product.name}`,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function productpage({ params: { id } }: pageprop) {
  const productu = await getData(id);
  return (
    <div className="py-10">
      <div className="flex flex-col gap-0 md:gap-5 md:flex-row  justify-center items-center max-w-4xl md:mx-auto p-10 md:p-0">
        <Image
          src={productu.imageUrl}
          alt={productu.name}
          width={400}
          height={200}
          className="md:rounded-xl shadow-2xl h-80 w-80 md:h-auto"
          priority
        />
        <div className="p-10 w-80 md:w-[55rem] md:rounded-xl md:h-full bg-white md:bg-base-300">
          <h1 className="text-3xl md:text-[3rem] md:mb-5  md:drop-shadow-[0_0_.5rem_#ffffff] font-bold">
            {productu.name}
          </h1>
          <Pricetag price={productu.price} className="mt-4 bg-slate-200 font-semibold drop-shadow-[0_0_.1rem_#000]" />
          <p className="py-6 text-nowrap">{productu.description}</p>
            <AddCart productId={productu.id} addItem={addItem}/>
        </div>
      </div>
    </div>
  );
}
