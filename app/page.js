import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 md:h-[75vh] lg:h-[60vh] items-center gap-12 px-6 md:px-16 lg:px-32 py-8">
        {/* Text Section */}
        <div className="text-center md:text-left space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to{" "}
            <span className="font-quicksand italic text-[#FF4233]">
              Pizzeria Rustica
            </span>
          </h1>
          <p className="text-lg md:text-xl">
            Authentic Italian Pizza. A Slice of Tradition.
          </p>
          <Link
            href="/orders"
            className="bg-primary py-3 px-6 rounded-full text-black uppercase font-semibold hover:bg-opacity-90 transition duration-300 inline-block"
          >
            Explore Our Menu
          </Link>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-full">
          <Image
            src="/hero_serving_pizza.png"
            alt="Pizzeria Rustica Hero Image"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg md:object-contain"
          />
        </div>
      </section>

      {/* Featured Pizzas Section */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold my-8">Our Specialties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pizza 1 */}
            <div className="shadow-lg">
              <Image
                src="/s1.png"
                alt="Pizza Margherita"
                width={400}
                height={300}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Pizza Margherita</h3>
                <p className="text-gray-600">
                  A classic blend of tomato, mozzarella, and fresh basil.
                </p>
              </div>
            </div>
            {/* Pizza 2 */}
            <div className="shadow-lg">
              <Image
                src="/s2.png"
                alt="Pizza Prosciutto"
                width={400}
                height={300}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Pizza Prosciutto</h3>
                <p className="text-gray-600">
                  Savory prosciutto, arugula, and Parmesan on a crispy crust.
                </p>
              </div>
            </div>
            {/* Pizza 3 */}
            <div className="shadow-lg">
              <Image
                src="/s3.png"
                alt="Pizza Diavola"
                width={400}
                height={300}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Pizza Diavola</h3>
                <p className="text-gray-600">
                  Spicy pepperoni, chili flakes, and mozzarella cheese.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
        {/* About Section */}
        <div className="bg-[#FF4233] text-white py-12 px-8 md:px-12">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-6">
              Pizzeria Rustica has been serving authentic Italian pizza for
              three generations. With roots from Italy, our family brought the
              rich tradition of hand-crafted pizzas and genuine hospitality to
              your neighborhood.
            </p>
            <Link
              href="/about"
              className="bg-primary px-6 py-3 rounded-full text-white uppercase font-semibold hover:bg-opacity-90 transition duration-300 inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-primary text-black text-center py-12 px-8 md:px-12">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready for a Slice?</h2>
            <p className="text-lg mb-6">
              Order now and enjoy the taste of Italy delivered right to your
              doorstep.
            </p>
            <Link
              href="/orders"
              className="bg-white text-primary px-6 py-3 rounded-full uppercase font-semibold hover:bg-opacity-90 transition duration-300 inline-block"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
