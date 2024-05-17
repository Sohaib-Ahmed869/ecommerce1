"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/myorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("userToken") }),
      }).then((response) => response.json());
      setOrders(response);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className=" bg-gray-100 w-full">
      <Navbar />

      <div className="container min-h-screen bg-gray-100 w-full mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mt-9 text-black uppercase">
          My Orders
        </h1>
        <div className="flex flex-col items-center gap-4 min-h-screen">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table-auto w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border px-4 py-2">
                      {order._id}
                      {order.order.map((items) => (
                        <div key={items._id}>
                          {items.map((item) => (
                            <div className="ml-4 bg-gray-300 p-2 rounded mt-2 justify-between flex flex-row">
                              <div className="items-center">
                                <img
                                  src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-8c377.appspot.com/o/${item.name}?alt=media&token=${item.token}`}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                              </div>
                              <div className="text-sm font-bold text-black text-right ml-4">
                                {item.name} x {item.quantity} <br></br>
                                $ {item.price}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </td>
                    <td className="border px-4 py-2">{order.total}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyOrders;
