import { title } from "process";
import image from "../../public/image1.jpg";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import Button from "@/components/button";

export const metadata = {
  title: "rizzKart - Add product",
};
async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("Name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageurl")?.toString();
  const price = Number(formData.get("price") || 0);
  if (!name || !description || !imageUrl || !price) {
    throw Error("missing required field");
  }
  await prisma.product.create({
    data: { name, description, imageUrl, price, type: "default" },
  });
  redirect("/");
}
const Add = () => {
  return (
    <div
      className="mx-auto max-w-2xl h-screen  shadow-2xl relative "
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <section className="absolute inset-0 bg-gradient-to-b from-transparent to-black ">
        <h1 className="bg-blue-900 text-lg font-bold px-10 py-5 text-[26px]   text-white">
          Add product
        </h1>
        <img
          width="104"
          height="104"
          src="https://img.icons8.com/3d-fluency/94/shopping-cart.png"
          alt="shopping-cart"
          className="mx-auto mt-10 drop-shadow-xl fill-current"
          style={{ filter: "drop-shadow(0 0 .3rem #fff" }}
        />
        <form
          action={addProduct}
          className="flex flex-col justify-center items-center gap-4 md:gap-6 py-10 md:pb-40 px-10"
        >
          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full max-w-lg shadow-xl bg-white text-slate-800"
            name="Name"
            required
          />
          <textarea
            className="textarea textarea-bordered md:w-[87%] w-full shadow-xl bg-white text-slate-800"
            placeholder="description"
            name="description"
            required
          ></textarea>
          <input
            type="url"
            placeholder="imageUrl"
            className="input input-bordered w-full max-w-lg shadow-xl bg-white text-slate-800"
            name="imageurl"
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full max-w-lg shadow-xl bg-white text-slate-800"
            name="price"
            required
          />
          <Button className="btn btn-block disabled:text-white bg-blue-900 border-none  text-white mt-5">
            Add item
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Add;
