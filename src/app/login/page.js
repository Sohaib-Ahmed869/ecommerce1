"use client";
import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import { useRouter } from "next/navigation";
const Login = () => {
  const [name, setName] = React.useState("");

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const router = useRouter();

  // Form handling logic with basic validation

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simple validation (replace with more robust validation)

    if (!email || !password) {
      alert("Please fill in all required fields.");

      return;
    }

    // Handle form submission (e.g., send registration data to server)
    //call api
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) alert(data.message);
        if (data.name) localStorage.setItem("name", data.name);
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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

        <div className="w-full md:w-1/2 px-4 py-6  rounded-md shadow-md bg-black bg-opacity-80 border border-gray-900 rounded p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md border text-black  bg-grey-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black bg-grey-800"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-gray-900 hover:bg-gray-700 rounded-md w-full">
            
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
