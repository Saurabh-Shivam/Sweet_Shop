import React, { useState, useEffect } from "react";

const SweetForm = ({ sweet, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "chocolate",
    price: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name || "",
        category: sweet.category || "chocolate",
        price: sweet.price || "",
        quantity: sweet.quantity || "",
        description: sweet.description || "",
      });
    }
  }, [sweet]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Sweet Name</label>
        <input
          type="text"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-input"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="chocolate">Chocolate</option>
          <option value="candy">Candy</option>
          <option value="dessert">Dessert</option>
          <option value="biscuit">Biscuit</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Price</label>
        <input
          type="number"
          name="price"
          className="form-input"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-input"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description (Optional)</label>
        <textarea
          name="description"
          className="form-input"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
      <div className="sweet-actions">
        <button type="submit" className="btn btn-primary">
          {sweet ? "Update" : "Add"} Sweet
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SweetForm;
