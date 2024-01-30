/** @format */
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: prductTiltle,
  description: productDescription,
  price: productPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(prductTiltle || "");
  const [description, setDescription] = useState(productDescription || "");
  const [price, setPrice] = useState(productPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [baktoProductPage, setBaktoProductPage] = useState(false);
  const router = useRouter();
  const createNewProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price, images };
    if (_id) {
      // update existing product
      await axios.put("/api/products", { ...data, _id });
      setBaktoProductPage(true);
    } else {
      // create new product
      // const data = { title, description, price };
      await axios.post("/api/products", data);
      setBaktoProductPage(true);
    }
  };

  if (baktoProductPage) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    setIsUploading(true);
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
      console.log(res.data);
    }
  } // end=> images upload

  function updateImagesOrder(images) {
    setImages(images);
  }

  return (
    <form onSubmit={createNewProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {/* end => */}
      <label>Photos</label>

      <div className="mt-3 mb-3 flex flex-wrap gap-2 ">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}>
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>

        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}

        <label className="w-24 h-24 flex flex-col border rounded-md justify-center items-center text-gray-600 bg-slate-300 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add image</div>
          <input type="file" onChange={uploadImages} hidden />
        </label>
        {!images?.length && <div>No Pthotos availble</div>}
      </div>

      {/* end of photo */}
      <label>Product Description</label>
      <textarea
        type="text"
        placeholder="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button className="btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}
