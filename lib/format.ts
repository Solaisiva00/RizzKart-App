type Price = number | any;

export function formatprice(price: Price) {
  return price?.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}
