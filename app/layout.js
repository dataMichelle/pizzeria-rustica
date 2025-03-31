import { Oswald, Inter, Merienda, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

// Fonts with custom weights and subsets
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const merienda = Merienda({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Pizzeria Rustica",
  description:
    "Enjoy authentic Italian pizza at Pizzeria Rustica. Order online for delivery or pickup. Fresh ingredients, traditional recipes, fast service.",
  keywords:
    "traditional Italian pizza, Pizzeria Rustica, online pizza ordering, pizza delivery [your city], authentic pizza",
  openGraph: {
    title: "Pizzeria Rustica",
    description:
      "Enjoy authentic Italian pizza at Pizzeria Rustica. Order online for delivery or pickup. Fresh ingredients, traditional recipes, fast service.",
    url: "https://pizzeria-rustica.vercel.app/",
    images: [
      {
        url: "/images/hero_serving_pizza.png",
        width: 1200,
        height: 630,
        alt: "Pizzeria Rustica - Authentic Italian Pizza",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oswald.className} ${inter.className}`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
