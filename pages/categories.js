/** @format */

import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [properties, setProperties] = useState([]);

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
      if (editCategory) {
        await axios.put("/api/categories", {
          name,
          parentCategory,
          _id: editCategory._id,
          properties: properties.map((p) => ({
            name: p.name,
            values: p.values.split(","),
          })),
        });
        setName("");
        setParentCategory("");
        fetchAllCategories();
        setEditCategory(null);
        setProperties([]);
      } else {
        await axios.post("/api/categories", {
          name,
          parentCategory,
          properties: properties.map((p) => ({
            name: p.name,
            values: p.values.split(","),
          })),
        });
        setName("");
        setParentCategory("");
        setProperties([]);
        fetchAllCategories();
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const edit_Category = async (category) => {
    setEditCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  const add_Properties = async () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };
  function update_properties_name(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function update_properties_values(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function remove_property(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <Layout>
      <h1 className="text-3xl text-blue-900 font-bold text-center">
        Categories
      </h1>
      <form onSubmit={saveCategory}>
        <label>
          {" "}
          {editCategory
            ? `Edit Category  ${editCategory.name}`
            : " Create New Category"}{" "}
        </label>
        <div className="max-w-screen-lg flex gap-2 justify-center items-center p-2  shadow-lg rounded-lg">
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
        </div>
        <div className="flex flex-col">
          <label>Properties</label>
          <button
            type="button"
            onClick={add_Properties}
            className=" w-[150px] bg-primary text-white text-sm p-2 rounded-xl mt-2 mb-2">
            Add New Properties
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-2" key={index}>
                <input
                  className=""
                  type="text"
                  key={property._id}
                  value={property.name}
                  onChange={(ev) =>
                    update_properties_name(index, property, ev.target.value)
                  }
                  placeholder="Property name (Exaple : color)"
                />
                <input
                  className=""
                  type="text"
                  key={property._id}
                  value={property.values}
                  onChange={(ev) =>
                    update_properties_values(index, property, ev.target.value)
                  }
                  placeholder="Values,comma separated"
                />
                <button
                  onClick={() => remove_property(index)}
                  className="bg-red-500 p-1 text-white text-sm w-[140px] h-[40px] rounded-xl">
                  Remove
                </button>
              </div>
            ))}
        </div>

        {editCategory && (
          <button
            type="button"
            onClick={() => {
              setEditCategory(null);
              setName("");
              setParentCategory("");
              setProperties([]);
            }}
            className="bg-red-500 w-[100px] text-white text-sm mt-2 mr-2 p-2 rounded-xl">
            Cancel
          </button>
        )}

        <button
          className="bg-green-500 w-[150px] text-white text-sm mt-2 mr-2 p-2 rounded-xl"
          type="submit">
          Save
        </button>
      </form>
      {/* end of form */}

      {!editCategory && (
        <table className="basic mt-4">
          <thead>
            <tr className="p-2 mb-2">
              <td>Categories Name </td>
              <td>Parent Category </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id} className="gap-2">
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td className="flex flex-col md:flex-row items-center md:items-start  gap-2 mb-2">
                    <button
                      onClick={() => edit_Category(category)}
                      className="w-full md:w-[95px] bg-blue-900 mr-2 mb-2 md:mb-0 text-white p-1 rounded-lg align-middle md:align-baseline">
                      Edit
                    </button>
                    <Link
                      className="w-full md:w-auto bg-red-700 p-[10px] rounded-2xl ml-2"
                      href={"/categories/delete/" + category._id}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
