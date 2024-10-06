import pizzasData from "@/data/pizzas.json";
import dessertsData from "@/data/desserts.json";
import PizzaCard from "@/components/PizzaCard";
import DessertCard from "@/components/DessertCard";
import MenuWrapper from "@/components/MenuWrapper";

export default function Page() {
  return (
    <MenuWrapper>
      <div>
        <h1 className="text-3xl text-center my-8">Menu</h1>

        {/* Pizza Section */}
        <section>
          <h2 className="text-2xl text-center mt-16 text-[#FF4332]">Pizzas</h2>
          <ul>
            {pizzasData.map((pizza) => (
              <li key={pizza.id}>
                {/* Client-side component to handle interactivity */}
                <PizzaCard pizza={pizza} />
              </li>
            ))}
          </ul>
        </section>

        {/* Dessert Section */}
        <section>
          <h2 className="text-2xl text-center mt-16 text-[#FF4332]">
            Desserts
          </h2>
          <ul>
            {dessertsData.map((dessert) => (
              <li key={dessert.id}>
                {/* Client-side component to handle interactivity */}
                <DessertCard dessert={dessert} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </MenuWrapper>
  );
}
