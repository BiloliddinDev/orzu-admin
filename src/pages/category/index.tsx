import CreateTourForm from "@/components/shared/creadtedtour";
import { DialogCloseButton } from "@/components/shared/producmodal";
import { useEffect, useState } from "react";
import { DB } from "@/api/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { categorytype, tourtype } from "@/types";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { Pen } from "lucide-react";
import CreateCategoryForm from "@/components/shared/createdcategory";
import UpdateCategoryForm from "@/components/shared/updatecategory";
import { DialogClose } from "@radix-ui/react-dialog";

const Category = () => {
  const [categories, setCategories] = useState<categorytype[]>([]);

  const handleDelete = async (id: string) => {
    try {
      const categoryRef = doc(DB, "categories", id);
      await deleteDoc(categoryRef);

      // const docRef = await addDoc(
      //   collection(DB, "trashcategories"),
      //   categoryRef
      // );
      // console.log("Document written with ID: ", docRef.id);

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
          <DialogCloseButton title="Add Category">
            <CreateCategoryForm />
          </DialogCloseButton>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category: categorytype) => (
            <div key={category.id} className="p-4 border rounded-2xl shadow">
              <h2 className="text-lg font-semibold">{category.title}</h2>
              <p className="text-base font-sans">{category.description}</p>
              <div className="flex mt-2 space-x-2">
                <Button
                  onClick={() => handleDelete(category.id)}
                  className="w-full bg-main-300"
                >
                  <MdDelete />
                </Button>
                <DialogCloseButton title="Edit">
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
