import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Cart, CartItem, Prisma, product } from "@prisma/client";
import { promises } from "dns";
import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "inspector";

//type deceluration
export type cartWithProduct = Prisma.CartGetPayload<{
  include: { item: { include: { Product: true } } };
}>;

//type deceluration
export type cartItemwithproduct = Prisma.CartItemGetPayload<{
  include: { Product: true };
}>;

//type deceluration
export type shoppingcart = cartWithProduct & {
  size: number;
  subtotal: number;
};
export type ProductList = product[];
export type Product = product;

//get cart from server
export async function getCart(): Promise<shoppingcart | null> {
  const session = await getServerSession(config);
  let cart: cartWithProduct | null = null;
  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { item: { include: { Product: true } } },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
   cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { item: { include: { Product: true } } },
        })
      : null;
  }
  if (!cart) {
    return null;
  }

  // for total and sub total
  return {
    ...cart,
    size: cart.item.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.item.reduce(
      (acc, item) => acc + item.quantity * item.Product.price,
      0
    ),
  };
}

//for create new cart in DB
export async function createCart(): Promise<shoppingcart> {
  const session = await getServerSession(config);
  let newCart: Cart;
  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session.user.id },
    });
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

//merge anonoymous cart to user cart
export async function merge(userId: string) {
  const localCartId = cookies().get("localCartId")?.value;
  const localcart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { item: true },
      })
    : null;
  if (!localcart) return;
  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { item: true },
  });
  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergeCartItem = mergeCart(localcart.item, userCart.item);
      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });
      await tx.cartItem.createMany({
        data: mergeCartItem.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      tx.cart.create({
        data: {
          userId,
          item: {
            createMany: {
              data: localcart.item.map(item=>({
                productId:item.productId,
                quantity:item.quantity
              }))
            },
          },
        },
      });
    }
    await tx.cart.delete({
      where:{id:localcart.id}
    })
    cookies().set("localCartId","")
  });
}

function mergeCart(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const exist = acc.find((i) => i.productId === item.productId);
      if (exist) {
        exist.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}
