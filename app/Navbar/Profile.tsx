"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
interface UserProp {
  session: Session | null;
}

export default function UserProfile({ session }: UserProp) {
  const user = session?.user;
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full p-1">
          {user ? (
            <Image
              src={user?.image || ""}
              alt="Profile"
              width={10}
              height={10}
              className="w-10 rounded-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
              className="border border-black rounded-full p-0.5"
            >
              <path
                fill="currentColor"
                d="m448 362.7l-117.3-21.3C320 320 320 310.7 320 298.7c10.7-10.7 32-21.3 32-32c10.7-32 10.7-53.3 10.7-53.3c5.5-8 21.3-21.3 21.3-42.7s-21.3-42.7-21.3-53.3C362.7 32 319.2 0 256 0c-60.5 0-106.7 32-106.7 117.3c0 10.7-21.3 32-21.3 53.3s15.2 35.4 21.3 42.7c0 0 0 21.3 10.7 53.3c0 10.7 21.3 21.3 32 32c0 10.7 0 21.3-10.7 42.7L64 362.7C21.3 373.3 0 448 0 512h512c0-64-21.3-138.7-64-149.3"
              />
            </svg>
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
      >
        {user && (
          <li className="font-bold  px-5 bg-black text-white  text-center rounded-xl flex items-center justify-center">
            <h1 className=" w-20 text-nowrap p-3" > Hi {user?.name}</h1>
          </li>
        )}
        <li>
          {user ? (
            <div>
              <div className="divider" />
              <button onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  );
}
