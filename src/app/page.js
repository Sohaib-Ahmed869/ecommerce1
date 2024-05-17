"use client"
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-black">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <h1 className="text-4xl font-bold text-center mt-9 text-white uppercase">
          Welcome to The TE ABC Ecommerce
        </h1>
        <p className="text-white text-center">
          This is the home page of the TE ABC Ecommerce. You can find all the
          products here!
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/LandingPage"}>
          Explore Products
        </button>

        <img
          src="/logo.png"
          alt="Bawarchi Restaurant"
          className="w-1/2 h-auto object-contain rounded-md"
        />
      </div>
      <Footer />
    </main>
  );
}
