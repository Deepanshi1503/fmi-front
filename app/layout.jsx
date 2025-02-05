import { Inter } from "next/font/google";
import "./globals.css";
import "@/public/css/common.css";
import "@/public/css/responsive.css";
import "@/public/css/bootstrap.css";
import "@/public/css/all.css";
import "@/public/css/font-awesome.min.css";

const poppins = Inter({
  subsets: ["latin"],
  weights: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
