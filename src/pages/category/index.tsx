import { useEffect, useState } from "react";
import { DB } from "@/api/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { categorytype } from "@/types";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState<categorytype[]>([]);
  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    try {
      const categoryRef = doc(DB, "categories", id);
      await deleteDoc(categoryRef);

      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const querySnapshot = await getDocs(collection(DB, "categories"));
      const categorydata: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categorydata);
    };

    fetchCategory();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="mb-4 text-2xl font-bold">Categories</h1>
          <Button onClick={() => navigate("/categ/create")}>
            Create new Category
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((category: categorytype) => (
            <div key={category.id} className="p-4 border shadow rounded-2xl">
              <h2 className="text-lg font-semibold">{category.titleen}</h2>
              <p className="font-sans text-base line-clamp-5">{category.descriptionen}</p>
              <div className="flex justify-between mt-4 gap-3">
                <Button
                  onClick={() => handleDelete(category.id)}
                  className=" bg-main-300"
                >
                  {/* <MdDelete /> */}
                  Delete Category
                </Button>
                <Button className="" onClick={() => navigate(`/categ/edit/${category.id}`)}>
                  Update Category
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
