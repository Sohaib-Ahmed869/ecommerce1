"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { GoArrowUpRight } from "react-icons/go";

const Product = ({ params }) => {
  const productId = params.id;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/product/" + productId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
        setLoading(false);
      });
  }, [productId]);

  return (
    <div className="bg-gray-100 w-full">
      <Navbar />
      <div className="container min-h-screen bg-gray-100 w-full mx-auto p-6">
        <div className="flex items-center justify-center bg-gray-100 bg-opacity-90 mx-auto w-full">
          <div className="product flex p-10 bg-gray-100 bg-opacity-90 mx-auto items-center justify-between gap-4">
            <div className="flex  justify-center items-center">
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/ecommerce-8c377.appspot.com/o/${product.name}?alt=media&token=${product.token}`}
                alt={product.name}
                className="h-80 object-fit"
              />
            </div>
            <div className="flex justify-start place-items-start flex-col gap-4 w-1/2">
              <div className="flex justify-between w-full">
                <h1 className="text-4xl font-bold text-center mt-9 text-black uppercase">
                  {product.name}
                </h1>
                <button
                  className="bg-gray-200 text-black px-2 h-8"
                  onClick={() => (window.location.href = "/LandingPage")}
                >
                  <GoArrowUpRight />
                </button>
              </div>
              <p className="text-left mt-4 text-black">$ {product.price}</p>

              <p className="text-justify mt-4 text-black">
                {product.description}
              </p>

              <p className="text-justify mt-4 text-black">BY: TE ABC</p>

              <button
                className="bg-gray-800 text-white px-4 py-2 mt-4 w-full"
                onClick={() => (window.location.href = "/LandingPage")}
              >
                Go to Home Page
              </button>
              <div className="flex justify-between w-full">
                <p className="text-justify mt-0 text-gray-500 text-sm">
                  Standard Delivery Charges Apply
                </p>
                <p className="text-justify mt-0 text-gray-500 text-sm">
                  30 Days Return Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
