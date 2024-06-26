"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const myCart = cart.item.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (myCart) {
      await prisma.cartItem.delete({
        where: { id: myCart.id },
      });
    }
  } else {
    if (myCart) {
      await prisma.cartItem.update({
        where: { id: myCart.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
    revalidatePath("/cart");
  }
}

export async function remove(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const myCart = cart.item.find((item) => item.productId === productId);
  if (myCart) {
    // await prisma.cartItem.delete({
    //   where: { id: myCart.id },
    // });
    await prisma.cart.update({
      where:{id:cart.id},
      data:{
        item:{
          delete:{id:myCart.id}
        }
      }
    })
  }
  revalidatePath("/cart");
}
