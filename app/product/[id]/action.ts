"use server";

import { config } from "@/app/api/auth/[...nextauth]/route";
import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function addItem(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const isIteam = cart.item.find((i) => i.productId === productId);
  if (isIteam) {
    await prisma.cartItem.update({
      where: { id: isIteam.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }
  revalidatePath("/product/[id]");
}

export async function inCart(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const isIteam = cart.item.find((i) => i.productId === productId)
}
