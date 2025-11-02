import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { sweetsAPI } from "../../services/api";
import SweetCard from "../Sweets/SweetCard";
import SweetForm from "../Sweets/SweetForm";
import { toast } from "react-toastify";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const fetchSweets = async () => {
    try {
      const params = {};
      if (searchTerm) params.name = searchTerm;
      if (categoryFilter !== "all") params.category = categoryFilter;
      if (priceRange.min) params.minPrice = priceRange.min;
      if (priceRange.max) params.maxPrice = priceRange.max;

      const response =
        Object.keys(params).length > 0
          ? await sweetsAPI.search(params)
          : await sweetsAPI.getAll();

      setSweets(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [categoryFilter]);

  const handleAddSweet = async (formData) => {
    try {
      await sweetsAPI.create(formData);
      toast.success("Sweet added successfully!");
      setShowAddForm(false);
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add sweet");
    }
  };

  const handleEditSweet = async (formData) => {
    try {
      await sweetsAPI.update(editingSweet._id, formData);
      toast.success("Sweet updated successfully!");
      setEditingSweet(null);
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update sweet");
    }
  };

  const handleDeleteSweet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) {
      return;
    }
    try {
      await sweetsAPI.delete(id);
      toast.success("Sweet deleted successfully!");
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete sweet");
    }
  };

  const handleRestock = async (id) => {
    const quantity = prompt("Enter quantity to restock:");
    if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
      return;
    }
    try {
      await sweetsAPI.restock(id, { quantity: parseInt(quantity) });
      toast.success("Sweet restocked successfully!");
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to restock sweet");
    }
  };

  const handleSearch = () => {
    fetchSweets();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user?.username}!</h1>
        {isAdmin && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddForm(true)}
          >
            + Add Sweet
          </button>
        )}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="chocolate">Chocolate</option>
          <option value="candy">Candy</option>
          <option value="dessert">Dessert</option>
          <option value="biscuit">Biscuit</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="search-input"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Max Price"
          className="search-input"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: e.target.value })
          }
        />
        <button className="btn btn-primary btn-sm" onClick={handleSearch}>
          Search
        </button>
      </div>

      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <SweetForm
              onSave={handleAddSweet}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {editingSweet && (
        <div className="modal">
          <div className="modal-content">
            <SweetForm
              sweet={editingSweet}
              onSave={handleEditSweet}
              onCancel={() => setEditingSweet(null)}
            />
          </div>
        </div>
      )}

      {sweets.length === 0 ? (
        <div className="empty-state">
          <h3>No sweets found</h3>
          <p>Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="sweet-grid">
          {sweets.map((sweet) => (
            <div key={sweet._id}>
              <SweetCard sweet={sweet} onUpdate={fetchSweets} canEdit={true} />
              {isAdmin && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingSweet(sweet)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleRestock(sweet._id)}
                  >
                    Restock
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteSweet(sweet._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
