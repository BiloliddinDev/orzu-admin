import { DB } from "@/api/firebase";
import { DialogCloseButton } from "@/components/shared/producmodal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blogstype } from "@/types";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blogstype[]>([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
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
      <div className="flex items-center justify-between mx-3 border-b-2">
        <Button
          className="mb-3 "
          onClick={() => navigate("/blog/create")}
          title="Add Blogs"
        >
          Create Blogs
        </Button>
        <div className="relative w-[350px] ">
          <Search className="absolute top-[5px] left-2" />
          <Input
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-[35px]"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        {blogs.map((blog: Blogstype) => (
          <div
            key={blog.id}
            className="w-[300px]  flex flex-col items-center border p-2"
          >
            <img src={blog.image} alt={blog.title.uz} />
            <h2>{blog.title.uz}</h2>
            <p>{blog.description.uz.slice(0, 50)}...</p>
            <div className="flex mt-2 space-x-2">
              <Button
                onClick={() => handleDelete(blog.id)}
                className="w-full bg-main-300"
              >
                <MdDelete />
              </Button>
              <Button
                onClick={() => navigate(`/blog/edit/${blog.id}`)}
                title="Edit"
              >
                Edit data
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
