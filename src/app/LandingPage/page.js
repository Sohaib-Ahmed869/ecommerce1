"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { BsCart } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { BiMinus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  calculateTotal,
} from "../../lib/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const LandingPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [toggleCart, setToggleCart] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);
  useEffect(() => {
    fetch("/api/products/product", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };
  const filterProducts = (category) => {
    setCategory(category);
  };

  const handleCalculateTotal = () => {
    dispatch(calculateTotal());
  };

  useEffect(() => {
    setCartTotal(
      cart.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [cart]);

  const searchProducts = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      )
    );
  }, [category, products]);

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

  const handleAddToFavourites = async (product) => {
    const res = await fetch("/api/favouriteProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({
        productId: product,
      }),
    });
    console.log(res);
    const data = await res.json();
    getFavourites();
  };

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

  const CartToggleClick = () => {
    if(!localStorage.getItem("userToken")) {
      window.location.href = "/login";
    }
    setToggleCart(!toggleCart);
  }
  return (
    <div className=" bg-gray-100 w-full">
      <Navbar />

      <div className="container min-h-screen bg-gray-100 w-full mx-auto p-6">
        <div className="flex justify-end gap-4 flex-row">
          <button
            onClick={CartToggleClick}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg justify-end"
          >
            <BsCart />
          </button>
          <p className="text-xs font-bold bg-orange-500 text-white px-4 py-2 rounded-3xl justify-end">
            {cart.length}
          </p>
        </div>
        {toggleCart && (
          <div className="absolute top-0 right-0 bg-black h-full  shadow-md">
            <h1 className="text-4xl font-bold text-center mt-9 text-black uppercase">
              Cart Items
            </h1>
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setToggleCart(!toggleCart)}
                className="bg-gray-900 text-white px-4 py-2 justify-end mr-6 hover:bg-red-700"
              >
                Close
              </button>
            </div>
            <div className="cart p-10">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex space-x-4 items-center border-b border-gray-300 py-2 justify-between"
                >
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-8c377.appspot.com/o/${item.name}?alt=media&token=${item.token}`}
                    alt={item.name}
                    className="h-20 object-fit rounded-md shadow-md"
                  />
                  <div className="flex flex-col w-64 py-2 px-3">
                    <div className="flex justify-between">
                      <p className="text-left mt-4 text-white">{item.name}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-left mt-1 text-gray-400">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-left mt-1 text-white">
                        $ {item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleIncrementQuantity(item._id)}
                      className="bg-gray-800 text-white px-4 py-2 rounded"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => handleDecrementQuantity(item._id)}
                      className="bg-gray-800 text-white px-4 py-2 rounded"
                    >
                      <BiMinus />
                    </button>

                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="bg-gray-800 text-white px-4 py-2 rounded"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex flex-col">
                {cart.length > 0 && (
                  <div>
                    <div className="flex justify-between w-full mt-4">
                      <button
                        onClick={() => clearCart()}
                        className="bg-red-800 text-white px-4 py-2 rounded"
                      >
                        Clear Cart
                      </button>
                      <p className="text-lg text-white">Total: $ {cartTotal}</p>
                    </div>
                    <div className="flex justify-center text-center mt-4">
                      <Link
                        className="bg-gray-800 text-white px-4 py-2 rounded w-full hover:bg-gray-700"
                        href={"/Checkout"}
                      >
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                )}

                {cart.length === 0 && (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <p>Your Cart is Empty</p>
                    <BsCart />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-4 px-4 py-6 bg-gray-100 p-4 rounded-md">
          <div className="flex space-x-4 bg-gray-200 p-4 rounded w-full justify-center">
            {categories.map((cat) => (
              <button
                key={cat._id}
                className={`${
                  category === cat.name
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-800"
                } px-4 py-2 rounded`}
                onClick={() => filterProducts(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={search}
            onChange={searchProducts}
            placeholder="Search Products"
            className="border border-gray-300 rounded p-2 w-80 text-black"
          />
          <div className="products w-full p-10 flex flex-wrap justify-center gap-4">
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
                    onClick={() => handleAddToCart(product)}
                    className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                  >
                    <BsCart />
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/LandingPage/${product._id}`)
                    }
                    className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                  >
                    <BsEye />
                  </button>
                  {favourites.includes(product._id) ? (
                    <button
                      onClick={() => handleRemoveFromFavourites(product._id)}
                      className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                    >
                      <BsHeartFill />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToFavourites(product._id)}
                      className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                    >
                      <BiHeart />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
