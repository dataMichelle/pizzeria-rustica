import { Oswald, Inter, Merienda, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Importing Oswald and Inter fonts with custom weights and subsets
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify the weights you want to use
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Specify the weights you want to use
});

const merienda = Merienda({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify the weights you want to use
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Specify the weights you want to use
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oswald.className} ${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
