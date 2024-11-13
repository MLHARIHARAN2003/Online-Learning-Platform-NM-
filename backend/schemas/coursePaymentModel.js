const mongoose = require("mongoose");

const coursePaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    cardDetails: {
      cardholdername: { type: String,  trim: true },
      cardnumber: { type: String,  },   // Change to String
      cvvcode: { type: String, },      // Change to String
      expmonthyear: { type: String,  },
    },
    status: { type: String, default: "enrolled" },
  },
  { timestamps: true, strict: false }
);
module.exports = mongoose.model("coursePayment", coursePaymentSchema);

