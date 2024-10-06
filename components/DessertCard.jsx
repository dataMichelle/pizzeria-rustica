"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "../components/CartContext";

export default function DessertCard({ dessert }) {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false); // Prevent multiple clicks
  const { addToCart } = useCart(); // Use the addToCart function from the context

  const handleAddToCart = async () => {
    if (isProcessing) return; // Prevent further clicks while processing

    setIsProcessing(true); // Disable button

    addToCart({ ...dessert, quantity });

    // Non-blocking alert
    setTimeout(() => {
      alert(`${quantity} ${dessert.name}(s) added to your cart!`);
    }, 0);

    setIsProcessing(false); // Re-enable button after processing
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex flex-col md:flex-row border-b-2 p-4 mx-2 md:mx-4 h-full items-start md:items-end">
      {/* Dessert Image */}
      <div className="mr-0 md:mr-4 mb-4 md:mb-0">
        <Image
          src={dessert.image}
          alt={dessert.name}
          width={100} // Set appropriate width
          height={100} // Set appropriate height
          className="rounded-md"
        />
      </div>

      {/* Dessert Information and Add to Cart Button */}
      <div className="flex flex-1 flex-col md:flex-row justify-between items-start md:items-end">
        <div className="flex flex-col mb-4 md:mb-0">
          <h3 className="text-lg font-semibold">{dessert.name}</h3>
          <p className="text-sm">{dessert.description}</p>
          <p className="text-sm">Price: ${dessert.price}</p>
        </div>

        {/* Quantity Controls and Add to Cart */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <button
              className="bg-gray-200 text-gray-800 py-1 px-3 rounded-l-full"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="px-3 text-lg font-semibold">{quantity}</span>
            <button
              className="bg-gray-200 text-gray-800 py-1 px-3 rounded-r-full"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
          <button
            className={`py-2 px-4 rounded-full ml-4 hover:bg-opacity-90 transition duration-300 text-xs uppercase font-medium tracking-wider ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleAddToCart}
            disabled={isProcessing} // Disable button while processing
          >
            {isProcessing ? "Processing..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
