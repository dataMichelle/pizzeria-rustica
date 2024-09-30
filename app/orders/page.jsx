import pizzasData from "@/data/pizzas.json";
import dessertsData from "@/data/desserts.json";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import the client components
const PizzaCard = dynamic(() => import("@/components/PizzaCard"), {
  ssr: false,
});
const DessertCard = dynamic(() => import("@/components/DessertCard"), {
  ssr: false,
});

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-3xl text-center my-8">Menu</h1>

      {/* Pizza Section */}
      <section>
        <h2 className="text-2xl text-center mt-16 text-[#FF4332]">Pizzas</h2>
        <ul>
          {pizzasData.map((pizza) => (
            <li key={pizza.id}>
              <PizzaCard pizza={pizza} /> {/* Client Component */}
            </li>
          ))}
        </ul>
      </section>

      {/* Dessert Section */}
      <section>
        <h2 className="text-2xl text-center mt-16 text-[#FF4332]">Desserts</h2>
        <ul>
          {dessertsData.map((dessert) => (
            <li key={dessert.id}>
              <DessertCard dessert={dessert} /> {/* Client Component */}
            </li>
          ))}
        </ul>
      </section>

      {/* Proceed to Checkout Button at Bottom */}
      <div className="text-center my-12">
        <Link
          href="/cart"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
