"use client";
import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/product", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className=" bg-gray-100 w-full">
      <Navbar />
      <div className="container min-h-screen bg-gray-100 w-full mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mt-9 text-black uppercase">
          Product View
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 px-4 py-6 shadow-md bg-black bg-opacity-90 border border-gray-700 p-4 rounded-md">
          <div className="table w-full p-10">
            <table className="w-full">
              <thead>
                <tr className="border border-gray-700">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border border-gray-700">
                    <td className="justify-center items-center flex flex-col">
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-8c377.appspot.com/o/${product.name}?alt=media&token=${product.token}`}
                        alt={product.name}
                        className="h-20 object-fit rounded-md shadow-md"
                      />
                    </td>
                    <td
                      className="text-center"
                      style={{ width: "200px", wordWrap: "break-word" }}
                    >{product.name}</td>
                    <td
                      className="text-center"
                      style={{ width: "100px", wordWrap: "break-word" }}
                    >{product.price}</td>
                    <td
                      className="text-center"
                      style={{ width: "200px", wordWrap: "break-word" }}
                    >{product.description}</td>
                    <td
                      className="text-center"
                      style={{ width: "100px", wordWrap: "break-word" }}
                    >{product.status}</td>
                    <td
                      className="text-center"
                      style={{ width: "100px", wordWrap: "break-word" }}
                    >{product.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewProducts;
