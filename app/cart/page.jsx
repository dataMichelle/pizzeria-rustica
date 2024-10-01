import dynamic from "next/dynamic";

// Dynamically import the Cart component
const Cart = dynamic(() => import("@/components/Cart"), { ssr: false });

const handleProceedToCheckout = () => {
  const finalAmount = total.toFixed(2);
  localStorage.setItem("finalTotal", finalAmount); // Save final total including tip to localStorage
  localStorage.setItem("tip", tip); // Save tip separately if needed
};

export default function CartPage() {
  return (
    <div>
      <h1 className="text-3xl text-center my-8">Your Cart</h1>
      <Cart />
    </div>
  );
}
