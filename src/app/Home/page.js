"use client"
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-black">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center mt-9 text-white uppercase">
          Welcome to Bawarchi Restaurant
        </h1>
        <p className="text-white text-center">
          This is the administration panel
        </p>

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
