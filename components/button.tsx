"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type prop = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmit({ children, className, ...prop }: prop) {
  const { pending } = useFormStatus();
  return (
    <button
      {...prop}
      className={`btn-block btn ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner "></span>}
      {children}
    </button>
  );
}
