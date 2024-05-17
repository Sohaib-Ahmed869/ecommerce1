import { Inter } from "next/font/google";
import Head from 'next/head'; // Import Head component
import StoreProvider from "./storeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TE ABC Ecommerce",
  description: "A modern ecommerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" /> 
      </Head>
        <body className="font-sans text-gray-900 bg-white">
            <StoreProvider>{children}</StoreProvider>
        </body>
    </html>
  );
}
