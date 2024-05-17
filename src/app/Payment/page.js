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
import { BsPaypal } from "react-icons/bs";
import { RiMastercardFill } from "react-icons/ri";
import { GrVisa } from "react-icons/gr";
import { BsCash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Visa");

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTotal(
      cart.reduce((total, item) => total + item.price * item.quantity, 0)
    );
    setLoading(false);
  }, [cart]);

  const paymentMethods = [
    {
      id: 1,
      name: "Visa",
    },
    {
      id: 2,
      name: "Mastercard",
    },
    {
      id: 3,
      name: "Paypal",
    },
    {
      id: 4,
      name: "Cash on Delivery",
    },
  ];

  const onCheckout = async () => {
    try {
      const order = {
        cart: cart,
        total: total,
        paymentMethod: selectedPaymentMethod,
        status: "Pending",
        address: address,
        payment_method: selectedPaymentMethod,
        token: localStorage.getItem("userToken"),
      };
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      console.log(data);

      alert("Order Placed Successfully");
      dispatch(clearCart());


    } catch (error) {
       
      
      console.log(error);
    } finally {
        window.location.href = "/LandingPage";
    }
  };

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

                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-2xl font-bold">Shipping Address</h1>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-4 bg-gray-200 rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-2xl font-bold">Payment Method</h1>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.name)}
                      className={`flex flex-row items-center justify-between w-full p-4 bg-gray-200 h-16 shadow-lg rounded-lg cursor-pointer ${
                        selectedPaymentMethod === method.name
                          ? "border-2 border-black"
                          : ""
                      }`}
                    >
                      {method.name === "Visa" && (
                        <GrVisa className="text-4xl" />
                      )}
                      {method.name === "Mastercard" && (
                        <RiMastercardFill className="text-4xl" />
                      )}
                      {method.name === "Paypal" && (
                        <BsPaypal className="text-4xl" />
                      )}
                      {method.name === "Cash on Delivery" && (
                        <BsCash className="text-4xl" />
                      )}
                      <p className="text-black font-bold">{method.name}</p>
                    </div>
                  ))}
                </div>

                <button
                  className="bg-black text-white px-4 py-2 rounded-lg w-full"
                  onClick={onCheckout}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
