"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  calculateTotal,
} from "../../lib/CartSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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


  useEffect(() => {
    setTotal(
      cart.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    setLoading(false);
  }, [cart]);

  return (
    <div className=" bg-gray-100 w-full">
      <Navbar />

      <div className="container min-h-screen bg-gray-100 w-full mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mt-9 text-black uppercase">
          Checkout
        </h1>
        <div className="flex flex-col items-center gap-4 min-h-screen">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row justify-between w-full p-4 bg-white shadow-lg rounded-lg mt-10">
              <div className="flex flex-col items-center justify-center gap-4 w-1/2">
                {cart.length === 0 ? (
                  <p className="text-black text-center">Cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-row items-center justify-between w-full p-4 bg-gray-200 h-48 shadow-lg rounded-lg"
                    >
                      <div className="flex flex-row gap-4">
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-8c377.appspot.com/o/${item.name}?alt=media&token=${item.token}`}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                        <div className="flex flex-col gap-4 justify-center">
                          <p className="text-black font-bold">{item.name}</p>
                          <p className="text-black">Price: ${item.price}</p>
                          <p className="text-black">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-4 items-center">
                        <button
                          onClick={() => handleDecrementQuantity(item._id)}
                          className="text-white bg-gray-600 rounded-lg px-2 py-1"
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          onClick={() => handleIncrementQuantity(item._id)}
                          className="text-white bg-gray-600 rounded-lg px-2 py-1"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(item._id)}
                          className="text-white bg-red-600 rounded-lg px-2 py-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex flex-col items-center justify-center gap-4 w-1/2 p-4">
                <h1 className="text-2xl font-bold">Cart Summary</h1>
                <div className="flex flex-row justify-between w-full">
                  <p className="text-black font-bold">Total:</p>
                  <p className="text-black font-bold">${total}</p>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <p className="text-black font-bold">Shipping:</p>
                  <p className="text-black font-bold">$10</p>
                </div>
                <div className="line w-full border-b-2 border-gray-400"></div>
                <div className="flex flex-row justify-between w-full">
                  <p className="text-black font-bold">Grand Total:</p>
                  <p className="text-black font-bold">${total + 10}</p>
                </div>

                <Link
                  href = "/Payment"
                  className="bg-black text-white px-4 py-2 rounded-lg w-full"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
