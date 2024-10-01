import dynamic from "next/dynamic";

// Dynamically import the Cart component
const Cart = dynamic(() => import("@/components/Cart"), { ssr: false });

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-8 lg:px-12">
      <h1 className="text-2xl md:text-3xl text-center my-4 md:my-8">
        Your Cart
      </h1>
      <div className="flex justify-center">
        <Cart />
      </div>
    </div>
  );
}
