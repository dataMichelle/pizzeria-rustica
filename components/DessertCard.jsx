"use client";
import { useState } from "react";
import Image from "next/image";

export default function DessertCard({ dessert }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = currentCart.findIndex((item) => item.id === dessert.id);

    if (itemIndex > -1) {
      currentCart[itemIndex].quantity += quantity;
    } else {
      currentCart.push({ ...dessert, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert(`${quantity} ${dessert.name}(s) added to your cart!`);
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex border-b-2 p-4 mx-85 h-full items-end">
      {/* Dessert Image */}
      <div className="mr-4">
        <Image
          src={dessert.image}
          alt={dessert.name}
          width={100} // Set appropriate width
          height={100} // Set appropriate height
          className="rounded-md"
        />
      </div>

      {/* Dessert Information and Add to Cart Button */}
      <div className="flex flex-1 justify-between items-end">
        <div className="flex flex-col">
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
            className="py-2 px-4 rounded-full ml-4 hover:bg-opacity-90 transition duration-300 text-xs uppercase font-medium tracking-wider"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
