import { DB } from "@/api/firebase";
import { DialogCloseButton } from "@/components/shared/producmodal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blogstype } from "@/types";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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
            className="w-[300px]  flex flex-col items-start border rounded-xl"
          >
            <img src={blog.image} alt={blog.title.uz} className="w-full h-[200px] rounded-t-xl" />
            <div className="p-3 w-full">
              <h2 className="text-main-200 font-bold">{blog.title.en}</h2>
              <p className="line-clamp-3">{blog.description.en}</p>
              <div className="flex mt-2 justify-between gap-3 w-full">
                <Button
                  onClick={() => handleDelete(blog.id)}
                  className="w-full bg-main-300"
                >
                  {/* <MdDelete /> */}
                  Delete Blog
                </Button>
                <Button className="w-full"
                  onClick={() => navigate(`/blog/edit/${blog.id}`)}
                  title="Edit"
                >
                  Edit Blog
                </Button>
              </div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
