"use client";
import { useState } from "react";
import Image from "next/image";

export default function PizzaCard({ pizza }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = currentCart.findIndex((item) => item.id === pizza.id);

    if (itemIndex > -1) {
      currentCart[itemIndex].quantity += quantity;
    } else {
      currentCart.push({ ...pizza, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert(`${quantity} ${pizza.name}(s) added to your cart!`);
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex border-b-2 p-4 mx-85 h-full items-end">
      {/* Pizza Image */}
      <div className="mr-4">
        <Image
          src={pizza.image}
          alt={pizza.name}
          width={100} // Set appropriate width
          height={100} // Set appropriate height
          className="rounded-md"
        />
      </div>

      {/* Pizza Information and Add to Cart Button */}
      <div className="flex flex-1 justify-between items-end">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{pizza.name}</h3>
          <p className="text-sm">{pizza.description}</p>
          <p className="text-sm">Price: ${pizza.price}</p>
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
