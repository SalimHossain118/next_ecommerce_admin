/** @format */

/** @format */

import { ObjectId } from "mongodb";
import mongoose, { Schema, model, connection } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: { type: Object },
});

let ProductModel;

try {
  // Check if the model already exists in the connection
  ProductModel = connection.model("Product2");
} catch {
  // If the model doesn't exist, create it
  ProductModel = model("Product2", ProductSchema);
}

export { ProductModel };
