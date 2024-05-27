"use client";
import Link from "next/link";
export default function ErrorPage() {
  return (
    <div className="text-white font-mono text-xl flex items-center justify-center h-[70vh] bg-gradient-to-b from-red-300 to-red-600">
      <h1 className="text-wrap px-10">
        ⚠️ Something went wrong.please refresh the page or{" "}
        <Link href={"/"} className="btn-link">Redirect</Link> to home page...
      </h1>
    </div>
  );
}
