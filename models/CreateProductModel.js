/** @format */

/** @format */

import { Schema, model, connection } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
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

// import { Schema, model, models } from "mongoose";

// const ProductSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
// });

// export const ProductModel =
//   models.ProductModel || model("Product2", ProductSchema);
