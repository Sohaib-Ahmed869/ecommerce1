"use client";
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHamburger } from "react-icons/fa";
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ setExpanded }) => {
  const [token, setToken] = useState("");
  const [isMentor, setIsMentor] = useState("");
  const [isUser, setIsUser] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setToken(localStorage.getItem("userToken"));
      setIsMentor(localStorage.getItem("adminToken"));
      setIsUser(localStorage.getItem("userToken"));
    }
  }, []);


  return (
    <nav className="bg-gray-300 flex items-center h-24 px-4 sticky w-full z-10 shadow-md top-0 absolute">
      <div className="flex-grow-0">
        <img src="/Logo.png" alt="Logo" className="w-auto h-20 object-fit cursor-pointer" onClick={() => router.push("/")} />
      </div>

      {/* Responsive Dropdown Button */}
      <div className="flex items-center ml-auto">
        {/* Responsive Dropdown Button */}
        <button
          className="block xl:hidden ml-auto px-3 py-2 text-blue bg-white-100 hover:bg-gray-100 rounded-md"
          onClick={() => {
            setShowDropdown(!showDropdown);
            if (setExpanded) setExpanded(!showDropdown);
          }}
        >
          {showDropdown ? <FiX /> : <FiMenu />} 
        </button>
      </div>

      <ul
        className={`xl:flex space-x-4 text-black ml-4 ${
          showDropdown ? "block" : "hidden"
        }`}
      >
        {isUser && (
        <li>
          <a href="/LandingPage" className="text-black hover:text-gray-400">
            Home
          </a>
        </li>
        )}
        {isUser && (
        <li>
          <a href="/MyOrders" className="text-black hover:text-gray-400">
            My Orders
          </a>
        </li>
        )}
        {isMentor && (
          <li>
            <a href="/Admin-Product-Add" className="text-black hover:text-gray-400">
              Add Product
            </a>
          </li>
        )}
        {isMentor && (
          <li>
            <a href="/Admin-Product-View" className="text-black hover:text-gray-400">
              View Products
            </a>
          </li>
        )}
        {isMentor && (
          <li>
            <a href="/Admin-Orders" className="text-black hover:text-gray-400">
              Orders
            </a>
          </li>
        )}
        {isMentor && (
          <li>
            <a href="/Admin-Categories" className="text-black hover:text-gray-400">
              Categories
            </a>
          </li>
        )}
        {isUser && (
        <li>
          <a href="/FavouriteProducts" className="text-black hover:text-gray-400">
            Favourites
          </a>
        </li>
        )}
        {isUser && (
        <li>
          <a href="/About" className="text-black hover:text-gray-400">
            About Us
          </a>
        </li>
        )}
        {isMentor && (
          <li>
            <a href="/AdminUserMgmt" className="text-black hover:text-gray-400">
              User Management
            </a>
          </li>
        )}

        {/* User Authentication Buttons */}
        {!token ? (
          <div className="flex space-x-2 ml-auto">
            <button
              className="px-3 py-0 text-blue bg-white-500 hover:text-gray-400 rounded-md"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="px-3 py-0 text-blue bg-white-500 hover:text-gray-400 rounded-md"
              onClick={() => router.push("/Register")}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="flex space-x-2 ml-auto">
            <button
              className="px-3 py-0 text-blue bg-white-500 hover:text-gray-400 rounded-md"
              onClick={() => {
                localStorage.removeItem("userToken");
                localStorage.removeItem("adminToken");
                window.location.href = "/LandingPage";
              }}
            >
              Logout
            </button>
          </div>
        )}
      </ul>

      {/* Responsive Dropdown Menu */}
      <div
        className={`xl:hidden absolute top-0 right-4 ${
          showDropdown ? "block" : "hidden"
        } z-10 bg-white rounded-md shadow-md w-48 mt-0`}
      >
        <ul className="bg-gray-100 text-black rounded-md shadow-md py-2 px-3">
          <li>
            <a href="/LandingPage" className="block text-black hover:text-gray-400 py-1">
              Home
            </a>
          </li>
          <li>
            <a
              href="/About"
              className="block text-black hover:text-gray-400 py-1"
            >
              About Us
            </a>
          </li>
          <li>
            {!token ? (
              <div className="flex space-x-2 ml-auto md:flex-col">
                <a
                  className="block text-black hover:text-gray-400 py-1 hover:bg-gray-100"
                  onClick={() => router.push("/login")}
                >
                  Login
                </a>
                <a
                  className="block text-black hover:text-gray-400 py-1 hover:bg-gray-100"
                  onClick={() => router.push("/Register")}
                >
                  Register
                </a>
              </div>
            ) : (
              <a
                className="block text-black hover:text-gray-400 py-1"
                onClick={() => {
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("adminToken");
                  window.location.href = "/LandingPage";
                }}
              >
                Logout
              </a>
            )}
          </li>
        </ul>

        {/* User Authentication Buttons */}
      </div>
    </nav>
  );
};

export default Navbar;
