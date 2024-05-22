import { redirect } from "next/navigation";
import Link from "next/link";
import CartButton from "./cartButton";
import { prisma } from "@/lib/db/prisma";
import { getCart } from "@/lib/db/cart";

async function searchProduct(formData: FormData) {
  "use server";

  const searchQuery = formData.get("search")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}
const Navbar = async () => {
  const cart = await getCart();
  return (
    <div className="navbar shadow-xl scr sticky top-0 z-30 md:px-10 px-5 py-3">
      <div className="flex-1 items-center">
        <Link href={"/"} className="btn btn-ghost text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <g fill="none">
              <circle cx="16" cy="16" r="16" fill="#000" />
              <g fill="#FFF">
                <path d="M15.897 4.398c-.146-.33.382-.564.528-.25c3.432 5.912 6.864 11.827 10.296 17.748c-.183 0-.359-.06-.535-.088l-9.16-1.826c-.3-.015-.366-.5-.073-.572l3.594-.99a.3.3 0 0 0 .198-.418L15.897 4.39z" />
                <path d="M15.37 4.428c.033.048.062.1.087.154c1.086 3.08 2.2 6.16 3.278 9.24c.096.256-.264.469-.44.278c-.924-.968-1.804-1.965-2.713-2.933c-.147-.132-.36-.044-.455.095L5.682 22.358c-.11.117-.205.293-.389.315c-.132 0-.22-.103-.293-.205v-.17c3.461-5.954 6.918-11.91 10.37-17.87" />
                <path d="M12.48 14.995c.176-.051.41.073.352.286c-.367 1.276-.755 2.545-1.137 3.813c-.058.162.088.308.242.316c4.943.99 9.886 2.016 14.828 3.006c.096.015.162.088.235.147v.205l-.14.147H5.88c2.2-2.64 4.393-5.295 6.6-7.92" />
              </g>
            </g>
          </svg>
          RizzKarT
        </Link>
      </div>
      <form action={searchProduct}>
        <div className="form-control ">
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="input input-bordered w-28 h-8 md:mr-5 focus:border-none md:w-auto"
          />
        </div>
      </form>

      <div className="flex-none">
        <CartButton cart={cart} />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
