/** @format */
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
export default function DeleteCategoryPage() {
  const router = useRouter();
  const [categoryInfo, setcategoryInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    {
      axios.get("/api/categories?id=" + id).then((response) => {
        setcategoryInfo(response.data);
      });
    }
  }, [id]);
  function goBack() {
    router.push("/categories");
  }
  async function deleteCategory() {
    await axios.delete("/api/categories?id=" + id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete{" "}
        <span className="uppercase text-2xl font-bold">
          &nbsp;&quot; {categoryInfo?.name}&quot;?
        </span>
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteCategory}
          className=" w-[120px] bg-red-500 p-2 rounded-lg">
          Yes
        </button>
        <button
          className=" w-[120px] bg-green-500 p-2 rounded-lg"
          onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
