/** @format */

import { mongooseConnect } from "@/lib/mongoose";
import { CategoryModel } from "@/models/CategoryModel";
import mongoose from "mongoose";

export default async function CategoriesController(req, res) {
  await mongooseConnect();
  const method = req.method;

  if (method === "POST") {
    const { name, parentCategory } = req.body;

    // Validate if parentCategory is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(parentCategory);

    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid parentCategory ObjectId" });
    }

    try {
      const categoryInfo = await CategoryModel.create({
        name: name,
        parent: parentCategory,
      });

      res.json(categoryInfo);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "GET") {
    try {
      const allCategories = await CategoryModel.find();
      res.json(allCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
