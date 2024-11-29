import { DialogCloseButton } from "@/components/shared/producmodal";
import { useEffect, useState } from "react";
import { DB } from "@/api/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { categorytype } from "@/types";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MdDelete } from "react-icons/md";
import { Button } from "@headlessui/react";

const Trash = () => {
  const [trashcat, setTrashCat] = useState<categorytype[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const querySnapshot = await getDocs(collection(DB, "trashcategories"));
      const categorydata: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrashCat(categorydata);
    };

    fetchCategory();
  }, []);

  return (
    <div>
      <Tabs defaultValue="tours" className="w-full">
        <TabsList className="flex">
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>
        <TabsContent value="tours">Content for Option 1</TabsContent>
        <TabsContent value="categories">
          <div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="mb-4 text-2xl font-bold">Categories</h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
                {trashcat.map((category: categorytype) => (
                  <div
                    key={category.id}
                    className="p-4 border rounded-2xl shadow"
                  >
                    <h2 className="text-lg font-semibold">{category.title}</h2>
                    <p className="text-base font-sans">
                      {category.description}
                    </p>
                    <div className="flex mt-2 space-x-2">
                      <Button
                        // onClick={() => handleDelete(category.id)}
                        className="w-full bg-main-300"
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="blog">Content for Option 3</TabsContent>
      </Tabs>
    </div>
  );
};

export default Trash;
