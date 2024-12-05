import { DB } from "@/api/firebase";
import Blogcreate from "@/components/shared/blogcreate";
import Editblog from "@/components/shared/editblog";
import { DialogCloseButton } from "@/components/shared/producmodal";
import { Button } from "@/components/ui/button";
import { Blogstype } from "@/types";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blogstype[]>([]);
  useEffect(() => {
    const fetchTours = async () => {
      const querySnapshot = await getDocs(collection(DB, "blog"));
      const toursData: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(toursData);
    };

    fetchTours();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const tourRef = doc(DB, "blog", id);
      await deleteDoc(tourRef);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleUpdate = (updatedBlog: Blogstype) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  return (
    <div>
      <div>
        <DialogCloseButton title="Add Blogs">
          <Blogcreate />
        </DialogCloseButton>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-4">
        {blogs.map((blog: Blogstype) => (
          <div
            key={blog.id}
            className="w-[300px]  flex flex-col items-center border p-2"
          >
            <img src={blog.image} alt={blog.title} />
            <h2>{blog.title}</h2>
            <p>{blog.description.slice(0, 50)}...</p>
            <div className="flex mt-2 space-x-2">
              <Button
                onClick={() => handleDelete(blog.id)}
                className="w-full bg-main-300"
              >
                <MdDelete />
              </Button>
              <DialogCloseButton title="Edit">
                <Editblog updateBlog={blog} onUpdate={handleUpdate} />
              </DialogCloseButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
