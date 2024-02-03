/** @format */

import { mongooseConnect } from "@/lib/mongoose";
import { ProductModel } from "@/models/CreateProductModel";
import mongoose from "mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);
  const { method } = req;

  if (method === "GET") {
    if (req.query.id) {
      res.json(await ProductModel.findOne({ _id: req.query.id }));
    } else {
      res.json(await ProductModel.find());
    }
  } // end =>
  // create product=>

  if (method === "POST") {
    try {
      const { title, description, price, images, category, properties } =
        req.body;
      const newProduct = await ProductModel.create({
        title,
        description,
        price,
        images,
        category,
        properties,
      });
      res.json(newProduct);
      console.log("New product created:", newProduct);
    } catch (error) {
      console.error("Error creating new product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } // end => create

  if (method === "PUT") {
    try {
      const { title, description, price, images, category, properties, _id } =
        req.body;
      const updatedProducts = await ProductModel.updateOne(
        { _id },
        { title, description, price, images, category, properties },
        { new: true }
      );
      res.json(updatedProducts);
      console.log("New product created:", updatedProducts);
    } catch (error) {
      console.error("Error creating new product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } // end of => update

  if (method === "DELETE") {
    if (req.query.id) {
      await ProductModel.deleteOne({ _id: req.query.id });
      res.status(200).json(true);
    }
  } // end of => delete
} // end => main function
