/** @format */

// Import necessary modules from mongoose
import mongoose, { Schema, model, connection } from "mongoose";

// Create a new mongoose schema for the Category
const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: [{ type: Object }],
});

// Declare a variable to hold the Category model
let CategoryModel;

try {
  // Check if the model already exists in the connection
  CategoryModel = connection.model("Category");
} catch {
  // If the model doesn't exist, create it
  CategoryModel = model("Category", CategorySchema);
}

// Export the Category model
export { CategoryModel };
