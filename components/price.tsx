import { formatprice } from "@/lib/format";

interface priceprop {
  price: number;
  className?: string;
}

export default function pricetag({ price, className }: priceprop) {
  return <span className={`badge px-3 py-4 mt-3  ${className}`}>{formatprice(price)}</span>;
}
