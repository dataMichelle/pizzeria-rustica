"use client";
import { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../path/to/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="relative bg-black text-white p-5 flex items-center justify-between h-auto md:h-[110px] px-10">
      {/* Logo and Title for Mobile */}
      <div className="flex flex-col items-center md:hidden">
        <h1 className="text-2xl font-quicksand mb-2">Pizzeria Rustica</h1>
        <Image
          src="/logo.png"
          alt="Pizzeria Rustica Logo"
          width={100}
          height={100}
          className="block"
        />
      </div>

      {/* Left Section - Pizzeria Rustica for Desktop */}
      <div className="hidden md:flex items-center">
        <h1 className="text-3xl font-quicksand">Pizzeria Rustica</h1>
      </div>

      {/* Center Section - Logo for Desktop */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
        <Image
          src="/logo.png"
          alt="Pizzeria Rustica Logo"
          width={150}
          height={150}
          className="block"
        />
      </div>

      {/* Mobile Menu Button (always on the right) */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-3xl focus:outline-none absolute right-5 top-5"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Right Section - Desktop Navigation */}
      <nav className="hidden md:flex space-x-7 items-center">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/orders" className="hover:underline">
          Order Online
        </Link>
        <Link
          href="/cart"
          className="hover:underline relative flex items-center"
        >
          <FaShoppingCart className="text-xl" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
              {cartItemCount}
            </span>
          )}
        </Link>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[110px] left-0 w-full bg-black text-white flex flex-col items-center space-y-5 py-5 z-10">
          <Link href="/" onClick={toggleMenu} className="hover:underline">
            Home
          </Link>
          <Link href="/about" onClick={toggleMenu} className="hover:underline">
            About
          </Link>
          <Link href="/orders" onClick={toggleMenu} className="hover:underline">
            Order Online
          </Link>
          <Link
            href="/cart"
            onClick={toggleMenu}
            className="hover:underline flex items-center"
          >
            <FaShoppingCart className="text-xl" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
