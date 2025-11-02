const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Sweet = require("../models/Sweet");
const { protect, authorize } = require("../middleware/auth");

// @route   POST /api/sweets
// @desc    Add a new sweet
// @access  Private
router.post(
  "/",
  protect,
  [
    body("name").trim().notEmpty().withMessage("Sweet name is required"),
    body("category")
      .isIn(["chocolate", "candy", "dessert", "biscuit", "other"])
      .withMessage("Invalid category"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("quantity")
      .isInt({ min: 0 })
      .withMessage("Quantity must be a non-negative integer"),
  ],
  async (req, res) => {
    try {
      const sweet = await Sweet.create(req.body);
      res.status(201).json({
        success: true,
        data: sweet,
        message: "Sweet added successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// @route   GET /api/sweets
// @desc    Get all sweets
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: sweets.length,
      data: sweets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/sweets/search
// @desc    Search sweets by name, category, or price range
// @access  Private
router.get("/search", protect, async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Sweet.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: sweets.length,
      data: sweets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/sweets/:id
// @desc    Update a sweet
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    let sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: "Sweet not found",
      });
    }

    sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: sweet,
      message: "Sweet updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/sweets/:id
// @desc    Delete a sweet
// @access  Private (Admin only)
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: "Sweet not found",
      });
    }

    await sweet.deleteOne();

    res.json({
      success: true,
      data: {},
      message: "Sweet deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/sweets/:id/purchase
// @desc    Purchase a sweet (decrease quantity)
// @access  Private
router.post("/:id/purchase", protect, async (req, res) => {
  try {
    const { quantity = 1 } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: "Sweet not found",
      });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    sweet.quantity -= parseInt(quantity);
    await sweet.save();

    res.json({
      success: true,
      data: sweet,
      message: "Purchase successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/sweets/:id/restock
// @desc    Restock a sweet (increase quantity)
// @access  Private (Admin only)
router.post("/:id/restock", protect, authorize("admin"), async (req, res) => {
  try {
    const { quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: "Sweet not found",
      });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid quantity to restock",
      });
    }

    sweet.quantity += parseInt(quantity);
    await sweet.save();

    res.json({
      success: true,
      data: sweet,
      message: "Restock successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
