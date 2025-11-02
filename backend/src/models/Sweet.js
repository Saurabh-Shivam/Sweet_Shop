const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a sweet name"],
    trim: true,
    maxlength: 100,
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
    trim: true,
    enum: ["chocolate", "candy", "dessert", "biscuit", "other"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: 0,
  },
  quantity: {
    type: Number,
    required: [true, "Please provide quantity"],
    min: 0,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
sweetSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Sweet", sweetSchema);
