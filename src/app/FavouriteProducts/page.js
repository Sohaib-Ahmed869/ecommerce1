"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AiFillDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import Link from "next/link";

const FavouriteProducts = () => {
  const [products, setProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getFavourites = async () => {
    try {
      const res = await fetch("/api/favouriteProduct", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      const data = await res.json();
      setFavourites(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  const handleRemoveFromFavourites = async (productId) => {
    const res = await fetch("/api/favouriteProduct", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });
    const data = await res.json();
    getFavourites();
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => favourites.includes(product._id))
    );
  }, [favourites, products]);

  return (
    <div className=" bg-gray-100 w-full">
      <Navbar />

      <div className="flex flex-col items-center justify-center gap-4 px-4 py-6 bg-gray-100 p-4 rounded-md">
        <h1 className="text-4xl font-bold text-center mt-9 text-black uppercase flex items-center gap-4">
          <BsHeartFill /> Favourite Products
        </h1>
        <div className="products w-full p-10 flex flex-wrap justify-center gap-4">
          {filteredProducts.length === 0 && (
            <p className="text-center text-2xl font-bold">
              No favourite products found
            </p>
          )}
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col text-center justify-center  space-x-4 items-center border border-gray-300 bg-gray-300 w-80 py-2 text-black hover:bg-gray-400 hover:shadow-md hover:border-gray-400 rounded-md hover:cursor-pointer "
            >
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-8c377.appspot.com/o/${product.name}?alt=media&token=${product.token}`}
                alt={product.name}
                className="h-40 object-fit mt-10 mb-10"
              />
              <p className="text-center font-bold text-lg">{product.name}</p>
              <p className="text-center text-sm mb-3">$ {product.price}</p>
              <div className="flex justify-between gap-2">
                <button
                  onClick={() =>
                    (window.location.href = `/LandingPage/${product._id}`)
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                >
                  <BsEye />
                </button>

                <button
                  onClick={() => handleRemoveFromFavourites(product._id)}
                  className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                >
                  <BsHeartFill />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavouriteProducts;
