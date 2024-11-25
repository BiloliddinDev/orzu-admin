import CreateTourForm from "@/components/shared/creadtedtour";
import { DialogCloseButton } from "@/components/shared/producmodal";
import { useEffect, useState } from "react";
import { DB } from "@/api/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { categorytype, tourtype } from "@/types";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { Pen } from "lucide-react";
import CreateCategoryForm from "@/components/shared/createdcategory";
import UpdateCategoryForm from "@/components/shared/updatecategory";

const Category = () => {
  const [categories, setCategories] = useState<categorytype[]>([]);

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
      const toursData: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(toursData);
    };

    fetchCategory();
  }, []);

  return (
    <div>
      <DialogCloseButton>
        <CreateCategoryForm />
      </DialogCloseButton>
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Categories</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {categories.map((category: categorytype) => (
            <div key={category.id} className="p-4 border rounded-2xl shadow">
              <h2 className="text-lg font-semibold">{category.title}</h2>
              <p className="text-base font-sans">{category.description}</p>
              <div className="flex mt-2 space-x-2">
                <Button
                  onClick={() => handleDelete(category.id)}
                  className="w-full bg-red-600 rounded-2xl"
                >
                  <MdDelete />
                </Button>
                <DialogCloseButton>
                  <UpdateCategoryForm category={category} />
                </DialogCloseButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
