import { Inter } from "next/font/google";
import Head from 'next/head'; // Import Head component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jobs Network Hub",
  description: "Jobs Network Hub is a platform for job seekers and employers to connect.",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
