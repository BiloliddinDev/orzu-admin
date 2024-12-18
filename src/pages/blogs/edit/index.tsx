import { DB } from "@/api/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { doc, getDoc, updateDoc, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface BlogData {
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  image: string;
}

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        toast.error("Invalid blog ID");
        navigate("/blogs");
        return;
      }

      try {
        setLoading(true);
        const docRef = doc(DB, "blog", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as BlogData;
          setFormData(data);
        } else {
          toast.error("Blog not found!");
          navigate("/blogs");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load the blog data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const [field, lang] = name.includes("[")
      ? name.split("[").map((part) => part.replace("]", ""))
      : [name];

    setFormData((prevFormData) => {
      if (!prevFormData) return prevFormData;

      return {
        ...prevFormData,
        [field]: lang
          ? {
              ...(prevFormData[field as keyof BlogData] as Record<
                string,
                string
              >),
              [lang]: value,
            }
          : value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !formData) {
      toast.error("Invalid form data");
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(DB, "blog", id);
      await updateDoc(docRef, {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        updatedAt: new Date(),
      });

      toast.success("Blog updated successfully!");
      navigate("/blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Edit Blog for Orzu Travel</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Title Uz</label>
          <Input
            type="text"
            name="title[uz]"
            value={formData.title.uz}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
          <label className="block my-2 text-sm font-medium">Title Ru</label>
          <Input
            type="text"
            name="title[ru]"
            value={formData.title.ru}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
          <label className="block my-2 text-sm font-medium">Title En</label>
          <Input
            type="text"
            name="title[en]"
            value={formData.title.en}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>
        <div>
          <label className="block my-2 text-sm font-medium">
            Description Uz
          </label>
          <Textarea
            name="description[uz]"
            value={formData.description.uz}
            onChange={handleChange}
            placeholder="Enter blog description"
            rows={4}
            required
          />
          <label className="block my-2 text-sm font-medium">
            Description Ru
          </label>
          <Textarea
            name="description[ru]"
            value={formData.description.ru}
            onChange={handleChange}
            placeholder="Enter blog description"
            rows={4}
            required
          />
          <label className="block my-2 text-sm font-medium">
            Description En
          </label>
          <Textarea
            name="description[en]"
            value={formData.description.en}
            onChange={handleChange}
            placeholder="Enter blog description"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block my-2 text-sm font-medium">Image URL</label>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="flex items-center justify-end gap-2 w-[30%]">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Blog"}
          </Button>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-main-100"
          >
            Back to Blogs Page
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
