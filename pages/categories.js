/** @format */

import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const saveCategory = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/categories", { name, parentCategory });
      setName("");
      setParentCategory("");
      fetchAllCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl text-blue-900 font-bold text-center">
        Categories
      </h1>
      <form onSubmit={saveCategory}>
        <label>New Category</label>
        <div className="max-w-screen-lg flex gap-2 justify-center items-center p-2 bg-yellow-50 shadow-lg rounded-lg">
          <input
            className="mb-0"
            type="text"
            placeholder="category name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <select
            className="mt-2 p-2"
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}>
            <option value="">Please Select Category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <button className="btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
      {/* end of form */}
      <table className="basic mt-4">
        <thead>
          <tr className="p-2 mb-2">
            <td>Categories Name </td>
            <td>Parent Category </td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id} className="gap-2">
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
