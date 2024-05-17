"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Modal from 'react-bootstrap/Modal';
import { GiTick } from "react-icons/gi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
      setOrders(response);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateOrder = async (id, status) => {
    try {
      await fetch("/api/checkout", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });
      fetchOrders();
      setShow(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className=" bg-gray-100 w-full">
      <Navbar />

      <div className="container min-h-screen bg-gray-100 w-full mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mt-9 text-black uppercase">
          Admin Orders
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
                    <td className="border px-4 py-2">
                      <select
                        className="p-2 bg-gray-100"
                        value={order.status}
                        onChange={(e) => updateOrder(order._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      <Footer />
      <Modal show={show} onHide={() => setShow(false)} animation={true} centered size="xl" className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md shadow-lg">
        <Modal.Header closeButton>
          <Modal.Title>Status Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col items-center">
          <GiTick size={50} className="text-green-500" />
          <p>Order status updated successfully</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShow(false)} className="bg-green-500 text-white p-2 rounded-md mt-5">Close</button>
        </Modal.Footer>
      </Modal>
    </div>
    
  );
};

export default AdminOrders;
