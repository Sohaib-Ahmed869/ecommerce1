"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AdminCategories = () => {
  const [filters, setFilters] = useState(["Add Category", "View Categories"]);

  const [selectedFilter, setSelectedFilter] = useState("Add Category");

  const [searchResults, setSearchResults] = useState("");

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([categories]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchResults.toLowerCase())
      )
    );
  }, [searchResults, categories]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError("Unable to fetch categories");
    }
  };

  const addCategory = async () => {
    if (!category) {
      setError("Category cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: category }),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert("Category added successfully");
        setCategory("");
        fetchCategories();
      } else {
        alert("Unable to add category");
      }
    } catch (error) {
      alert("Unable to add category");
    }
    setLoading(false);
  };

  const changeCategoryStatus = async (id, status) => {
    try {
      const response = await fetch("/api/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setSuccess("Category status updated successfully");
        fetchCategories();
      } else {
        setError("Unable to update category status");
      }
    } catch (error) {
      setError("Unable to update category status");
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10 min-h-screen">
        <div className="flex space-x-4">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`${
                selectedFilter === filter
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        {selectedFilter === "Add Category" && (
          <div className="flex flex-col items-center mt-10">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="border border-gray-300 rounded p-2 w-80 text-black"
            />
            <button
              onClick={addCategory}
              className="bg-gray-800 text-white px-4 py-2 rounded mt-4 w-full"
            >
              {loading ? "Loading..." : "Add Category"}
            </button>
          </div>
        )}
        {selectedFilter === "View Categories" && (
          <div className="flex flex-col items-center mt-10">
            <input
              type="text"
              value={searchResults}
              onChange={(e) => setSearchResults(e.target.value)}
              placeholder="Search Categories"
              className="border border-gray-300 rounded p-2 w-80 text-black"
            />

            {filteredCategories.map((category) => (
              <div
                key={category._id}
                className="flex space-x-4 items-center border-b border-gray-300 w-80 py-2 justify-between"
              >
                <p>{category.name}</p>
                <button
                  onClick={() =>
                    changeCategoryStatus(
                      category._id,
                      category.status === "active" ? "inactive" : "active"
                    )
                  }
                  className={`${
                    category.status === "active" ? "bg-green-500" : "bg-red-500"
                  } text-white px-4 py-2 rounded`}
                >
                  {category.status === "active" ? "Active" : "Inactive"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminCategories;
