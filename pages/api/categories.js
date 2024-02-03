/** @format */

import { mongooseConnect } from "@/lib/mongoose";
import { CategoryModel } from "@/models/CategoryModel";
import mongoose from "mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function CategoriesController(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const method = req.method;

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;

    // Validate if parentCategory is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(parentCategory);

    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid parentCategory ObjectId" });
    }

    try {
      const categoryInfo = await CategoryModel.create({
        name: name,
        parent: parentCategory || undefined,
        properties,
      });

      res.json(categoryInfo);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "GET") {
    try {
      // // const allCategories = await CategoryModel.find().populate;
      // res.json(allCategories);
      res.json(await CategoryModel.find().populate("parent"));
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "PUT") {
    const { name, parentCategory, properties, _id } = req.body;
    try {
      const categoryInfo = await CategoryModel.updateOne(
        { _id },
        {
          name: name,
          parent: parentCategory || undefined,
          properties,
        }
      );

      res.json(categoryInfo);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      // Find and delete the category by id
      await CategoryModel.findByIdAndDelete(id);

      // Send a success response
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      // Handle errors and send an error response
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // Send a method not allowed response for other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
