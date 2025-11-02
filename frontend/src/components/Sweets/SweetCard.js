import React from "react";
import { sweetsAPI } from "../../services/api";
import { toast } from "react-toastify";

const SweetCard = ({ sweet, onUpdate, canEdit }) => {
  const handlePurchase = async () => {
    try {
      const response = await sweetsAPI.purchase(sweet._id, { quantity: 1 });
      toast.success("Purchase successful!");
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <div className="sweet-card">
      <h3 className="sweet-name">{sweet.name}</h3>
      <span className="sweet-category">{sweet.category}</span>
      <p className="sweet-price">${sweet.price.toFixed(2)}</p>
      <p
        className={`sweet-quantity ${
          sweet.quantity === 0 ? "out-of-stock" : ""
        }`}
      >
        Stock: {sweet.quantity}
      </p>
      {sweet.description && (
        <p style={{ color: "#666", fontSize: "0.9rem" }}>{sweet.description}</p>
      )}
      <div className="sweet-actions">
        <button
          className={`btn btn-sm ${
            sweet.quantity === 0 ? "btn-secondary" : "btn-primary"
          }`}
          onClick={handlePurchase}
          disabled={sweet.quantity === 0 || !canEdit}
        >
          {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
        </button>
      </div>
    </div>
  );
};

export default SweetCard;
