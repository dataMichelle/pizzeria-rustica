"use client"; // This makes the component a client component
import { useState } from "react";

export default function PizzaCard({ pizza }) {
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

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
    if (quantity > 1) setQuantity(quantity - 1); // Ensure quantity does not go below 1
  };

  return (
    <div className="flex flex-col md:flex-row border-b-2 p-4 mx-85 h-full items-start md:items-end">
      {/* Pizza Image */}
      <div className="mr-4">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-[100px] h-auto rounded-md"
        />
      </div>

      {/* Pizza Information */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{pizza.name}</h3>
        <p className="text-sm">{pizza.description}</p>
        <p className="text-sm">Price: ${pizza.price}</p>
      </div>

      {/* Quantity Controls and Add to Cart */}
      <div className="flex md:flex-col flex-row items-center md:items-end space-x-2 md:space-x-0 mt-4 md:mt-0">
        <div className="flex items-center space-x-2">
          {/* Decrease Quantity Button */}
          <button
            className="bg-gray-200 text-gray-800 py-1 px-3 rounded-l-full"
            onClick={handleDecrease}
          >
            -
          </button>

          {/* Display Quantity */}
          <span className="px-3 text-lg font-semibold">{quantity}</span>

          {/* Increase Quantity Button */}
          <button
            className="bg-gray-200 text-gray-800 py-1 px-3 rounded-r-full"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          className="py-2 px-4 rounded-full bg-gold hover:bg-opacity-90 transition duration-300 text-xs uppercase font-medium tracking-wider ml-4 md:ml-0 md:mt-4"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
