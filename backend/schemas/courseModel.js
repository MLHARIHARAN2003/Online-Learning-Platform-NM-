const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    C_educator: { type: String, required: true },
    C_title: { type: String, required: true },
    C_categories: { type: String, required: true },
    C_price: { type: String },
    C_description: { type: String, required: true },
    sections: {},
    enrolled: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);

