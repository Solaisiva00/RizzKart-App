import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setQuantity } from "./action";
import { formatprice } from "@/lib/format";

export const metadata = {
  title: "YourCart - RizzKart",
};

export default async function CartPage() {
  const Cart = await getCart();

  return (
    <div className="md:p-10">
      <h1 className="mb-6 text-3xl font-bold px-5">Shopping Cart 🛒</h1>
      {Cart?.subtotal != 0 ? (
        <section>
          {Cart?.item.map((c) => (
            <div>
              <CartEntry cartItem={c} key={c.id} setQuantity={setQuantity} />
            </div>
          ))}
          {Cart?.item.length !=0 ? (
            <div className="flex justify-between items-center px-5">
              <div className="p-5 text-xl font-bold">
                Total :{" "}
                <span className=" p-5 font-medium">
                  {formatprice(Cart?.subtotal) || 0}
                </span>{" "}
              </div>
              <button className="btn  bg-green-500 btn-sm md:btn-lg md:px-10 text-white">
                {" "}
                buy Now
              </button>
            </div>
          ) : null}
        </section>
      ) : (
        <div className="flex items-center justify-center  h-[40vh]">
          <h1 className="md:text-5xl text-xl text-[#4d4d4d] animate-bounce">
            Opps Cart is empty !
          </h1>
        </div>
      )}
    </div>
  );
}
