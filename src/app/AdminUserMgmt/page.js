"use client";
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AdminUserMgmt = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([users]);

    const [filters, setFilters] = useState(["Add User", "View Users"]);

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    
    // useEffect(() => {
    //     setFilteredUsers(
    //         users.filter((user) =>
    //             user.name.toLowerCase().includes(searchResults.toLowerCase())
    //         )
    //     );
    // }, [searchResults, users]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            setError("Unable to fetch users");
        }
    }

    const blockUser = async (id) => {
        setLoading(true);
        try {
            const response = await fetch("/api/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, blocked: true }),
            });
            const data = await response.json();
            if (data.status === 200) {
                alert("User blocked successfully");
            }
        }
        catch (error) {
            alert("Unable to block user");
        }

    }


    const unblockUser = async (id) => {
        setLoading(true);
        try {
            const response = await fetch("/api/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, blocked: false }),
            });
            const data = await response.json();
            if (data.status === 200) {
                alert("User unblocked successfully");
            }
        }
        catch (error) {
            alert("Unable to unblock user");
        }
    }

    useEffect(() => {
        fetchUsers();
    }
    , []);


    return (
        <div className="flex flex-col justify-between">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10 min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              placeholder="Search users"
              className="border border-gray-300 p-1 rounded-md"
              value={searchResults}
              onChange={(e) => setSearchResults(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-1 rounded-md ml-2"
              onClick={() => fetchUsers()}
            >
              Search
            </button>
          </div>
          <div className="flex flex-col items-center justify-center mt-5">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex flex-row items-center justify-between w-full p-2 border border-gray-300 rounded-md px-4 py-2 mt-2 w-96"
              >
                <div className="flex flex-col items-start justify-start">
                  <p className="font-bold">Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Blocked: {user.blocked ? "Blocked" : "Not Blocked"}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {user.blocked ? (
                    <button
                      className="bg-green-500 text-white p-1 rounded-md"
                      onClick={() => unblockUser(user._id)}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 text-white p-1 rounded-md"
                      onClick={() => blockUser(user._id)}
                    >
                      Block
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
}

export default AdminUserMgmt;