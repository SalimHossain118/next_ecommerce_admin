/** @format */

import mongoose, { Schema, model, connection } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: [{ type: Object }],
});

let CategoryModel;

try {
  // Check if the model already exists in the connection
  CategoryModel = connection.model("Categories");
} catch {
  // If the model doesn't exist, create it
  CategoryModel = model("Categories", CategorySchema);
}

export { CategoryModel };
