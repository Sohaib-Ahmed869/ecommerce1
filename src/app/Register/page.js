"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mainAddress, setMainAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, address:mainAddress }),
    });

    const data = await response.json();

    if (data.status === 200) {
      alert("User registered successfully");
      window.location.href = "/login";
    }
    else {
      alert(data.message);
    }



  };

  return (
    <div
      className="flex flex-col min-h-screen justify-between bg-slate-200"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center container mx-auto min-h-screen">
        <div className="w-full md:w-1/2 px-4 py-6 shadow-md bg-black bg-opacity-90 border border-gray-700 p-4 rounded-md">
          <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white mb-2">
                Name
              </label>

              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>

              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-white mb-2"
              >
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mainAddress" className="block text-white mb-2">
                Main Address
              </label>

              <input
                type="text"
                id="mainAddress"
                value={mainAddress}
                onChange={(e) => setMainAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-gray-900 hover:bg-gray-700 rounded-md w-full mt-4"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
