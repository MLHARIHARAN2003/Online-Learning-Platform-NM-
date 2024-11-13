const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const adminEmail = "admin@example.com"; // Replace with admin email
const adminPassword = "password"; // Replace with admin password
const dbUrl = process.env.MONGO_DB; // Replace with your MongoDB URL

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const userSchema = require("../schemas/userModel");
const admin = mongoose.model("Admin", userSchema);

const createAdminUser = async () => {
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = new admin({
    name: "Admin",
    email: adminEmail,
    password: hashedPassword,
    type: "admin",
  });

  try {
    await adminUser.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();

