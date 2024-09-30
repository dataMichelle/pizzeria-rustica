import dynamic from "next/dynamic";

// Dynamically import the Cart component
const Cart = dynamic(() => import("@/components/Cart"), { ssr: false });

export default function CartPage() {
  return (
    <div>
      <h1 className="text-3xl text-center my-8">Your Cart</h1>
      <Cart /> {/* Client-side cart component */}
    </div>
  );
}
