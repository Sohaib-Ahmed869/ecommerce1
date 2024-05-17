"use client";
import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const ProductManagement = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [categories, setCategories] = useState([]);

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

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !status || !category || !file) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("category", category);
    formData.append("image", file);

    await fetch("/api/products/product", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);

        // window.location.reload()
      })
      .catch((err) => {
        console.error(err);
      });

    // window.location.reload()
  };

  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }
  , []);

  return (
    <div className="items-center justify-center shadow-md bg-gray-100">
      <Navbar />
      <div className="container min-h-screen bg-gray-100 w-full mx-auto p-6 mt-10">
        <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 bg-opacity-90 rounded-md">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="w-full md:w-1/2 px-4 py-6 shadow-md bg-opacity-90 border border-gray-700 p-4 rounded-md"
          >
            <h1 className="text-4xl font-bold text-center mt-9 text-black uppercase mb-9">
              Product Management
            </h1>
            <div className="mb-4">
              <label htmlFor="name" className="block text-black mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full p-2 rounded-md text-black"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-black mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="w-full p-2 rounded-md text-black"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-black mb-2">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full p-2 rounded-md text-black"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-black mb-2">
                Status
              </label>
              <select
                name="status"
                id="status"
                className="w-full p-2 rounded-md text-black"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-black mb-2">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="w-full p-2 rounded-md text-black"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-black mb-2">
                Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="w-full p-2 rounded-md text-black"
                onChange={handleFile}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-md"
            >
              Add Product
            </button>
          </form>
        </div>
        <br />
      </div>
      <Footer />
    </div>
  );
};

export default ProductManagement;
