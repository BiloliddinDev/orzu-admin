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
      const querySnapshot = await getDocs(collection(DB, "showcase"));

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
      const tourRef = doc(DB, "showcase", id);
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
        {/* <Button
          className="mb-3 "
          onClick={() => navigate("/showcase/create")}
          title="Add Blogs"
        >
          Create showcase
        </Button> */}
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
            <h2 className="mt-2 text-xl mx-auto text-center">
              {" "}
              {blog.id == "PIhmGyYBSrRGA7oenB5N" ? "Banner" : "Showcase"}
            </h2>

            <video
              autoPlay
              muted
              loop
              poster={blog.image}
              className="w-full h-[200px] rounded-t-xl"
            >
              <source type="video/mp4" src={blog.image} />
            </video>
            <div className="p-3 w-full">
              <h2 className="text-main-200 font-bold">{blog.title.ru}</h2>
              <p className="line-clamp-3">{blog.description.ru}</p>
              <div className="flex mt-2 justify-between gap-3 w-full">
                <Button
                  className="w-full"
                  onClick={() => navigate(`/showcase/edit/${blog.id}`)}
                  title="Edit"
                >
                  Edit{" "}
                  {blog.id == "PIhmGyYBSrRGA7oenB5N" ? "Banner" : "Showcase"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
