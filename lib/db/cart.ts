import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Cart, Prisma, product } from "@prisma/client";
import { promises } from "dns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "inspector";

export type cartWithProduct = Prisma.CartGetPayload<{
  include: { item: { include: { Product: true } } };
}>;

export type cartItemwithproduct = Prisma.CartItemGetPayload<{
  include: { Product: true };
}>;
export type shoppingcart = cartWithProduct & {
  size: number;
  subtotal: number;
};
export type ProductList = product[];
export type Product = product;

export async function getCart(): Promise<shoppingcart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { item: { include: { Product: true } } },
      })
    : null;
  if (!cart) {
    return null;
  }
  return {
    ...cart,
    size: cart.item.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.item.reduce(
      (acc, item) => acc + item.quantity * item.Product.price,
      0
    ),
  };
}

export async function createCart(): Promise<shoppingcart> {
  const session =await getServerSession(authOptions);
  let newCart: Cart;
  if (session) {
    // newCart =await prisma.cart.create({
    //   data:{userId:session.user.id}
    // })
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
    cookies().set("localCartId", (await newCart).id);
  }
  return {
    ...newCart,
    item: [],
    size: 0,
    subtotal: 0,
  };
}
