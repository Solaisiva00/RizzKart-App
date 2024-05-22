import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setQuantity } from "./action";

export const metadata = {
  title: "YourCart - RizzKart",
};

export default async function CartPage() {
  const Cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {Cart?.item.map((c) => (
        <div>
          <CartEntry cartItem={c} key={c.id} setQuantity={setQuantity}/>
        </div>
      ))}
    </div>
  );
}
